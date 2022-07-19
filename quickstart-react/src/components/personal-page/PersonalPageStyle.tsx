import styled from "styled-components";
import { Colors } from "../../colors";

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Tab = styled.div`
  width: 120px;
  border-bottom: 2px solid ${Colors.SECONDARY_GREY};

  &.active {
    border-bottom: 2px solid ${Colors.PRIMARY_BLUE};
  }
`;
