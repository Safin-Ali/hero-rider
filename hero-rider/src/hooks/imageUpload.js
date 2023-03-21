import axios from 'axios';

export async function imageUpload(obj) {
    const imageReadyObj = await getOnlyFile(obj);
    return imageReadyObj;
};

async function getOnlyFile(data) {

    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof FileList) {
                const imageUrl = await uploadImgBB(data[prop][0]);
                data[prop] = imageUrl;
            };
        };
    };

    return data
};

async function uploadImgBB(file) {
    const imgFile = new FormData();
    imgFile.append('image', file);
    const result = (await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`, imgFile)).data;
    return result.data.image.url
}