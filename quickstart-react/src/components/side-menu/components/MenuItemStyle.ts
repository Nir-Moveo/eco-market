import styled from "styled-components";
import { Colors } from "../../../styles/Colors";

export const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 8px;
  align-items: center;
  height: fit-content;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: ${Colors.sideBarHover};
  }
`;

export const ItemIcon = styled.img`
    height:30px;
    width:30px;
    padding: 8px;
    margin-left:12px;
`

export const subItemIcon = styled.img`
    height:30px;
    width:30px;
    padding: 8px;
    margin-left:12px;
`

export const ItemTitle = styled.span`
  font-size: 1rem;
  line-height: 24px;
  padding: 4px;
`;
