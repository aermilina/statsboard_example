import { BASE_URL } from '@/constants';
import { CreateUrlArgs } from '@/types';
/* The function creates url*/

export function createUrl({ page, id }: CreateUrlArgs) {
  let url = `some url`;
  if (page) {
    url = `${url}/${page + 1}`;
  }
  if (id && id !== `0`) {
    url = `${url}?id=${id}`;
  }

  return url;
}
