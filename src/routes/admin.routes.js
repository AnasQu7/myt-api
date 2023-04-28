const { Router } = require('express');
const adminRouter = Router()
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const admuserRouter = require('./subroutes/admuser.routes');
const admproductRouter = require('./subroutes/admproduct.routes');
const collectionRouter = require('./subroutes/collection.routes');
const admTypesRouter = require('./subroutes/admtypes.routes');



adminRouter.use("/user",admuserRouter)
adminRouter.use("/products",admproductRouter)
adminRouter.use("/collections",collectionRouter)
adminRouter.use("/types",admTypesRouter)



module.exports = adminRouter