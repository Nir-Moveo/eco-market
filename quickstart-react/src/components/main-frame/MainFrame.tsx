import * as React from "react";
import { Component, useEffect } from "react";
import Header from "../header/Header";
import SideMenu from "../side-menu/views/SideMenu";
import { GeneralDiv, MainContainer } from "./MainFrameStyle";
import {createNewBoard} from '../../services/script';
import Home from "../home/home";
import Modal from "../modal/Modal";

interface MainFrameProps {}

const MainFrame: React.FC<MainFrameProps> = () => {

  useEffect( ()=> { console.log("test");
   createNewBoard()},[]);
  
  return (
    <GeneralDiv>
    <Header />

    <MainContainer>
      <SideMenu />
      <Home />
      <Modal></Modal>

    </MainContainer>
    </GeneralDiv>
  );
};

export default MainFrame;
