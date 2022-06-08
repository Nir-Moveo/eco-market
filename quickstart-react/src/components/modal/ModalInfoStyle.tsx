import styled from "styled-components";
import { Colors } from "../../colors";


export const ModalContainer = styled.div`
.form-container {
  display: flex ;
  flex-direction: column ;
}

.button {
  margin: 0 auto;
}

img {
  max-width:100%;
}

.padding-top{
  padding-top: 12px ;
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 24px;
}
.padding-bottom{
  padding-bottom: 8px ;
}
.margin-bottom{
  margin-bottom: 27px ;
}
`;

export const Divider = styled.div`
  border-top: thin solid rgba(0, 0, 0, 0.12);
  margin-top: 12px;
`;
export const ModalWrapper = styled.div`
img {
  position: absolute;
  right: 0;
  top: 0
}
`;
export const Title = styled.span`
  margin: 0 auto;
  font-weight: 500;
  font-size: 2.20rem;
  color: ${Colors.PRIMARY_BLACK};
  margin-top: 12px;
  margin-bottom: 22px;
`;
export const ContainerTitle = styled.span`
margin-top: 12px ;
margin-bottom: 8px ;
font-weight: 400 ;
font-size:14px ;
display: flex;
flex-direction: column;
`;

