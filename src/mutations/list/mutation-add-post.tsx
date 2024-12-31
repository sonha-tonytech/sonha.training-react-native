import {ItemData} from 'shared/type/data';
import fetcher from '../../fetcher';

type Params = ItemData;

type Response = ItemData;

export const createPost = async (params: Params) => {
  try {
    const res = await fetcher.post<Response>('/list', params);
    return res.data;
  } catch (error) {
    return (error as any).code as string;
  }
};
