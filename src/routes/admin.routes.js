const { Router } = require('express');
const adminRouter = Router()
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const admuserRouter = require('./subroutes/admuser.routes');
const admproductRouter = require('./subroutes/admproduct.routes');
const collectionRouter = require('./subroutes/collection.routes');



adminRouter.use("/user",admuserRouter)
adminRouter.use("/products",admproductRouter)
adminRouter.use("/collections",collectionRouter)


module.exports = adminRouter