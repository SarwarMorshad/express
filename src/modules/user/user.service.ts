import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

// Create a new user
const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age } = payLoad;

  // hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
    `,
    [name, email, hashedPassword, age],
  );

  delete result.rows[0].password; // remove password from the result before returning it

  return result.rows[0];
};

// Get all users
const getAllUsersFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);

  result.rows.forEach((row: any) => {
    delete row.password;
  });

  return result;
};

// Get user by id
const getSingleUserByIdFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id = $1
    `,
    [id],
  );

  delete result.rows[0]?.password; // remove password from the result before returning it

  return result;
};

// Update user by id
const updateSingleUserByIdInDB = async (id: string, payLoad: IUser) => {
  const { name, password, age, is_active } = payLoad;
  const result = await pool.query(
    `
      UPDATE users
      SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_active = COALESCE($4, is_active)
      WHERE id = $5
      RETURNING *
      `,
    [name, password, age, is_active, id],
  );
  return result;
};

// Delete user by id
const deleteSingleUserById = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id = $1 RETURNING *
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserByIdFromDB,
  updateSingleUserByIdInDB,
  deleteSingleUserById,
};
