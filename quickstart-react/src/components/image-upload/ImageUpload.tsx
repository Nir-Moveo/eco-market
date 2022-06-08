import React, { Component } from 'react';
import { useState } from 'react';
import { UploadContainer } from './ImageUploadStyle';


const ImageUpload = () => {

    const [file, setFile] = useState<string>('')
    const [imagePreviewUrl, setimagePreviewUrl] = useState<any>('')


    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleImageChange = (e: any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file)
            setimagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <UploadContainer>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
            </form>
            <img src={imagePreviewUrl} />
        </UploadContainer>
    )
}

// }


export default ImageUpload;