import { Title, Description, Date, InfoContainer, CategoryIcon } from "./CardStyle";
import Avatar from "@mui/material/Avatar";
import React, { Component, useEffect, useState } from "react";
import { ICard } from "../../types/types";

import Tooltip from "@mui/material/Tooltip";
import AvatarGroup from "@mui/material/AvatarGroup";
import { colorsArr } from "../../colors";
import { CustomBanner } from "./Banner";
import moment from "moment";

const CardInfo = (props: ICard) => {
  const { name, description, owner, interested, created_at, category } = props;
  const [showHover, setShowHover] = useState(false);

  const randomColor = (name: string) => {
    if (name) {
      var sum = 0;
      for (let i = 1; i < name.length; i++) {
        sum += name.charCodeAt(i);
      }
      const colorIndex = sum % colorsArr.length;

      return colorsArr[colorIndex];
    } else return colorsArr[0];
  };

  const renderInterestedAvatars = () => {
    return interested?.map((user, key) => {
      const userName = user.display_name;
      const profilePicture = user.profile_picture;
      return (
        <Tooltip title={userName} key={`${userName}-${key}`}>
          <Avatar
            src={profilePicture}
            style={{
              backgroundColor: randomColor(userName),
            }}
          >
            {userName[0]}
          </Avatar>
        </Tooltip>
      );
    });
  };
  const getIcon = (category: string) => {
    let icon;
    try {
      icon = require(`../side-menu/assets/${category.toLowerCase()}.svg`);
    } catch {
      return;
    }
    return icon;
  };
  return (
    <InfoContainer>
      <div className="owner-container">
        <Avatar
          className="avatar"
          src={owner && owner.profile_picture}
          style={{
            backgroundColor: randomColor(owner.display_name),
          }}
          onMouseOver={(e) => setShowHover(true)}
          onMouseLeave={(e) => setShowHover(false)}
        >
          {/* {owner[0]} */}
        </Avatar>

        {showHover && <CustomBanner {...owner}></CustomBanner>}
        <span className="display-name">{owner.display_name}</span>
      </div>
      <div className="item-info-container">
        <Title className="title">
          <CategoryIcon src={getIcon(category)}></CategoryIcon>
          {name}
        </Title>
        <Date>{moment(created_at).format("LLL")}</Date>
        <Tooltip title={description}>
          <Description>{description}</Description>
        </Tooltip>
      </div>

      <div className="interested-container">
        <AvatarGroup className="avatar-group" max={4}>
          {renderInterestedAvatars()}
        </AvatarGroup>
        {interested?.length > 0 && (
          <span className="interested-text">{(interested?.length > 1 ? "Are" : "Is") + " interested!"}</span>
        )}
      </div>
    </InfoContainer>
  );
};

export default CardInfo;
