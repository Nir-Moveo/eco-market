import * as React from 'react';
import { Component } from 'react';
import MenuItem from '../components/MenuItem';
import {SideBar, SideTitle, BottomBar} from "./SideMenuStyle";


interface SideMenuProps {

}
 
const SideMenu: React.FC<SideMenuProps> = () => {
    const categoryList = [{itemName: "All", itemIcon: "All"},{itemName: "Clothing", itemIcon: "Clothing"},{itemName: "Electricity", itemIcon: "Electricity"},{itemName: "Furniture", itemIcon: "Furniture"}];
    const subCategoryList = [{itemName: "Wishlist", itemIcon: "Wishlist"},{itemName: "Personal page", itemIcon: "Personal"}];
    return ( <SideBar>
        <SideTitle>
        Menu</SideTitle>
        {categoryList.map((cat,index)=> (
            <MenuItem key={index} itemName={cat.itemName} itemIcon={cat.itemIcon}/>
        ))}
        <BottomBar>
        {subCategoryList.map((cat,index)=> (
            <MenuItem key={index} itemName={cat.itemName} itemIcon={cat.itemIcon}/>
        ))}
        </BottomBar>
    </SideBar> );
}
 
export default SideMenu;