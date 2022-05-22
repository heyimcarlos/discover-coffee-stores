const slugify = (string: string): string => {
  return string.toLowerCase().split(' ').join('-');
};

export default slugify;
