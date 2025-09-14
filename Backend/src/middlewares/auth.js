const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


async function authMiddleware(req, res, next){
const authHeader = req.headers.authorization;
if(!authHeader) return res.status(401).json({ message: 'Missing token' });
const token = authHeader.split(' ')[1];
try{
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(payload.id).select('-password');
if(!user) return res.status(401).json({ message: 'Invalid token' });
req.user = user;
next();
}catch(err){
return res.status(401).json({ message: 'Unauthorized', error: err.message });
}
}
module.exports = authMiddleware;