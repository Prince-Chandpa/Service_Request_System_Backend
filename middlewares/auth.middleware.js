const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    try {
        if( req.url && (req.url.includes("/login") || req.url.includes("/register"))){
            return next();
        }

        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized Access !!"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized Access !!"
        });
    }
}

module.exports = authenticateToken