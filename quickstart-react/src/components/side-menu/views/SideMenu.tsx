import * as React from "react";
import { useState } from "react";
import {
  getItemsByCategory,
  getItemsByGroup,
  getWishlist,
} from "../../../services/monday.api";
import { Categories, Groups, ICard, ICardList } from "../../../types/types";
import MenuItem from "../components/MenuItem";
import {
  SideBar,
  SideTitle,
  SideContainer,
  MenuItemDiv,
} from "./SideMenuStyle";
import Header from "../../header/Header";
export interface SideMenuProps {
  setCards(cards: ICardList): void;
  setIsPersonalPage(newState: boolean): void;
  setIsLoading(isLoading: boolean): void;
}
export interface MenuItemProps {
  isSelected: boolean;
}

const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps) => {
  const { setCards, setIsPersonalPage, setIsLoading } = props;

  const categoryList = Object.keys(Categories);

  const [selectedCategory, setSelectedCategory] = useState("");

  const selectCategory = async (category: Categories) => {
    setIsLoading(true);
    setIsPersonalPage(false);
    let newCards: ICard[] | null = null;
    if ((category as String) === "All") {
      newCards = await getItemsByGroup(Groups.Active);
      setCards(newCards);
    } else if ((category as String) === "Wishlist") {
      newCards = await getWishlist();
      setCards(newCards);
    } else {
      newCards = await getItemsByCategory(category, Groups.Active);
      setCards(newCards);
    }
    setSelectedCategory(category);
    setIsLoading(false);
  };

  const goToPersonalPage = () => {
    setIsPersonalPage(true);
    setSelectedCategory("personalPage");
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

        <MenuItemDiv
          className="menu-item-container"
          key="menu-item-personal"
          onClick={goToPersonalPage}
          isSelected={selectedCategory === "personalPage"}
        >
          <MenuItem itemName="Personal Page" itemIcon="personal-page" />
        </MenuItemDiv>
      </SideBar>
    </SideContainer>
  );
};

export default SideMenu;
