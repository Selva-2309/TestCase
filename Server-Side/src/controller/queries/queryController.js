import fetchQuery from "./fetchQuery.js";

const getQuery = async (req, res)=>{
    try {
        const {q} = req.query;

        const response = await fetchQuery(q);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal Server Error"});
    }

};

export default {getQuery};