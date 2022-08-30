import React from "react";
import { IUser } from "../../types/types";
import { BannerContainer } from "./BannerStyle";

export const CustomBanner = (creator: IUser) => {
  return (
    <BannerContainer>
      <div className="banner">
        <img
          alt="creator"
          src={
            creator && creator.profile_picture
              ? creator.profile_picture
              : "https://cdn7.monday.com/icons/dapulse-person-column.svg"
          }
        />
        <div className="info">
          <span className="name">
            {creator ? creator.display_name : "Unknown"}
          </span>
          <span className="email">{creator ? creator.email : null}</span>
          <span className="email">{creator ? creator.phone : null}</span>
        </div>
      </div>
    </BannerContainer>
  );
};
