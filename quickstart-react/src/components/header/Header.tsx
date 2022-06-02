import * as React from 'react';
import { Component } from 'react';
import {TopBar} from "./HeaderStyle";


interface HeaderProps {
    
}
 
const Header: React.FC<HeaderProps> = () => {
    return ( <TopBar>
        <img src={require('../../assets/logo.svg')} alt="logo" height="80" width="80" />
        <img src={require('../../assets/title.svg')} alt="title" height="80" width="150" />
    </TopBar> );
}
 
export default Header;