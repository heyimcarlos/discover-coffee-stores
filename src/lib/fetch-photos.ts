import axios from 'axios';
import { IPhoto } from 'interfaces/IPhoto';
import genQueryStr from 'utils/genQueryStr';

export const fetchPhotos = async (id: string, filter?: { [key: string]: string | number }) => {
  const queryStr = filter ? genQueryStr(filter) : '';
  const { data } = await axios.get<IPhoto[]>(`${process.env.FSQ_API_URL}/${id}/photos${queryStr}`, {
    headers: { Accept: 'application/json', Authorization: process.env.FSQ_API_KEY },
  });
  return data;
};
