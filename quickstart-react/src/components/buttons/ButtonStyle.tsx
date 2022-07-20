import styled from "styled-components";
import { Colors } from "../../colors";

export const ButtonContainer = styled.div`
  padding: 7px;
  border-radius: 4px;
  display: flex;
  height: fit-content;
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
  }

  &.primary {
    color: ${Colors.PRIMARY_WHITE};
    background: ${Colors.PRIMARY_BLUE};
    &:hover {
      background: ${Colors.HOVER_BLUE};
    }
  }
  &.secondary {
    border: 1px solid ${Colors.SECONDARY_GREY};
    &:hover {
      background: ${Colors.HOVER_GREY};
    }
  }
  &.delete {
    color: ${Colors.PRIMARY_RED};
    &:hover {
      background: ${Colors.HOVER_RED};
    }
  }
`;
