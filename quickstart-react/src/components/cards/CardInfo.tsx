import { Title, Image, Description, Date, InfoContainer } from "./CardStyle";
import Avatar from "@mui/material/Avatar";
import React, { Component } from "react";
import { ICard } from "../../types/types";
import Tooltip from "@mui/material/Tooltip";
import AvatarGroup from "@mui/material/AvatarGroup";
import { colorsArr } from "../../colors";

const CardInfo = (props: ICard) => {
  const { name, description, owner, interested, published_at } = props;

  const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorsArr.length);
    return colorsArr[randomIndex];
  };

  const renderInterestedAvatars = () => {
    // return interested_list.map((name) => {
    //   return (
    //     <Tooltip title={name}>
    //       <Avatar
    //         style={{
    //           backgroundColor: randomColor(),
    //         }}
    //       >
    //         {name[0]}
    //       </Avatar>
    //     </Tooltip>
    //   );
    // });
  };

  return (
    <InfoContainer>
      <div className="owner-container">
        <Avatar
          style={{
            backgroundColor: randomColor(),
          }}
        >
          {/* {owner[0]} */}
        </Avatar>
        <span className="display-name">{owner.display_name}</span>
      </div>
      <div className="item-info-container">
        <Title>{name}</Title>
        <Date>{published_at}</Date>
        <Tooltip title={description}>
          <Description>{description}</Description>
        </Tooltip>
      </div>
      {/* <AvatarGroup max={4}>{renderInterestedAvatars()}</AvatarGroup> */}
    </InfoContainer>
  );
};

export default CardInfo;
