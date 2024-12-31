import {User} from './user';

export type ItemData = {
  id: string;
  body: {
    title: string;
    text: string;
    userId: string;
    updateAt: string;
    user: User;
  };
};
