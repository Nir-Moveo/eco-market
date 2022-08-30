import styled from "styled-components";
import { Colors } from "../../colors";

export const BannerContainer = styled("div")`
  position: absolute;
  margin-top: 140px;
  margin-left: -20px;
  width: fit-content;
  min-width: 100px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  .banner {
    padding: 20px;
    grid-column-gap: 20px;
    background-color: ${Colors.PRIMARY_WHITE};
    box-shadow: 0px 8px 24px ${Colors.TRANSPARENT_DARK};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .info {
      display: flex;
      flex-direction: column;
      .name {
        font-size: 1.2rem;
        height: auto;
      }
      .email {
        margin-top: 5px;
        font-size: 0.8rem;
        height: auto;
      }
    }
  }
`;
