import {User} from 'shared/type/user';
import fetcher from '../../fetcher';

type Params = {
  userName: string;
  password: string;
};

type Response = {
  user: User;
  token: string;
};

export const getLoginUser = async (params: Params) => {
  try {
    const res = await fetcher.get<Response>('/user/login', {params});
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
