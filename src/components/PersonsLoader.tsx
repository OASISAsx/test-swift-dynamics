'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { loadPersons } from '@/store/personsSlice';

export default function PersonsLoader() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadPersons());
  }, [dispatch]);

  return null;
}
