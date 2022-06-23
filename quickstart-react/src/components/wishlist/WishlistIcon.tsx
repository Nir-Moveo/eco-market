import _ from "lodash";
import React, { useEffect, useState } from "react";
import { addToWishlist, fetchContext, removeFromWishlist } from "../../services/monday.api";
import { ICard, IUser } from "../../types/types";
import Loader from "../loader/Loader";
import { WishlistIconContainer } from "./WishlistStyle";

interface IWishlist {
  item: ICard;
  getCardInfo: (itemId: number) => void;
}

const WishlistIcon = (props: IWishlist) => {
  const { item, getCardInfo } = props;
  //get user id
  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: {
          user: { id: userId },
        },
      } = await fetchContext();
      setUserId(userId);
    };
    fetchUserId();
  }, []);

  const [isIntrested, setIsIntrested] = useState(false);
  const [userId, setUserId] = useState();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // if the user already interested in the item
    const userIncludedInIntrested = Boolean(
      _.find(item.interested, (user) => {
        return user.id.toString() === userId;
      })
    );

    setIsIntrested(userIncludedInIntrested);
  }, [userId, item.interested]);

  const clickLandler = () => {
    setisLoading(true);

    //remove user from wishlist
    if (isIntrested) {
      removeFromWishlist(item.id)
        .then((res) => {
          setIsIntrested(false);
          getCardInfo(item.id);
          setisLoading(false);
        })
        .catch((err) => console.log(err));

      //add user from wishlist
    } else
      addToWishlist(item.id)
        .then((res) => {
          setIsIntrested(true);
          getCardInfo(item.id);
          setisLoading(false);
        })
        .catch((err) => console.log(err));
  };
  return (
    <WishlistIconContainer onClick={clickLandler}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <img src={require(`../../assets/${isIntrested ? "full" : "empty"}-heart.svg`)} />
      )}
    </WishlistIconContainer>
  );
};

export default WishlistIcon;
