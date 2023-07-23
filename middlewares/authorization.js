const authorization = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)

    if(!token){
        const response = {
            status: "false",
            message: "You are not authorized",
        };
        return res.status(401).json(response);
    }
    next();
}

module.exports = authorization;