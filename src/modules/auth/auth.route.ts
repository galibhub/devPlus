import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

export const authRoute = router

router.post("/signup",authController.signupUser)


router.post(
    "/login",
    authController.signinUser
)