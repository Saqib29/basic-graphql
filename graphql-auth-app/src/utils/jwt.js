import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.config.js'

export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        jwtConfig.jwt_secret,
        jwtConfig.jwt_expires_in
    )
}

export const verifyToken = (token) => {
    return jwt.verify(token, jwtConfig.jwt_secret)
}