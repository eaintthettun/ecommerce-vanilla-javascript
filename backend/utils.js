import jwt from 'jsonwebtoken';
import config from './config';

const generateToken=(user)=>{
    //console.log('in utils,config jwt secret:',config.JWT_SECRET);
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    },
    config.JWT_SECRET
    );
}
export default generateToken;