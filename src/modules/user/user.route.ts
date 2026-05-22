import { Router, type NextFunction, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

// Create a new user
router.post("/", userController.createUser);

// Get all users
router.get("/", auth(), userController.getAllUsers);

// Get user by id
router.get("/:id", userController.getSingleUserById);

// Update user by id
router.put("/:id", userController.updateSingleUserById);

// Delete user by id
router.delete("/:id", userController.deleteSingleUserById);

export const userRoute = router;
