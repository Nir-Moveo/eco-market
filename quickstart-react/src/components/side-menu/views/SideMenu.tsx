import * as React from "react";
import { useState } from "react";
import { getItemsByCategory, getItemsByGroup } from "../../../services/monday.api";
import { Categories, Groups, ICardList } from "../../../types/types";
import MenuItem from "../components/MenuItem";
import { SideBar, SideTitle, SideContainer, MenuItemDiv } from "./SideMenuStyle";
import Header from "../../header/Header";
export interface SideMenuProps {
  cards: ICardList;
  setCards(cards: ICardList): void;
}
export interface MenuItemProps {
  isSelected: boolean;
}

const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps) => {
  const { cards, setCards } = props;

  const categoryList = Object.keys(Categories);

  const [selectedCategory, setSelectedCategory] = useState("");

  const selectCategory = async (category: Categories) => {
    const newCards =
      (category as String) === "All"
        ? await getItemsByGroup(Groups.Active)
        : await getItemsByCategory(category, Groups.Active);

    setCards(newCards);
    setSelectedCategory(category);
  };
  return (
    <SideContainer>
      <Header />
      <SideBar>
        <SideTitle>Menu</SideTitle>
        {categoryList.map((category, index) => (
          <MenuItemDiv
            className="menu-item-container"
            key={`menu-item-${index}`}
            onClick={() => selectCategory(category as Categories)}
            isSelected={selectedCategory === category}
          >
            <MenuItem key={index} itemName={category} itemIcon={category} />
          </MenuItemDiv>
        ))}
      </SideBar>
    </SideContainer>
  );
};

export default SideMenu;
