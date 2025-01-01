import { DataTypes } from "sequelize"
import sequelize from "../db/database";
import { UserRole } from "../utils/enum";


const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(UserRole.ADMIN, UserRole.USER),
    defaultValue: UserRole.USER
  }
}, {
  timestamps: true
});

export default User;