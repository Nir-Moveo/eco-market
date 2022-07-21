import * as React from "react";
import ImageUpload from "../image-upload/ImageUpload";
import RadioCategory from "../radio/RadioCategory";
import {
  Title,
  ModalContainer,
  ContainerTitle,
  LoaderContainer,
} from "./ModalInfoStyle";
import { useState } from "react";
import { Box, InputLabel, TextField } from "@mui/material";
import { addNewItem } from "../../services/monday.api";
import { Buttons, Categories } from "../../types/types";
import Loader from "../loader/Loader";
import Button from "../buttons/Button";

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
