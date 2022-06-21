import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Categories } from "../../types/types";

export interface IRadio {
  label: string;
}
const RadioCategory = (props: any) => {
  const handleChange = (event: any) => {
    props.onChange(event);
  };
  const renderCategories = () => {
    return Object.keys(Categories).map((category) => (
      <FormControlLabel
        value={category}
        control={<Radio size="small" onChange={(e) => handleChange(e.target.value)} />}
        label={category.replaceAll("_", " ")}
      />
    ));
  };
  return (
    <FormControl>
      <RadioGroup row name="row-radio-buttons-group">
        {renderCategories()}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioCategory;
