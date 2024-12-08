import { DataTypes } from "sequelize";
import db from "../utils/db";

const User = db.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User;