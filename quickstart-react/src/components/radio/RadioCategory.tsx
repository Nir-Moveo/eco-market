import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { Categories } from "../../types/types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import _ from "lodash";
export interface IRadio {
  label: string;
}
const style = {
  height: "40px",
};
const RadioCategory = (props: any) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { item } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const category = event.target.value;
    setSelectedCategory(category);
    props.onChange(category);
  };

  const renderSelectCategories = () => {
    return Object.keys(Categories)
      .slice(1, -1)
      .map((category, index) => (
        <MenuItem key={category + index} value={category}>
          {category.replaceAll("_", " ")}
        </MenuItem>
      ));
  };
  return (
    <FormControl>
      <Select
        style={style}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        value={
          selectedCategory && selectedCategory.length
            ? selectedCategory
            : item
            ? _.capitalize(item.category)
            : selectedCategory
        }
      >
        {renderSelectCategories()}
      </Select>
    </FormControl>
  );
};

export default RadioCategory;
