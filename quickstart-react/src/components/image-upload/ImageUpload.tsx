import React from 'react';
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
            {!imagePreviewUrl && <form className="form-init" onSubmit={handleSubmit}>
                 <img src={require('../../assets/upload.svg')} alt="upload" height="80" width="80" /> 
                 <input style={{ display: 'none' }} id="fusk" type="file" onChange={handleImageChange} />
                 <label className='upload-btn' htmlFor="fusk">
                     <span>Upload images</span>
                </label>
            </form>}
            {imagePreviewUrl && <img className="uploaded-images" alt="upload" src={imagePreviewUrl} /> }
        </UploadContainer>
    )
}

export default ImageUpload;