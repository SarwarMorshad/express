import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  // 1. CCheck If the User exists

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  // 2. If exists then compare the password
  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  console.log(matchPassword);
  console.log("Payload password:", password);
  console.log("DB password:", user.password);
  if (!matchPassword) {
    throw new Error("Invalid password");
  }

  // 3. Generate a token and send it to the user
  const jwtPayload = {
    userId: user.id,
    userName: user.name,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.secretKey as string, { expiresIn: "1d" });
  return {
    accessToken,
  };
};

export const authService = {
  loginUserIntoDB,
};
