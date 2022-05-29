import { fetchPhotos } from './fetch-photos';
import { fetchPlaces } from './fetch-places';

const prepPlaces = async () => {
  const { results: places, context } = await fetchPlaces({
    categories: '13032,13033,13034,13035,13063,13036,11126',
    near: 'Santo Domingo',
    limit: 6,
  });

  let results = [];
  for (const entity of places) {
    const data = await fetchPhotos(entity?.fsq_id);
    results.push({ ...entity, photos: data });
  }

  return { results, context };
};

export default prepPlaces;
