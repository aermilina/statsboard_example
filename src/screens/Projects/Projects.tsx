import React, { useState } from 'react';
import { ProjectsList } from '@/components';
import { Container, Typography } from '@mui/material';
import AddProject from '@/components/AddProject';
import { ConfirmationDialog, PopupAlert } from '@/components';
import axios from 'axios';
import { useProjects } from '@/hooks';
import { BASE_URL } from '@/constants';

/* The component renders the projects page*/

export default function Projects() {
  const [openDialog, setDialogOpen] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { projects, errorProject, refetch } = useProjects();
  const handleOpenPopup = (id: number) => {
    setDialogOpen(true);
    setProjectId(id);
  };
  const handleDeleteProject = () => {
    axios
      .post(`some url`, JSON.stringify({ id: projectId }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const { data } = response;
        if (data.status === 'ok') {
          setSuccess(true);
        } else {
          setError(data.message);
        }
        refetch();
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Typography variant="h1" component="h2">
          Projects
        </Typography>
        <AddProject refetch={refetch} />
        <ProjectsList projects={projects} setDialogOpen={handleOpenPopup} />
      </Container>
      {openDialog && (
        <ConfirmationDialog
          title="Remove"
          dialogText="Do you exactly want to remove?"
          buttonText="Remove"
          action={handleDeleteProject}
          setOpen={setDialogOpen}
          open={openDialog}
        />
      )}
      {error && <PopupAlert type="error" message={error} />}
      {success && <PopupAlert type="success" message="You have successfully removed" />}
      {errorProject && (
        <PopupAlert
          type="error"
          message={`${errorProject}. Ask the system administrator for the help`}
        />
      )}
    </>
  );
}
