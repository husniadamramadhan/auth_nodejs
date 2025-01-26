const express = require('express')
const router = express.Router()
const {verifyAccessToken} = require('../helpers/jwt_helper')
const InfoController=require('../Controllers/Info.Controller')

router.get('/profile', verifyAccessToken, InfoController.info)
module.exports = router