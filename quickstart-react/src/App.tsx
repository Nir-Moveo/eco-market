import React, { useEffect } from "react";
import "./App.css";

import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import MainFrame from "./components/main-frame/MainFrame";
import {
  initializeColumns,
  fetchColumns,
  fetchContext,
  fetchGroups,
  initializeGroups,
  columnIdsFromStorage,
  storageGetItem,
  getAllItems,
  addNewItem,
} from "./services/monday.api";
import { Columns, Groups } from "./types/types";

const groupsExist = (groups: string[]) => {
  const regex = new RegExp(`^${Groups.Active}|^${Groups.Sold}`);
  const filtered = groups.filter((g) => regex.test(g));
  return filtered.length;
};

const columnsExist = (columns: string[]) => {
  const regex = new RegExp(`^${Columns.Description}|^${Columns.Category}|^${Columns.Images}|^${Columns.Interested}`);
  const filtered = columns.filter((c) => regex.test(c));
  return filtered.length;
};

const App = () => {
  const getContext = async (): Promise<any> => {
    const { data } = await fetchContext();
    return data;
  };

  useEffect(() => {
    const initializeApp = async () => {
      // Fetch board id
      const { boardId } = await getContext();
      // Check if groups are initialized, if not - initialize
      const groups = await fetchGroups(boardId);
      if (!groupsExist(groups)) await initializeGroups(boardId);

      // Check if columns are initialized, if not - initialize
      const columns = await fetchColumns(boardId);
      if (!columnsExist(columns)) await initializeColumns(boardId);
    };

    initializeApp();
  }, []);

  return (
    <div className="App">
      <MainFrame />
    </div>
  );
};

export default App;
