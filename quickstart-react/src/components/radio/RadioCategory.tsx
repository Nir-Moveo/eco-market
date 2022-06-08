import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export interface IRadio {
  label: string;
}
const RadioCategory = (props:any) => {
    const handleChange = (event:any) => {
      props.onChange(event);
  }
  return (
    <FormControl>
      <RadioGroup
        row
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Clothing" control={<Radio onChange={(e) => handleChange(e.target.value)}
        />} label="Clothing" />
        <FormControlLabel value="Electricty" control={<Radio onChange={(e) => handleChange(e.target.value)}
        />} label="Electricty" />
        <FormControlLabel value="Furniture" control={<Radio onChange={(e) => handleChange(e.target.value)}
        />} label="Furniture" />
        <FormControlLabel value="Other" control={<Radio onChange={(e) => handleChange(e.target.value)}
        />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioCategory
