import {ItemData} from 'shared/type/data';
import fetcher from '../../fetcher';

type Params = ItemData;

type Response = ItemData;

export const updatePost = async ({id, ...body}: Params, token: string) => {
  try {
    const res = await fetcher.patch<Response>(
      `list/${id}`,
      {...body},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    return (error as any).code as string;
  }
};
