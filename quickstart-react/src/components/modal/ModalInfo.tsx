import * as React from "react";
import ImageUpload from "../image-upload/ImageUpload";
import RadioCategory from "../radio/RadioCategory";
import {
  Title,
  ModalContainer,
  ContainerTitle,
  LoaderContainer,
} from "./ModalInfoStyle";
import { useEffect, useState } from "react";
import { Box, InputLabel, TextField } from "@mui/material";
import { addNewItem, storageGetItem } from "../../services/monday.api";
import { Buttons, Categories } from "../../types/types";
import Loader from "../loader/Loader";
import Button from "../buttons/Button";
import { Colors } from "../../colors";

const ModalInfo = (props: { onClose: () => void; updateCards: () => void }) => {
  const [item, setItem] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemImages, setItemImages] = useState<any>();
  const [radioValue, setRadioValue] = useState<Categories>(Categories.Other);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [titleError, setTitleError] = useState(false);

  const onRadioChange = (e: Categories) => {
    setRadioValue(e);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setTitleError(false);
    if (item == "") {
      setTitleError(true);
    }
    if (item !== "") {
      setIsLoading(true);
      const payload = {
        name: item,
        description: itemDescription,
        category: radioValue ?? Categories.Other,
        images: itemImages,
      };

      await addNewItem(payload);
      await props.updateCards();

      props.onClose();
      setIsLoading(false);
    }
  };

  const [theme, setTheme] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const theme = await storageGetItem("theme");
      setTheme(theme);
    };
    fetchData();
  });

  const toggleTheme = (theme: string) => {
    const styles = {
      ".MuiOutlinedInput-root": {
        color: `${theme !== "light" ? Colors.DARK_THEME_TEXT : ""}`,
        border: `1px solid ${theme !== "light" ? Colors.DARK_SIDE_BAR_HOVER : ""}`,
      },
    };
    return styles;
  };

  return !isLoading ? (
    <ModalContainer>
      <form
        className="form-container"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Title>Add items to trade</Title>
        <InputLabel className="padding-top" shrink htmlFor="input">
          Item name
        </InputLabel>
        <TextField
          className="padding-bottom"
          onChange={(e) => setItem(e.target.value)}
          variant="outlined"
          placeholder="Item name"
          fullWidth
          required
          id="input-name"
          size="small"
          error={titleError}
          sx={toggleTheme(theme)}
        />
        <InputLabel className="padding-top" shrink htmlFor="input">
          Item description
        </InputLabel>
        <TextField
          onChange={(e) => setItemDescription(e.target.value)}
          variant="outlined"
          placeholder="Item description"
          fullWidth
          required
          id="input-description"
          size="small"
          sx={toggleTheme(theme)}
        />
        <ContainerTitle>
          <InputLabel className="padding-top" shrink htmlFor="input">
            Upload images
          </InputLabel>
          <ImageUpload setItemImages={setItemImages} />
        </ContainerTitle>
        <ContainerTitle>
          <InputLabel className="padding-top" shrink htmlFor="input">
            Item's Category
          </InputLabel>
          <RadioCategory
            onChange={(e: any) => {
              onRadioChange(e);
            }}
          />
        </ContainerTitle>

        <Box className="button">
          <Button
            title={"Add Item"}
            type={Buttons.Primary}
            clickHandler={handleSubmit}
          />
        </Box>
      </form>
    </ModalContainer>
  ) : (
    <LoaderContainer>
      <Loader></Loader>
    </LoaderContainer>
  );
};

export default ModalInfo;
