import styled from "styled-components";
import { Colors } from "../../colors";

export const ButtonContainer = styled.div`
  padding: 8px;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }

  &.primary {
    color: ${Colors.PRIMARY_WHITE};
    background: ${Colors.PRIMARY_BLUE};
  }
  &.secondary {
    border-color: ${Colors.PRIMARY_GREY};
  }
  &.delete {
    color: ${Colors.PRIMARY_RED};
  }
`;
