import Role from "./role.model.js";
import User from "./user.model.js";

User.belongsTo(Role, { foreignKey: "roleId" })
Role.hasMany(User, { foreignKey: "roleId" })

export { Role, User }