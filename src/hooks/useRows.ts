import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, CreateUrlArgs } from '@/types';
import { BASE_URL } from '@/constants';
import { createUrl } from '@/utils';

/* Hook recieves table data*/
const COMMON_URL = `some url`;

export const useRows = ({ page, projectId }: CreateUrlArgs) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [errorRows, setErrorRows] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);

  const url = createUrl({ id: projectId, page });

  const fetchData = () => {
    axios
      .get(url || COMMON_URL)
      .then((response) => {
        const data = response.data;
        const { items, total } = data;
        setTotal(total);
        setRows(items);
      })
      .catch((error) => {
        setErrorRows(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [projectId, page]);

  return { rows, errorRows, isLoading, total, refetch: fetchData };
};
