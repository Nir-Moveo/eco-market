import * as React from 'react';
import { Component } from 'react';
import {SideBar, SideTitle} from "./SideMenuStyle";


interface SideMenuProps {
    
}
 
const SideMenu: React.FC<SideMenuProps> = () => {
    return ( <SideBar>
        <SideTitle>
        Menu</SideTitle>
    </SideBar> );
}
 
export default SideMenu;