import styled from "styled-components";


export const UploadContainer = styled.div`

.form-init{
  display: flex ;
  flex-direction: column ;
  margin-top:8px ;
  background-color:#F5F6F8 ;
  height:194px ;
  justify-content: center;
  align-items: center;  
  .upload-btn {
  margin-top:20px;
  padding: 8px;
  border: 1px solid #d5d5d5 ;
  cursor: pointer;
  border-radius: 5px ;
  }
}
.uploaded-images{
    max-width: 350px;
    max-height: 350px;
    object-fit: contain;
  }
`;


