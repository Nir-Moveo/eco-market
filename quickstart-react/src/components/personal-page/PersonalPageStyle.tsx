import styled from "styled-components";
import { Colors } from "../../colors";

export const PersonalPageContainer = styled.div`
  width: 100%;
`;
export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Tab = styled.div`
  text-align: center;
  width: 150px;
  line-height: 32px;
  border-bottom: 2px solid ${Colors.SECONDARY_GREY};
  &:hover {
    cursor: pointer;
  }
  &.active {
    border-bottom: 2px solid ${Colors.PRIMARY_BLUE};
  }
`;

export const InterestedContainer = styled.div`
  height: 85%;
  overflow: auto;
  gap: 8px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
