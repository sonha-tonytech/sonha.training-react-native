import {User} from '../../../shared/type/user';
import fetcher from '../../fetcher';

type Params = User;

type Response = User;

export const updateUser = async ({id, ...body}: Params) => {
  try {
    const res = await fetcher.patch<Response>(`user/${id}`, {...body});
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
