import { Description, InfoContainer, PersonalTitle, PersonalCategory } from "./CardStyle";
import React, { useState } from "react";
import { ICard } from "../../types/types";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { Title } from "../modal/ModalInfoStyle";
import { AvatarContainer, InterestedContainer } from "../personal-page/PersonalPageStyle";
import { Avatar } from "@mui/material";

const PersonalCardInfo = (props: ICard) => {
  const { name, description, interested, created_at, category } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderInterested = () => {
    return interested.map((user, index) => (
      <AvatarContainer key={`interested-${index}`}>
        <Avatar src={user.profile_picture}></Avatar>
        <div>{user.display_name}</div>
      </AvatarContainer>
    ));
  };

  const showInterestedList = () => {
    if (interested.length > 0) handleOpen();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    maxHeight: "30vh",
    overflowY: "auto",
    transform: "translate(-50%, -50%)",
    width: "25vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
  };
  const styleImg = {
    position: "absolute" as "absolute",
    right: 10,
    top: 15,
    cursor: "pointer",
  };
  
  const getIcon = (category: string) => {
    let icon;
    try {
      icon = require(`../side-menu/assets/${category.toLowerCase()}.svg`);
    } catch {
      icon = require(`../side-menu/assets/other.svg`);
    }
    return icon;
  };

  return (
    <>
      <InfoContainer className="personal">
        <div className="item-info-container">
          <div className="top-container">
            <PersonalTitle>{name}</PersonalTitle>
            <PersonalCategory>
              <img src={getIcon(category)}></img>
              {category}
            </PersonalCategory>
          </div>
          <Tooltip title={description}>
            <Description className="personal">{description}</Description>
          </Tooltip>
          <div className="bottom-container">
            <div>Created at {moment(created_at).format("LLL")}</div>
            <div className="vartical-line"></div>
            <div className="interested" onClick={showInterestedList}>
              {interested.length} interested people
            </div>
          </div>
        </div>
      </InfoContainer>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <img
              onClick={handleClose}
              style={styleImg}
              src={require("../../assets/exit.svg")}
              alt="logo"
              height="12"
              width="12"
            />
            <Title className="personal">Interested co-workers</Title>
            <InterestedContainer>{renderInterested()}</InterestedContainer>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PersonalCardInfo;
