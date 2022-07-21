import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Buttons, Groups, ICard } from "../../types/types";
import { deleteItem, moveItemToGroup } from "../../services/monday.api";
import Button from "../buttons/Button";

interface IPopup {
  // updateCards: () => void,
  item: ICard;
  status: string;
  show: boolean;
  setShowPopup: (newState: boolean) => void;
  setIsDelete: (newState: boolean) => void;
}
const Popup: React.FC<IPopup> = (props: IPopup) => {
  const { item, status, show, setShowPopup, setIsDelete } = props;

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleDelete = async () => {
    await deleteItem(item.id);
    setShowPopup(false);
    setIsDelete(true);
  };
  const handleGiven = async () => {
    await moveItemToGroup(item.id, Groups.Sold);
    setShowPopup(false);
    setIsDelete(true);
  };
  const handleActivate = async () => {
    await moveItemToGroup(item.id, Groups.Active);
    setShowPopup(false);
    setIsDelete(true);
  };

  const popupContainer = {
    borderRadius: "16px",
    'border-radius': '16px',
    padding: '16px'
  };
  const titleStyle = {
    font: "Roboto",
    weight: "500",
    "font-size": "32px",
    "align-self": "center",
  };

  const getTitle = () => {
    switch (status) {
      case "delete":
        return `Delete item '${item.name}' ?`;
      case "given":
        return `Mark '${item.name}' as given`;
      case "activate":
        return `Activate item '${item.name}' ?`;
      default:
        return;
    }
  };
  const getSubTitle = () => {
    switch (status) {
      case "delete":
        return `Deleting the item will remove it from the Eco Market board and marketplace. Are you sure you want to delete?`;
      case "given":
        return `By marking the item as given, it wiil be removed from the Eco Market marketplace and will not be visible to your teamates.`;
      case "activate":
        return `Please confirm activating this item`;
      default:
        return;
    }
  };

  const renderActionButton = () => {
    switch (status) {
      case "delete":
        return <Button clickHandler={handleDelete} type={Buttons.Delete} title="Delete" />;
      case "given":
        return <Button clickHandler={handleGiven} type={Buttons.Primary} title="Given item" />;
      case "activate":
        return <Button clickHandler={handleActivate} type={Buttons.Primary} title="Activate item" />;
      default:
        return;
    }
  };

  return (
    <div>
      <Dialog
        // sx={popupContainer}
        PaperProps={{
          style: { borderRadius: 16, padding:16 }   }}
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={titleStyle} id="alert-dialog-title">
          {getTitle()}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{getSubTitle()}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button clickHandler={handleClose} type={Buttons.Secondary} title="Cancel" />
          {renderActionButton()}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Popup;
