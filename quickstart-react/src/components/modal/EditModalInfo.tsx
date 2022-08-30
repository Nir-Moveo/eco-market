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
import {
  addImagesToItem,
  columnIdsFromStorage,
  editItem,
  getItemsByIds,
  storageGetItem,
} from "../../services/monday.api";
import { Buttons, Categories, Columns, Groups, ICard } from "../../types/types";
import Loader from "../loader/Loader";
import Button from "../buttons/Button";
import { Colors } from "../../colors";

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
  const [titleError, setTitleError] = useState(false);

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
    setTitleError(false);
    if (name == "") {
      setTitleError(true);
    }
    if (name !== "") {
      setIsLoading(true);
      const valuesToUpdate = {
        name: name,
        category: radioValue ?? Categories.Other,
        description: itemDescription,
      };
      const columns = await columnIdsFromStorage([
        Columns.Description,
        Columns.Category,
        Columns.Images,
      ]);

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
        border: `1px solid ${
          theme !== "light" ? Colors.DARK_SIDE_BAR_HOVER : ""
        }`,
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
          defaultValue={item?.description ?? ""}
          sx={toggleTheme(theme)}
        />
        <ContainerTitle>
          <InputLabel className="padding-top" shrink htmlFor="input">
            Upload images
          </InputLabel>
          <ImageUpload
            item={item}
            setItemImages={setItemImages}
            updateCard={updateCard}
          />
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
          <Button
            title={"Save changes"}
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

export default EditModalInfo;
