import styled from "styled-components";
import { Colors } from "../../../styles/Colors";

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  border-radius: 8px;
  width: 240px;
  height: 100%;
  background-color: ${Colors.sideBarBg};
  margin: 0 32px 32px 32px;
`;

export const BottomBar = styled.div`
  width: 100%;
  margin-top: auto;
  padding-bottom: 32px;
`;

export const SideTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 24px;
  padding: 24px;
  cursor: default;
`;
