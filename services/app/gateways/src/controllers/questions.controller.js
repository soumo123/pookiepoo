import call_api from "../utils/helper.js";



const createquestion = async(req,res)=>{

    try {
        const body = req.body;
        if(!body){
            return res.status(400).send({
                success:false,
                message:"Missing credentials"
            })
        }
        const url = `/createquestion?collection=questions`
        const result = await call_api(url,{},'post',body)
        return res.status(201).send({
            success:true,
            message:"Question added"
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.msg,
            error:error.stack
        })
    }

}

const allQuestion = async(req,res)=>{
    const {query,category,limit,offset} = req.query;
    try {
        const url = `/getData?collection=questions&query=${query}&category=${category}&limit=${limit}&offset=${offset}`
        const result = await call_api(url)
        return res.status(200).send({
            success:true,
            message:"List of all questions",
            data:result.data,
            totalData:result.totalData
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.msg,
            error:error.stack
        })
    }
}

export {createquestion,allQuestion}