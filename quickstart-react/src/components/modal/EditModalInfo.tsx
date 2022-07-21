import * as React from "react";
import ImageUpload from "../image-upload/ImageUpload";
import RadioCategory from "../radio/RadioCategory";
import { Title, ModalContainer, ContainerTitle, LoaderContainer } from "./ModalInfoStyle";
import { useEffect, useState } from "react";
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { addImagesToItem, addNewItem, columnIdsFromStorage, editItem, getItemsByIds } from "../../services/monday.api";
import { Categories, Columns, Groups, ICard } from "../../types/types";
import Loader from "../loader/Loader";

interface IPlaceholder {
  updateCard: (card: ICard) => void;
  onClose: () => void;
  item: ICard;
}

const EditModalInfo: React.FC<IPlaceholder> = (props: IPlaceholder) => {
  const { updateCard, item } = props;

  const [name, setName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemImages, setItemImages] = useState<any>();
  const [radioValue, setRadioValue] = useState<Categories>(Categories.Other);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [titleError, setTitleError] = useState(false)

  const onRadioChange = (e: Categories) => {
    setRadioValue(e);
  };

  useEffect(() => {
    if (item) {
      setName(item.name);
      setItemDescription(item.description);
      onRadioChange(item.category);
    }
  }, [item]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setTitleError(false)
    if (name == '') {
      setTitleError(true)
    }
    if (name !== '') {
      setIsLoading(true);
      const valuesToUpdate = {
        name: name,
        category: radioValue ?? Categories.Other,
        description: itemDescription,
      };
      const columns = await columnIdsFromStorage([Columns.Description, Columns.Category, Columns.Images]);

      if (itemImages && itemImages.length > 0) {
        await addImagesToItem(item.id, columns[Columns.Images], itemImages);
      }
      await editItem(item.id, valuesToUpdate);
      const newItem = await getItemsByIds([item.id], Groups.Active);
      await updateCard({ ...newItem[0], ...valuesToUpdate });

      await props.onClose();
      setIsLoading(false);
    }
  };

  return !isLoading ? (
    <ModalContainer>
      <form className="form-container" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Title>{item ? "Edit Your Item" : "Add items to trade"}</Title>
        <InputLabel className="padding-top" shrink htmlFor="input">
          Item name
        </InputLabel>
        <TextField
          className="padding-bottom"
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          placeholder="Item name"
          fullWidth
          required
          id="input-name"
          size="small"
          defaultValue={item?.name ?? ""}
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
          defaultValue={item?.description ?? ""}
        />
        <ContainerTitle>
          <InputLabel className="padding-top" shrink htmlFor="input">
            Upload images
          </InputLabel>
          <ImageUpload item={item} setItemImages={setItemImages} updateCard={updateCard} />
        </ContainerTitle>
        <ContainerTitle>
          <InputLabel className="padding-top" shrink htmlFor="input">
            Item's Category
          </InputLabel>
          <RadioCategory
            onChange={(e: any) => {
              onRadioChange(e);
            }}
            item={item ?? ""}
          />
        </ContainerTitle>

        <Box className="button">
          <Button type="submit" variant="contained" size="medium">
            {item ? "Save changes" : "Add item"}
          </Button>
        </Box>
      </form>
    </ModalContainer>
  ) : (
    <LoaderContainer>
      <Loader></Loader>
    </LoaderContainer>
  );
};

export default EditModalInfo;
