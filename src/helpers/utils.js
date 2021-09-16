export const range = (start = 1, end) => {
  return [...Array(end).keys()].map(el => el + start);
}