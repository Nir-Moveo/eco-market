import React from "react";
import { BannerContainer } from "./BannerStyle";
interface IBanner {
  photo: string | undefined;
  phone: string;
  name: string;
  email: string;
}
export const CustomBanner = (creator: IBanner) => {
  return (
    <BannerContainer>
      <div className="banner">
        <img
          src={creator && creator.photo ? creator.photo : "https://cdn7.monday.com/icons/dapulse-person-column.svg"}
        />
        <div className="info">
          <span className="name">{creator ? creator.name : "Unknown"}</span>
          <span className="email">{creator ? creator.email : null}</span>
          <span className="email">{creator ? creator.phone : null}</span>
        </div>
      </div>
    </BannerContainer>
  );
};
