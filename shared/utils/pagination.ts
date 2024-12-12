import {PageTakeSkip} from '../type';

export const getPaginationSkipValue = (data: PageTakeSkip): number => {
  if (data?.take === Infinity) {
    return 0;
  }

  if (typeof data.page === 'number') {
    if (data.take) {
      return (data.page <= 0 ? 1 : data.page) * data.take - data.take;
    }

    return 0;
  }

  if (typeof data.skip === 'number') {
    return data.skip < 0 ? 0 : data.skip;
  }

  return 0;
};
