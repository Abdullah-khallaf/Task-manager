import connect from "../../database/index.js";
import AppError from "../../../utils/appError.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import { log } from "console";

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
  username,
  first_name,
  last_name,
  date_of_birth,
  password,
}) => {
  if (
    !email ||
    !username ||
    !first_name ||
    !last_name ||
    !date_of_birth ||
    !password
  ) {
    throw new AppError("please provide your information", 400);
  }

  const db = await connect();
  const sql = `
    insert into users(email, username, first_name, last_name, date_of_birth, password)
    values (?, ?, ?, ?, ?, ?)
  `;

  const [{ insertId }] = await db.query(sql, [
    email,
    username,
    first_name,
    last_name,
    date_of_birth,
    await hash(password),
  ]);

  return {
    id: insertId,
    email,
    username,
    first_name,
    last_name,
    date_of_birth,
  };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const db = await connect();
  const sql = `
    select id, email, username, first_name, last_name, password 
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

export const forgotPassword = async ({email}) => {
  if (!email) {
    throw new AppError('please provide your email', 400)
  }

  const db = await connect();
  let sql = `
    select id 
    from users
    where email =  ?
  `
  const [user] = await db.query(sql, [email]);
  console.log(user);
  console.log(typeof user);

  if(user.length == 0) {
    throw new AppError('there is not user attached with that email', 401)
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const passwordResetExpire = Date.now() + 10 * 60 * 1000; //10min
  console.log(resetToken);
  console.log(passwordResetToken);

  sql = `
    update users
    set 
      password_reset_token = ?,
      password_reset_expire = ?
    where email = ?
  `
  await db.query(sql, [email]);

  
}