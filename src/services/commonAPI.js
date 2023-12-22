// import axios 
import axios from "axios";

export const commonAPI = async(httprequest,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httprequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"} // in our project there are two type of contents to upload so we set the header tpye like this
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
    
}