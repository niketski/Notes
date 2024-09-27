import { v2 as cloudinary } from 'cloudinary';

if(!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw Error('Please complete cloudinary credentials.');
}

// set up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default cloudinary;

export const uploadImage = async (file: File) => {

    const arrayBuffer = await file.arrayBuffer();
    const buffer      = new Uint8Array(arrayBuffer);
    const result      = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, uploadResult) => {

            if(error) {
                return reject(error);
            }

            return resolve(uploadResult)

        }).end(buffer);
    });

   return result;

};