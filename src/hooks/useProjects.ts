import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '@/types';
import { BASE_URL } from '@/constants';

/* The Hook recieves project data*/

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [errorProject, setError] = useState<string>('');

  const fetchData = () => {
    axios
      .get(`some url`)
      .then((response) => {
        const data = response.data;
        const { items } = data;
        setProjects(items);
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { projects, errorProject, refetch: fetchData };
};
