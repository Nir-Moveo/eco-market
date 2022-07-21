import * as React from 'react';
import {TopBar} from "./HeaderStyle";


interface HeaderProps {
    
}
 
const Header: React.FC<HeaderProps> = () => {
    return ( <TopBar>
                <img src={require('../../assets/eco-logo.svg')} alt="logo" height="80" width="160" />
    </TopBar> );
}
 
export default Header;