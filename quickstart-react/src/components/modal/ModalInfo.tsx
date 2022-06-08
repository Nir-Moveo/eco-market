import * as React from 'react';
import Input from '../input/Input';
import ImageUpload from '../image-upload/ImageUpload';
import RadioCategory from '../radio/RadioCategory';
import Checkbox from '../checkbox/CheckboxContact';
import { Title, ModalContainer, ContainerTitle, Divider } from "./ModalInfoStyle";
import { useState } from 'react';
import { Box, Button, InputLabel, TextField } from '@mui/material';

const ModalInfo = (props: { onClose: () => void; }) => {
  const [item, setItem] = useState<string>('')
  const [itemDescription, setItemDescription] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  const [radioValue, setRadioValue] = useState<string>('')
  const [checkboxValue, setCheckboxValue] = useState<string>('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)


  const onRadioChange = (e: any) => {
    setRadioValue(e)
    console.log(e);
  }
  const onCheckboxChange = (e: any) => {
    if (e.target.checked) {
      setCheckboxValue(e.target.value)
    } else {
      setCheckboxValue('')
    }
    console.log(checkboxValue);
  }


  const handleSubmit = (e: any) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (item == '') {
      setTitleError(true)
    }
    if (itemDescription == '') {
      setDetailsError(true)
    }
    const payload = {
      name: item,
      description: itemDescription,
      category: radioValue,
      phone: contact
    }
    console.log(payload)
    if (titleError) {
      props.onClose();
    }
  }

  return (
    <ModalContainer>
      <form className="form-container" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Title>Add items to trade</Title>
        <InputLabel className='padding-top' shrink htmlFor="input">
          Item name
        </InputLabel>
        <TextField
          className='padding-bottom'
          onChange={(e) => setItem(e.target.value)}
          variant="outlined"
          placeholder="Item name"
          fullWidth
          required
          error={titleError}
          id="input-name"
          size="small"
        />
        <InputLabel className='padding-top' shrink htmlFor="input">
          Item description
        </InputLabel>
        <TextField
          onChange={(e) => setItemDescription(e.target.value)}
          variant="outlined"
          placeholder="Item description"
          fullWidth
          required
          error={titleError}
          id="input-description"
          size="small"

        />
        <ContainerTitle>
          <InputLabel className='padding-top' shrink htmlFor="input">
            Upload images
          </InputLabel>
          <ImageUpload />
        </ContainerTitle>
        <ContainerTitle>
          <InputLabel className='padding-top' shrink htmlFor="input">
            Item's Category
          </InputLabel>
          <RadioCategory onChange={(e: any) => { onRadioChange(e) }} />
        </ContainerTitle>
        <Divider />
          <InputLabel className='padding-top' shrink htmlFor="input">
            Contact details
          </InputLabel>
        <TextField
          onChange={(e) => setContact(e.target.value)}
          variant="outlined"
          placeholder="Phone number"
          fullWidth
          required
          error={titleError}
          id="input-phone_number"
          className='margin-bottom'
          size="small"

        />
        <Box className='button'
        >

          <Button
            type="submit"
            variant="contained"
            size="medium"
          >
            Add Item
          </Button>
        </Box>
      </form>

    </ModalContainer>
  );
}

export default ModalInfo;
