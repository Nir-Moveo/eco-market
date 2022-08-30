import styled from "styled-components";
import { Colors } from "../../colors";

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  margin-top: 50%;
  position: relative;
`;
export const ModalContainer = styled.div`
  .form-container {
    display: flex;
    flex-direction: column;
  }

  .button {
    padding-top: 16px;
    margin: 0 auto;
  }

  img {
    max-width: 100%;
  }

  .padding-top {
    color: ${(props) => props.theme.text};
    padding-top: 12px;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 24px;
  }
  .padding-bottom {
    color: ${(props) => props.theme.text};
    padding-bottom: 8px;
  }
  .margin-bottom {
    margin-bottom: 27px;
  }
`;

export const Divider = styled.div`
  border-top: thin solid ${Colors.TRANSPARENT_DARK}
  margin-top: 12px;
`;
export const ModalWrapper = styled.div`
  img {
    position: absolute;
    right: 0;
    top: 0;
  }
`;
export const Title = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.text};
  margin-top: 12px;
  margin-bottom: 22px;
  &.personal {
    font-size: 1.5rem;
  }
`;
export const ContainerTitle = styled.span`
  margin-top: 12px;
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`;
