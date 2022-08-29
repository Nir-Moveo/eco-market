import styled from "styled-components";
import { Colors } from "../../../colors";
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
  height: 32px;
  cursor: pointer;
  width: 100%;
  color: ${(props) => {
    if (props.theme === "light") return Colors.PRIMARY_BLACK;
    else return Colors.DARK_THEME_TEXT;
  }};

  &:hover {
    background-color: ${(props) => {
      if (props.theme === "light") return Colors.SIDE_BAR_HOVER;
      else return Colors.DARK_SIDE_BAR_HOVER;
    }};
  }
  background-color: ${(props: MenuItemProps) => {
    if (props.isSelected) {
      if (props.theme === "light") return Colors.SIDE_BAR_SELECTED;
      else return Colors.DARK_SIDE_BAR_SELECTED;
    } else return "";
  }};
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
  background-color: ${(props) => props.theme.cardBackground};
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
  color: ${(props) => props.theme.text};
`;
