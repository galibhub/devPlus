import bcrypt from "bcryptjs"
import { pool } from "../../db"
import type { IUser } from "./auth.interface"
import config from "../../config"
import jwt from "jsonwebtoken"


const signUpUserIntoDb = async (payload: IUser) => {

    const { name, email, password, role } = payload

    // role validation

    if (
        role !== "contributor" &&
        role !== "maintainer"
    ) {
        throw new Error("Invalid role!")
    }

    // check existing user

    const existingUser = await pool.query(
        `
        SELECT * FROM users
        WHERE email=$1
        `,
        [email]
    )

    if (existingUser.rows.length > 0) {
        throw new Error("User already exists!")
    }

    // hash password

    const hashPassword =
        await bcrypt.hash(password, 10)

    // insert user

    const result = await pool.query(
        `
        INSERT INTO users(
            name,
            email,
            password,
            role
        )

        VALUES($1,$2,$3,$4)

        RETURNING
        id,
        name,
        email,
        role,
        created_at,
        updated_at
        `,
        [
            name,
            email,
            hashPassword,
            role
        ]
    )

    return result.rows[0]
}



// signin / login

const signInUserIntoDb = async (
    payload: {
        email: string
        password: string
    }
) => {

    const { email, password } = payload

    // check user exists

    const userData = await pool.query(
        `
        SELECT * FROM users
        WHERE email=$1
        `,
        [email]
    )

    if (userData.rows.length === 0) {
        throw new Error(
            "Invalid Credentials!"
        )
    }

    const user = userData.rows[0]

    // compare password

    const matchPassword =
        await bcrypt.compare(
            password,
            user.password
        )

    if (!matchPassword) {
        throw new Error(
            "Invalid Credentials!"
        )
    }

    // jwt payload

    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role
    }

    // generate token

    const token = jwt.sign(
        jwtPayload,
        config.secret as string,
        {
            expiresIn: "7d"
        }
    )

    return {

        token,

        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at:
                user.created_at,
            updated_at:
                user.updated_at
        }
    }
}




export const authService = {
    signUpUserIntoDb,
     signInUserIntoDb
}