function authenticateRole(...roles) {
    return (req,res,next) => {
        if(!roles.includes(req.user.Role)){
            return res.status(403).json({
                error:true,
                message:"Access Forbidden !!"
            });
        }
        next();
    }
}

module.exports = authenticateRole;