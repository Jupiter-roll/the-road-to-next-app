export const findTicketIdsFromText = (inputString: string) => {
  const regexPattern = /\/tickets\/[a-zA-Z0-9]+/g;
  const paths = inputString.match(regexPattern) || [];
  return paths.map((path) => path.replace('/tickets/', ''));
};
