import React, { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/themes";

import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import MainFrame from "./components/main-frame/MainFrame";
import {
  initializeColumns,
  fetchColumns,
  fetchContext,
  fetchGroups,
  initializeGroups,
  setGroupIdsToStorage,
  setColumnIdsToStorage,
  storageSetItem,
  listenToContext,
} from "./services/monday.api";
import { Columns, Context, Groups } from "./types/types";

const groupsExist = (groups: string[]) => {
  const regex = new RegExp(`^${Groups.Active}|^${Groups.Sold}`);
  const filtered = groups.filter((g) => regex.test(g));
  return filtered.length;
};

const columnsExist = (columns: string[]) => {
  const regex = new RegExp(
    `^${Columns.Description}|^${Columns.Category}|^${Columns.Images}|^${Columns.Interested}`
  );
  const filtered = columns.filter((c) => regex.test(c));
  return filtered.length;
};

const App = () => {
  const getContext = async (): Promise<any> => {
    const { data } = await fetchContext();
    return data;
  };

  const callback = async (res: any) => {
    setTheme(res.data.theme);
    await storageSetItem("theme", res.data.theme);
  };

  const listenContext = async (): Promise<any> => {
    await listenToContext(callback);
  };

  const [appTheme, setTheme] = useState("light");

  useEffect(() => {
    const initializeApp = async () => {
      // Fetch board id
      const {
        boardId,
        user: { id: userId },
      } = await getContext();
      listenContext();
      await storageSetItem(Context.BoardID, boardId);
      await storageSetItem(Context.UserID, userId);
      // Check if groups are initialized, if not - initialize
      const groups = await fetchGroups(boardId);
      if (!groupsExist(groups)) await initializeGroups(boardId);
      // Set the groupIds in storage for easy access
      await setGroupIdsToStorage(groups);

      // Check if columns are initialized, if not - initialize
      const columns = await fetchColumns(boardId);
      if (!columnsExist(columns)) await initializeColumns(boardId);
      // Set the columnIds in storage for easy access
      await setColumnIdsToStorage(columns);
    };

    initializeApp();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={appTheme === "light" ? lightTheme : darkTheme}>
        <MainFrame />
      </ThemeProvider>
    </div>
  );
};

export default App;
