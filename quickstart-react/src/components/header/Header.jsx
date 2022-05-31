import React, { Component } from 'react';
import {TopBar} from "./HeaderStyle.js";

const Header = () => {
    return ( <TopBar>
        <img src={require('../../assets/logo.svg')} alt="logo" height="80" width="80" />
        <img src={require('../../assets/title.svg')} alt="title" height="80" width="150" />
    </TopBar> );
}
 
export default Header;