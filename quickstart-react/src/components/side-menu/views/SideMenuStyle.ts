import styled from "styled-components";
import { Colors } from "../../../styles/Colors";
import { MenuItemProps } from "./SideMenu";

export const SideContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  height: 10vh;
`;

export const MenuItemDiv = styled.div`
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
  background-color: ${(props: MenuItemProps) => (props.isSelected ? Colors.sideBarSelected : "")};
  &:nth-last-child(2) {
    margin-top: 30vh;
  }
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  border-radius: 8px;
  width: 240px;
  background-color: ${Colors.sideBarBg};
  margin: 0 32px 0px 32px;
  padding-bottom: 32px;
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
