import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { Categories } from "../../types/types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import _ from "lodash";
import { storageGetItem } from "../../services/monday.api";
import { Colors } from "../../colors";
export interface IRadio {
  label: string;
}

const RadioCategory = (props: any) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { item } = props;

  const [theme, setTheme] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const theme = await storageGetItem("theme");
      setTheme(theme);
    };
    fetchData();
  });

  const style = {
    height: "40px",
    color: `${theme !== "light" ? Colors.DARK_THEME_TEXT : ""}`,
    border: `${
      theme !== "light" ? `1px solid ${Colors.DARK_SIDE_BAR_HOVER}` : ""
    }`,
  };

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
