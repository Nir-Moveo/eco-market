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
        {interested?.length > 0 && (
          <span className="interested-text">{(interested?.length > 1 ? "Are" : "Is") + " intrested!"}</span>
        )}
      </div>
    </InfoContainer>
  );
};

export default CardInfo;
