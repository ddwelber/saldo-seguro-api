import { Router } from "express";
import { login } from "../../controllers/auth/login.controller";
import { loginWithGoogle } from "../../controllers/auth/social-login.controller";
import { register } from "../../controllers/auth/register.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login/google", loginWithGoogle);

export default router;
