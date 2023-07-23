import connect from "../../database/index.js";
import AppError from "../../../utils/appError.js";
import bcrypt from "bcryptjs";

const hash = async (plainPassword) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};

const verify = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getAllUsers = async () => {
  const db = await connect();

  const sql = `
    select * from users
`;
  const [rows] = await db.query(sql);
  return rows;
};

export const signup = async ({
  email,
  user_name,
  first_name,
  last_name,
  password,
}) => {
  if (!email || !user_name || !first_name || !last_name || !password) {
    throw new AppError("please provide your information", 400);
  }

  const db = await connect();
  const sql = `
    insert into users(email, user_name, first_name, last_name, password)
    values (?, ?, ?, ?, ?)
  `;

  const [{ insertId }] = await db.query(sql, [
    email,
    user_name,
    first_name,
    last_name,
    await hash(password),
  ]);

  return { id: insertId, email, user_name, first_name, last_name };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const db = await connect();
  const sql = `
    select id, email, user_name, first_name, last_name, password 
    from users
    where email = ?
  `;
  const [[user]] = await db.query(sql, [email]);

  if (!user || !(await verify(password, user.password))) {
    throw new AppError("incorrect email or password", 401);
  }

  // not user obj to exclude password
  return {
    id: user.id,
    email: user.email,
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
  };
};
