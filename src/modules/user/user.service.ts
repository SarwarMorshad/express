import { pool } from "../../db";
import type { IUser } from "./user.interface";

// Create a new user
const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age } = payLoad;
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING * 
    `,
    [name, email, password, age],
  );
  return result;
};

// Get all users
const getAllUsersFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);
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
