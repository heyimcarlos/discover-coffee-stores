import axios from 'axios';
import genQueryStr from 'utils/genQueryStr';

export const fetchPlaces = async (filter: { [key: string]: string }) => {
  const queryStr = genQueryStr(filter);
  const res = await axios.get(`${process.env.FSQ_API_URL}/${queryStr}`, {
    headers: { Accept: 'application/json', Authorization: process.env.FSQ_API_KEY },
  });
  console.log(res, 'res');
};
