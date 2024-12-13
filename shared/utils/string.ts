export const getFirstNameUser = (fullName: string) => fullName.split(' ')[0];

export const upperCaseFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);
