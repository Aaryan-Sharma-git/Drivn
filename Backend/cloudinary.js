const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileUploading = async (filePath) => {
    try {
        if(!filePath){
            console.log('path is empty');
            return null;
        }

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "image"
        })

        console.log('file uploaded successfully', result);

        fs.unlinkSync(filePath)

        return result;
    } 
    
    catch (error) {
        console.log('error occured', error)
        fs.unlinkSync(filePath)
        return null;
    }
}

module.exports = {
    fileUploading
}