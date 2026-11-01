
import express from "express";

import { register, login, getMe, adminTest  } from "./user.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { registerUserSchema, loginUserSchema } from "./user.validation.js";
import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerUserSchema),
  register
);

router.post(
  "/login",
  validate(loginUserSchema),
  login
);

router.get("/me", authenticate, getMe);

router.get(
  "/admin-test",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  adminTest
);

export default router;
