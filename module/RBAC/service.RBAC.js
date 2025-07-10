
const createHttpError = require("http-errors")
const { Role, Permission, RolePermission } = require("./model/RBAC.model")
const { Op } = require("@sequelize/core")

async function createRole(req, res, next) {
    try {

        const { title, description } = req.body
        const role = await Role.findOne({ where: { title } })
        if (role) {
            throw createHttpError(409, "already exist role title")
        }
        await Role.create({
            title,
            description,
        })
        return res.json({
            message: 'role created successfully'
        })


    } catch (error) {
        next(error)
    }
}






async function createPermission(req, res, next) {
    try {

        const { title, description } = req.body
        const role = await Permission.findOne({ where: { title } })
        if (role) {
            throw createHttpError(409, "already exist permission title")
        }
        await Permission.create({
            title,
            description,
        })
        return res.json({
            message: 'permission created successfully'
        })


    } catch (error) {
        next(error)
    }
}




async function assignPermissionToRole (req, res, next) {
    try {
        let {roleId, permissions = []} = req.body;
        const role = await Role.findOne({where: {id: roleId}});
        if (!role) throw createHttpError(404, "not found role ");
        if (permissions?.length > 0) {
            const permissionCount = await Permission.count({where: {id: {[Op.in]: permissions}}});
            if (permissionCount !== permissions.length) {
                throw createHttpError(400, "send correct list of permissions");
            }
            const permissionList = permissions.map(per => ({
                roleId,
                permissionId: per
            }));
            await RolePermission.bulkCreate(permissionList);
        }
        return res.json({
            message: "assigned permissions to role"
        });
    } catch (error) {
        next(error);
    }
}



module.exports = {
    createPermission,
    createRole,
    assignPermissionToRole
}