import userSchema from '../models/user.js'


    const loginControl = async (req, res) => {
    const control = await userSchema.findOne({username: req.body.username, password: req.body.password})
    if(control){
        res.json({user: control})
    }
    res.status(401).json({status: false})
}
export default loginControl;