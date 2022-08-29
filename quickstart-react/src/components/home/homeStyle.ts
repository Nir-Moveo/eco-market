import styled from "styled-components";

export const HomeBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 42px;
`;

export const ContentDiv = styled.div`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 160vh;
  overflow-y: auto;
  padding-bottom: 32px;
  padding-right: 32px;
`;

export const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  .headlines {
    display: flex;
    flex-direction: column;
  }
`;

export const MainTitle = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 24px;
  padding-bottom: 8px;
`;

export const SubTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 22px;
`;
