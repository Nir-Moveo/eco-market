import styled from "styled-components";

export const HomeBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100vh;
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
  padding-bottom:8px;
`;

export const SubTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 22px;
`;
