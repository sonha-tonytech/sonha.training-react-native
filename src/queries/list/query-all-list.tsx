import {ItemData} from 'shared/type/data';
import fetcher from '../../fetcher';

type Params = {
  _start?: number;
  _limit?: number;
};

type Response = ItemData[];

export const getAllLists = async (params: Params) => {
  try {
    const res = await fetcher.get<Response>('/list', {params});
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
