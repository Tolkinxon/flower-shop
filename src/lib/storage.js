import cloudinary from "cloudinary";
import c from "config";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
let {v2:cloudinaryV2} = cloudinary;
cloudinaryV2.config({
    api_key: c.get("CLOUD_APIKEY"),       
    cloud_name: c.get("CLOUD_NAME"),
    api_secret: c.get("CLOUD_SECRET"),
})
export let flowerImageStorage = new CloudinaryStorage({
    cloudinary: cloudinaryV2,
    params:{
        allowedFormats: ["jpeg", "png", "jpg"],
        folder: "Flowers"
    }
})
 
export const flowerImageUpload = multer({storage: multer.memoryStorage()})