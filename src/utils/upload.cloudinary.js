import cloudinary from "cloudinary";

export const flowerImageUploadFn = async (file) => {
    const result = new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
            {folder: "Flower_shop/Flower_images"},
            (err, result) => {
                if(err) return reject(err);
                return resolve(result);
            }
        )
        stream.end(file.buffer);    
    })
    return result;
}