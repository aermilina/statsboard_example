import { Project } from '@/types';

/*The function to recive the project by id*/

export function getProjectById(projects: Project[], id: number) {
  const currentProject = projects?.find((project) => project.id === id);
  return currentProject?.name;
}
