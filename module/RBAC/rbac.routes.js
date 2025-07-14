const {Router}=require('express');
const { createRole, createPermission, assignPermissionToRole, assignOrCreatePermissionAndAttach, getRoutesWithDescription } = require('./service.RBAC');
const { assignPermissionToRoleValidation } = require('./validation');
const { AuthGuard } = require('../auth/guard/auth.guard');
const router=Router()

module.exports = function rbacRoute(app) {
  const router = Router();

  router.post('/role', createRole);
  router.post('/permission', createPermission);
  router.post('/add-permission-to-role', AuthGuard, assignPermissionToRoleValidation, assignPermissionToRole);
  



  return router;
};
