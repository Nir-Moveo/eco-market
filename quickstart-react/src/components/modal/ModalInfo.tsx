import * as React from "react";
import ImageUpload from "../image-upload/ImageUpload";
import RadioCategory from "../radio/RadioCategory";
import { Title, ModalContainer, ContainerTitle, ModalWrapperContainer } from "./ModalInfoStyle";
import { useState } from "react";
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { addNewItem } from "../../services/monday.api";
import { Categories } from "../../types/types";
import Loader from "../loader/Loader";

const ModalInfo = (props: { onClose: () => void }) => {
  const [item, setItem] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemImages, setItemImages] = useState<any>();
  const [radioValue, setRadioValue] = useState<Categories>(Categories.Other);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRadioChange = (e: Categories) => {
    setRadioValue(e);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      name: item,
      description: itemDescription,
      category: radioValue,
      images: itemImages,
    };

    await addNewItem(payload);
    props.onClose();
    setIsLoading(false);
  };

  return (
    <ModalWrapperContainer>
      {!isLoading ? (
        <ModalContainer>
          <form className="form-container" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
              <Button type="submit" variant="contained" size="medium">
                Add Item
              </Button>
            </Box>
          </form>
        </ModalContainer>
      ) : (
        <Loader></Loader>
      )}
    </ModalWrapperContainer>
  );
};

export default ModalInfo;
