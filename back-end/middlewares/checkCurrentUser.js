const jwt = require("jsonwebtoken");

exports.checkCurrentUser = (req, res, next) => {
    //Accsess Authorization from header
    const Authorization = req.header('authorization');
    if(!Authorization){
        req.user = null;
        next();
    } else {
        //Get token fom Authorization
        const token = Authorization.replace('Bearer ','');

        //verify token
        try {
            const { userId } = jwt.verify(token, process.env.APP_SECRET);
            req.user = { userId };
            next();
        } catch (error) {
            req.user = null;
            next();
        }
    }
};
