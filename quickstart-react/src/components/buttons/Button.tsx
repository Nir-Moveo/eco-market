import React from "react";
import { Buttons } from "../../types/types";
import { ButtonContainer } from "./ButtonStyle";

const Button = (props: { clickHandler: () => void; type: Buttons; title: string }) => {
  const { clickHandler, type, title } = props;

  return (
    <ButtonContainer className={type} onClick={clickHandler}>
      {title}
    </ButtonContainer>
  );
};

export default Button;
