import styled from "styled-components";
import { Colors } from "../../colors";

export const WishlistIconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 160px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: ${Colors.PRIMARY_WHITE};
  border-radius: 12px;
  padding: 2px;
  &:hover {
    cursor: pointer;
  }
  .loader-container {
    height: 70%;
    width: 70%;
  }
`;
