import { Title, Image, Description, Date, InfoContainer } from "./CardStyle";
import Avatar from "@mui/material/Avatar";
import React, { Component, useState } from "react";
import { ICard } from "../../types/types";

import Tooltip from "@mui/material/Tooltip";
import AvatarGroup from "@mui/material/AvatarGroup";
import { colorsArr } from "../../colors";
import { CustomBanner } from "./Banner";

const CardInfo = (props: ICard) => {

  const { name, description, owner, interested, published_at } = props;
  const [showHover, setShowHover] = useState(false);


  const creator = {
    photo: undefined,
    phone: phone_number,
    name: owner,
    email: "ofek@moveohls.com",
  };
  const randomColor = (name: string) => {
    const randomIndex = name.charCodeAt(1) - 97;
    var sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    const colorIndex = sum % colorsArr.length;
    return colorsArr[colorIndex];
  };

  const renderInterestedAvatars = () => {

    return interested_list.map((name) => {
      return (
        <Tooltip title={name}>
          <Avatar
            style={{
              backgroundColor: randomColor(name),
            }}
          >
            {name[0]}
          </Avatar>
        </Tooltip>
      );
    });
  };

  return (
    <InfoContainer>
      <div className="owner-container">
        <Avatar
          className="avatar"
          style={{
            backgroundColor: randomColor(owner),
          }}
          onMouseOver={(e) => setShowHover(true)}
          onMouseLeave={(e) => setShowHover(false)}
        >
          {/* {owner[0]} */}
        </Avatar>

        {showHover && <CustomBanner {...creator}></CustomBanner>}
        <span className="display-name">{owner}</span>
      </div>
      <div className="item-info-container">
        <Title>{name}</Title>
        <Date>{published_at}</Date>
        <Tooltip title={description}>
          <Description>{description}</Description>
        </Tooltip>
      </div>

      <div className="intrested-container">
        <AvatarGroup className="avatar-group" max={4}>
          {renderInterestedAvatars()}
        </AvatarGroup>
        {interested_list.length > 0 && <span className="interested-text">Are intrested!</span>}
      </div>
    </InfoContainer>
  );
};

export default CardInfo;
