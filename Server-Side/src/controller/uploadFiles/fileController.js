const fileController = (req, res)=>{
    try {
        if(!req.file){
            res.status(400).json({message:"No files are found"});

        }else{
            const url = `http://localhost:4000/assets/${req.file.filename}`;
            res.status(201).json({message:"file upload successfully", ImageUrl:url});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.hint || "Internal server error"});
    }
}

export default fileController;