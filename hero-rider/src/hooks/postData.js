import instance from "../api/axios.config";

async function postData (path,body) {
    console.log(path,body)
    const result = await instance.post(path,body);
    return result.data;
};
export default postData;