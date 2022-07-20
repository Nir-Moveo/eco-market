import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { ModalWrapper } from "./ModalInfoStyle";
import { ICard, ICardList } from "../../types/types";
import EditModalInfo from "./EditModalInfo";

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
  borderRadius: "16px",
};
const styleImg = {
  position: "absolute" as "absolute",
  right: 10,
  top: 15,
  cursor: "pointer",
};
interface IPlaceholder {
  updateCard: (card: ICard) => void;
  card: ICard;
  show: boolean;
  setShowEdit: (newState: boolean) => void;
}

const EditModalComponent: React.FC<IPlaceholder> = (props: IPlaceholder) => {
  const { updateCard, card, show, setShowEdit } = props;
  //   const [open, setOpen] = React.useState(show);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setOpen(false);
    setShowEdit(false);
  };

  return (
    <ModalWrapper>
      {/* {
        <Button variant="contained" onClick={handleOpen}>
          Edit Item
        </Button>
      } */}
      <Modal
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <Box sx={style}>
            <img
              onClick={handleClose}
              style={styleImg}
              src={require("../../assets/exit.svg")}
              alt="logo"
              height="12"
              width="12"
            />
            <EditModalInfo item={card} onClose={handleClose} updateCard={(card: ICard) => updateCard(card)} />
          </Box>
        </Fade>
      </Modal>
    </ModalWrapper>
  );
};

export default EditModalComponent;
