import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ModalInfo from "./ModalInfo";
import { ModalWrapper } from "./ModalInfoStyle";
import Button from "../buttons/Button";
import { Buttons } from "../../types/types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  height: "calc(100%/1.2)",
  overflowY: "auto",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
const styleImg = {
  position: "absolute" as "absolute",
  right: 10,
  top: 15,
  cursor: "pointer",
};

const ModalComponent = (props: { updateCards: () => void }): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalWrapper>
      <Button
        clickHandler={handleOpen}
        type={Buttons.Primary}
        title="+ Add Item"
      />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
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
            <ModalInfo onClose={handleClose} updateCards={props.updateCards} />
          </Box>
        </Fade>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalComponent;
