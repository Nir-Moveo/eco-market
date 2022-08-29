import styled from "styled-components";
import { Colors } from "../../colors";


export const UploadContainer = styled.div`
.form-init{
  display: flex ;
  flex-direction: column ;
  margin-top:8px ;
  background-color:${Colors.PRIMARY_WHITE} ;
  height:194px ;
  justify-content: center;
  align-items: center;  
  .upload-btn {
  margin-top:20px;
  padding: 8px;
  border: 1px solid ${Colors.SECONDARY_GREY} ;
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
export const EditContainer = styled.div<{ imgSrc?: string }>`

.form-init{
  display: flex ;
  flex-direction: row ;
  justify-content: center;
  align-items: center;  
  margin-right: auto;
}
img{
  max-height: 50px ;
}
.upload-btn {
  display: flex;
    justify-content: center;
    align-items:center ;
    flex-direction: column ;
background: ${Colors.GREY};
border: 1px solid ${Colors.SECONDARY_GREY} ;
cursor: pointer;
border-radius: 8px;
height:88px ;
width:141.5px ;
margin-right: auto;

img:first-child {
  width:16px ;
  height:16px ;
  margin-bottom:8px;
  object-fit:contain ;

}

}
.uploaded-images{
  
    max-width: 350px;
    max-height: 350px;
    object-fit: contain;
  }
`;
export const ItemListContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  /* width: 100%; */
  justify-content: space-between;
  gap: 8px;
  position: relative ;
  div:first-child {
    max-height: 250px;
    width:100% ;
    object-fit: cover;
    img:first-child {
      max-height: 250px;
      width:100% ;
      object-fit: cover;
    }
  }
  img {
    max-width: 50px;
    max-height: 100px;
    object-fit: contain;
  }
  
`;


