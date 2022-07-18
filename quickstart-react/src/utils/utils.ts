export const formatMutation = (key: string, value: string | number) => {
  return `\\\"${key}\\\":\\\"${value}\\\"`;
};

export const formatNewInterestedNotification = (interestedName: string, itemName: string) => {
  return `Nice! ${interestedName} added your item \\\"${itemName}\\\" to their wishlist.`
}