import * as React from 'react';
import { Component } from 'react';
import {ItemContainer, ItemIcon, ItemTitle} from './MenuItemStyle';
interface MenuItemProps {
    itemName: string,
    itemIcon: string
}
 
const MenuItem: React.FC<MenuItemProps> = ({itemName, itemIcon}) => {
    return ( <ItemContainer>
        <ItemIcon src={require('../assets/' + `${itemIcon}` + '.svg')} />
        <ItemTitle>{itemName}</ItemTitle>
    </ItemContainer> );
}
 
export default MenuItem;