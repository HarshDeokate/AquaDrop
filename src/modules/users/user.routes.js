
import express from "express";

import { register } from "./user.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { registerUserSchema } from "./user.validation.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerUserSchema),
  register
);

export default router;
