import instance from "../api/axios.config";

async function postData (path,body,header) {
    const result = await instance.post(path,body,{headers:header});
    return result.data;
};
export default postData;