const createHttpError = require("http-errors");
const { Permission, RolePermission } = require("../../RBAC/model/RBAC.model"); 

async function GuardPermission(req, res, next) {
  try {
    const user = req.user;
    if (!user?.roleId) throw createHttpError(401, "Unauthorized");

    const method = req.method.toUpperCase();
    const path = req.route?.path || req.originalUrl;
    const fullRoute = `${method}:${path}`;

    const permission = await Permission.findOne({ where: { title: fullRoute } });
    if (!permission) throw createHttpError(403, "Permission not registered");

    const match = await RolePermission.findOne({
      where: {
        roleId: user.roleId,
        permissionId: permission.id,
      },
    });

    if (!match) throw createHttpError(403, "Access denied");

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
     GuardPermission
     };
