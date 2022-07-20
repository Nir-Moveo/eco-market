import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { Categories } from "../../types/types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
export interface IRadio {
  label: string;
}
const RadioCategory = (props: any) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const category = event.target.value;
    setSelectedCategory(category);
    props.onChange(category);
  };

  const renderSelectCategories = () => {
    return Object.keys(Categories).map((category, index) => (
      <MenuItem key={category + index} value={category}>
        {category.replaceAll("_", " ")}
      </MenuItem>
    ));
  };
  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        value={selectedCategory}
      >
        {renderSelectCategories()}
      </Select>
    </FormControl>
  );
};

export default RadioCategory;
