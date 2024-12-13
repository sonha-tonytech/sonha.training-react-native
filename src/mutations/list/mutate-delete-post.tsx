import {ItemData} from 'shared/type/data';
import fetcher from '../../fetcher';

type Params = {
  id: string;
};

type Response = ItemData;

export const deletePost = async ({id}: Params) => {
  try {
    const res = await fetcher.delete<Response>(`/list/${id}`);
    return res.data;
  } catch (error) {
    return (error as any).code as string;
  }
};
