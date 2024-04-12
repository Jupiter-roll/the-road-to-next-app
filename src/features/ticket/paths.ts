export const isTicketPath = (value: string) => {
  return /\/tickets\/[a-zA-Z0-9]+/.test(value);
};

export const findTicketIdsFromText = (value: string) => {
  const regexPattern = /\/tickets\/[a-zA-Z0-9]+/g;
  const paths = value.match(regexPattern) || [];
  return paths.map((path) => path.replace('/tickets/', ''));
};
