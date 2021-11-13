const jwt = require('jsonwebtoken');
//require('dotenv').config()
  //process.env.SECRET_HASH
const signature = jwt.sign({ databaseID: '123', userEmail: 'ABC'}, process.env.SECRET_HASH);

const logout = (req, res)=>{
   return res.clearCookie('token')
}
  
// const isAuthHeader = (req, res, next) => {
//    const authHeader = req.get("Authorization");
//    if (!authHeader) {
//        return res.status(401).json({ message: 'not authenticated' });
//    };
//    const token = authHeader.split(' ')[1];
//    let decodedToken; 
//    try {
//        decodedToken = jwt.verify(token, 'secret');
//    } catch (err) {
//        return res.status(500).json({ message: err.message || 'could not decode the token' });
//    };
//    if (!decodedToken) {
//        res.status(401).json({ message: 'unauthorized' });
//    } else {
//        res.status(200).json({ message: 'here is your resource' });
//    };
// };
//middleware
const auth = (req, res, next)=>{
   //check bearer token in header 
    //let authHeader = req.headers['Authorization']
   const authHeader = req.get("Authorization");
   var clientToken = authHeader?.split(' ')[1]
   console.log(clientToken)
   //check token in cookies if not in header
   if(!clientToken || clientToken==undefined || clientToken==null || clientToken=='undefined' || clientToken=='null')
      clientToken = req.cookies.token 
   //if no token found in 'header' neither in 'cookies' 
   if (!clientToken){
    return res.status(200).json(`bad token or undefined! ${clientToken}`)
   }
   //process.env.SECRET_HASH
   jwt.verify(clientToken, process.env.SECRET_HASH, (err, user)=>{
      if(err){
         return res.status(200).json(`verification failed! Code: E001`)
      }
      if (!user || user == null || user == undefined ){
         return res.status(200).json(`verification failed! E002`)
        }
      if (user)
         req.user = user
         next()
   })
 }
 
module.exports = {TOKEN: signature, authentication: auth, deleteToken: logout}