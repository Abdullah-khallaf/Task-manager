import connect from "../../database/index.js";
import AppError from "../../../utils/appError.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../../../utils/sendEmail.js";

const hash = async (plainPassword) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};

const verify = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// for admin
export const createUser = async ({
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
    throw new AppError(
      "please provide user email, username, first_name, last_name, date_of_birth and password",
      400
    );
  }

  const db = await connect();
  const sql = `
    insert into users(email, username,  first_name, last_name, date_of_birth, password)
    values (?, ?, ?, ?, ?, ?)
  `;

  const [{ insertId }] = await db.query(sql, [
    email,
    username,
    first_name,
    last_name,
    date_of_birth,
    password,
  ]);

  return {
    id: insertId,
    email,
    username,
    first_name,
    last_name,
    date_of_birth,
    password,
  };
};

export const getUser = async (userId) => {
  if (!userId) {
    throw new AppError("please provide user id", 400);
  }

  const db = await connect();
  const sql = `
    select * 
    from users
    where id = ?
  `;

  const [[user]] = await db.query(sql, [userId]);

  if (!user) {
    throw new AppError("there is no user attached with that id ", 400);
  }

  return user;
};

export const getAllUsers = async () => {
  const db = await connect();

  const sql = `
    select * from users
    where active = ?
`;
  const [rows] = await db.query(sql, [1]);
  return rows;
};

export const deleteUser = async (userId) => {
  const db = await connect();

  const sql = `
    update users
    set 
      active = ?
    where id = ?
  `;
  await db.query(sql, [0, userId]);
  return;
};

export const updateUserRole = async (userId, { role }) => {
  const db = await connect();
  const sql = `
    update users
    set
      role = ? 
    where id = ?
  `;

  const [{ affectedRows }] = await db.query(sql, [role, userId]);

  return affectedRows;
};

// for users
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
    select id, email, username, first_name, last_name, password, role
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
    role: user.role,
  };
};

export const forgotPassword = async (req, { email }) => {
  if (!email) {
    throw new AppError("please provide your email", 400);
  }

  const db = await connect();
  let sql = `
    select id 
    from users
    where email =  ?
  `;
  const [user] = await db.query(sql, [email]);

  if (user.length == 0) {
    throw new AppError("there is no user attached with that email", 404);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpire = Date.now() + 10 * 60 * 1000; //10min

  sql = `
    update users
    set 
      password_reset_token = ?,
      password_reset_expire = ?
    where email = ?
  `;
  await db.query(sql, [passwordResetToken, passwordResetExpire, email]);

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;
  const emailOptions = {
    email,
    subject: "your password reset token (valid for 10 min)",
    message: `send a patch request with your new password to ${resetUrl} \n if you didn't forget your password, please ignore this email`,
  };

  try {
    await sendEmail(emailOptions);
  } catch (err) {
    throw new AppError("failed to send a reset token please try", 500);
  }
  return;
};

export const resetPassword = async (resetToken, { newPassword }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const db = await connect();
  let sql = `
    select id,  password_reset_expire
    from users
    where password_reset_token = ?
  `;
  const [user] = await db.query(sql, [hashedToken]);
  if (user.length == 0) {
    throw new AppError("invalid token", 401);
  }
  const [{ id, password_reset_expire }] = user;
  if (password_reset_expire < Date.now()) {
    throw new AppError("invalid token", 401);
  }

  sql = `
    update users
    set
      password = ?,
      password_reset_token = NULL,
      password_reset_expire = NULL
    where id = ? 
  `;
  const [{ affectedRows }] = await db.query(sql, [await hash(newPassword), id]);

  return affectedRows;
};
