import generateToken from "./generateToken.js";

const authentication = async (req, res, next)=>{
    try {
        const authHeader = req.header('Authorization');

        if(!authHeader){
            return res.status(401).json({message:"Unauthorized: missing Token"});
        }

        const [Bearer,token] = authHeader.split(" ");

        if(!Bearer || Bearer != "Bearer" || !token){
            res.status(401).json({message:"Unauthorized: Invalid format"});
        };

        try {
            const user = await generateToken.verifyToken(token);
            console.log(user);
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(403).json({ message: "Forbidden: Invalid Token" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.hint || "Internal server error"});
    }
};

export default authentication;