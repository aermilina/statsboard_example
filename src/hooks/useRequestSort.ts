import { useState } from 'react';
import { Order, Row } from '@/types';

/* The hook sorts the table*/

export const useRequestSort = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Row>('kpiNumber');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Row) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return { order, orderBy, handleRequestSort };
};
