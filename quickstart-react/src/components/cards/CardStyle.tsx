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
  display: flex;
  flex-direction: column;
  height: 216px;
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
  position: relative;
  height: 430px;
  width: 288px;
  background: ${Colors.GREY};
  border: 1px solid ${Colors.GREEN};
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 24px 24px 0;
  overflow: auto;
  .avatar-group > .MuiAvatar-root,
  .avatar {
    height: 28px;
    width: 28px;
    font-size: 12px;
  }
  .avatar:hover {
    cursor: pointer;
  }
  .interested-text {
    color: ${Colors.DARK_GREEN};
    font-size: 12px;
  }
  .intrested-container {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: auto;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    margin: 0 0 5% 0;
  }
`;

export const SlideShow = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  /* Next & previous buttons */
  .prev,
  .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 16px;
    color: white;
    font-weight: 100;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }
  /* Position the "next button" to the right */
  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }
  .image-placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

export const Slide = styled.div`
  height: 200px;
  overflow: hidden;
  display: block;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
  /* Fading animation */
  &.fade {
    animation-name: fade;
    animation-duration: 1.5s;
  }

  &.hide {
    display: none;
  }

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;

export const CardListContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  width:100%;
  justify-content:space-between;
`;
