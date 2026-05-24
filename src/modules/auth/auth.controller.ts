import {
    type Request,
    type Response
} from "express"

import { authService }
from "./auth.service"

const signupUser = async (
    req: Request,
    res: Response
) => {

    try {

        const result =
            await authService
                .signUpUserIntoDb(req.body)

        res.status(201).json({
            success: true,
            message:
                "User registered successfully",
            data: result
        })

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message,
            errors: error
        })

    }
}


// signin / login

const signinUser = async (
    req: Request,
    res: Response
) => {

    try {

        const result =
            await authService
                .signInUserIntoDb(
                    req.body
                )

        res.status(200).json({
            success: true,
            message:
                "Login successful",
            data: result
        })

    } catch (error: any) {

        res.status(401).json({
            success: false,
            message: error.message,
            errors: error
        })

    }
}



export const authController = {
    signupUser,
    signinUser
}