import generateToken from "../../middleware/generateToken.js";
const createToken = async (req,res)=>{
    try {
        const {user, password}= req.body;

        if(user == "demo"){
            if(password == "123"){
                const token = await generateToken.generateToken(req.body);
                return res.status(200).json({type:"Bearer", token:token});
            }else{
                return res.status(400).json({message: "password invalid"});
            }
        }else{
            return res.status(400).json({message: "User name not found"})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal Server Error"});
    }
}

export default createToken;