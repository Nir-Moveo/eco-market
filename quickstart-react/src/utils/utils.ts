export const formatMutation = (key: string, value: string | number) => {
  return `\\\"${key}\\\":\\\"${value}\\\"`;
};

export const formatNewInterestedNotification = (interestedName: string, itemName: string) => {
  return `Nice! ${interestedName} added your item \\\"${itemName}\\\" to their wishlist.`
}

export const formatItemSoldNotification = (itemName: string) => {
  return `Oops! The item you were interested in - \\\"${itemName}\\\" - is no longer relevant.`
}