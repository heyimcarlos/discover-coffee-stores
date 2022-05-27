const genQueryStr = (filter: { [key: string]: string }) => {
  const keys = Object.keys(filter);
  const queryStr = keys.map(key => `${key}=${encodeURIComponent(filter[key])}`).join('&');
  return `?${queryStr}`;
};

export default genQueryStr;
