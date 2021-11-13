const { TOKEN, authentication, deleteToken} = require('../jwt')

const getDashbard = (req, res)=> {
    return res.send('dashboard Page')
}

const postDashboardAPI = (req, res)=>{
    console.log('post dashboard called')
    return res.send(`auth successful. you are loggedIn`)
}

const getHome = (req, res)=> {
    return res.json('ProStrore Home Page')
}

const getLogin = (req, res)=>{
    //req.user = TOKEN
    res.cookie('token', TOKEN, { httpOnly: true });
   // console.log(`token is set ${TOKEN}`)
    return res.status(200).json({token: TOKEN} )
}

const postLogout = (req, res)=>{
    //req.user = TOKEN
    //res.cookie('token', { httpOnly: false });
    res.clearCookie('token')
    //deleteToken
    return res.status(200).json(`Login state: logout` )
}

const getRegister = function (req, res) {
    return res.json('register page')
}



module.exports = userController = {
    getHome,
    postLogout,
    getLogin,
    getRegister,
    getDashbard,
    postDashboardAPI
}