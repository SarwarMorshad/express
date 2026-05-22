import { pool } from "../../db";
import type { IProfile } from "./profile.interface";

const createProfileIntoDB = async (payLoad: IProfile) => {
  const { user_id, bio, address, phone, gender } = payLoad;

  //if user id is not exist in users table then throw error
  const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [user_id]);

  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }

  const result = await pool.query(
    `
    INSERT INTO profiles(user_id,bio,address,phone,gender) VALUES($1,$2,$3,$4,$5) RETURNING * 
    `,
    [user_id, bio, address, phone, gender],
  );
  return result;
};

export const profileService = {
  createProfileIntoDB,
};
