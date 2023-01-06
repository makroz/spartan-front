export const initialsName = (name: string) => {
  const names = (name + " ").split(" ");
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase().trim();
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
