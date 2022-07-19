import _ from "lodash";
import React, { useEffect, useState } from "react";
import { addToWishlist, createNotification, fetchInterested, removeFromWishlist, storageGetItem } from "../../services/monday.api";
import { Context, ICard } from "../../types/types";
import { formatNewInterestedNotification } from "../../utils/utils";
import Loader from "../loader/Loader";
import { WishlistIconContainer } from "./WishlistStyle";

interface IWishlist {
  item: ICard;
  getCardInfo: (itemId: number) => void;
}

const WishlistIcon = ({item, getCardInfo}: IWishlist) => {
  const [isIntrested, setIsIntrested] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await storageGetItem(Context.UserID);
      setUserId(+userId)
    };
    getUserId();
  },[])

  const newInterestedNotification = async () => {
    const user = await fetchInterested([userId]);
    const boardId = await storageGetItem(Context.BoardID);
    await createNotification(item.owner.id, boardId, formatNewInterestedNotification(user[0].display_name, item.name));
    }

  useEffect(() => {
    // if the user already interested in the item
    const userIncludedInIntrested = Boolean(
      _.find(item.interested, (user) => {
        return user.id === userId;
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
          newInterestedNotification()
          setisLoading(false);
        })
        .catch((err) => console.log(err));
  };

  return (
    <WishlistIconContainer onClick={clickLandler}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <img alt="heart" src={require(`../../assets/${isIntrested ? "full" : "empty"}-heart.svg`)} />
      )}
    </WishlistIconContainer>
  );
};

export default WishlistIcon;
