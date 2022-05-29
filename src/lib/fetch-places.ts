import axios from 'axios';
import { IPlace } from 'interfaces/IPlace';
import { QueryResponse } from 'interfaces/response';
import genQueryStr from 'utils/genQueryStr';
import { fetchPhotos } from './fetch-photos';

export const fetchPlaces = async (filter: {
  [key: string]: string | number;
}): Promise<QueryResponse<IPlace>> => {
  const queryStr = genQueryStr(filter);
  const { data } = await axios.get<QueryResponse<IPlace>>(
    `${process.env.FSQ_API_URL}/search${queryStr}`,
    {
      headers: { Accept: 'application/json', Authorization: process.env.FSQ_API_KEY },
    }
  );

  let results = [];
  for (const entity of data?.results) {
    const data = await fetchPhotos(entity?.fsq_id, { limit: 1, classifications: 'menu' });
    // console.log('data', data);
    results.push({ ...entity, photos: data });
  }

  return { results, context: data?.context };
};
