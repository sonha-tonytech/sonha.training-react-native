import {ItemData} from '../../../shared/type/data';
import fetcher from '../../fetcher';

type Params = ItemData;

type Response = ItemData;

export const createPost = async ({body}: Params) => {
  try {
    const res = await fetcher.post<Response>('/list', {body});
    return res.data;
  } catch (error) {
    return (error as any).code as string;
  }
};
