export const formatMutation = (key: string, value: string | number) => {
  return `\\\"${key}\\\":\\\"${value}\\\"`;
};