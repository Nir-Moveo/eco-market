import styled from "styled-components";
import { Colors } from "../../colors";

export const Title = styled.span`
  margin: 0;
  font-weight: 600;
  font-size: 1.125rem;
  color: ${Colors.PRIMARY_BLACK};
`;

export const Image = styled.img`
  width: clamp(100px, 20%, 600px);
  border-radius: 20px 0 0 20px;
  object-fit: cover;

  @media screen and (max-width: 480px) {
    width: auto;
    max-height: 100px;
    border-radius: 20px 20px 0 0;
  }
`;

export const Date = styled.span`
  letter-spacing: 0.015625rem;
  color: ${Colors.PRIMARY_GREY};
  font-size: 0.625rem;
  font-weight: 100;
`;

export const Description = styled.p`
  margin: 19.25px 0;
  font-weight: 100;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const InfoContainer = styled.div`
  margin: 16px;
  @media screen and (max-width: 480px) {
    width: auto;
    white-space: pre-wrap;
  }
  .owner-container {
    display: flex;
    align-items: center;
    gap: 8px;
    .display-name {
      letter-spacing: 0.015625rem;
      font-size: 0.875rem;
      font-weight: 100;
      color: ${Colors.PRIMARY_BLACK};
      text-transform: capitalize;
    }
  }
  .item-info-container {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }
`;

export const CardContainer = styled.div`
  height: 230px;
  width: 300px;
  background: white;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  display: flex;
  margin: 0 24px 24px 0;
  overflow: auto;

  @media (max-width: 480px) {
    flex-direction: column;
    margin: 0 0 5% 0;
  }
`;
