import {User} from '../../../shared/type/user';
import fetcher from '../../fetcher';

type Response = User[];

export const getUsers = async () => {
  try {
    const res = await fetcher.get<Response>('/user');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
