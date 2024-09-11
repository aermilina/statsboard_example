import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Project } from '@/types';

interface Props {
  setDialogOpen: (id: number) => void;
  projects?: Project[];
}

/* The component renders the list of projects*/

export default function ProjectsList({ setDialogOpen, projects }: Props) {
  return (
    <List>
      {projects?.map((project) => {
        const { name, id } = project;
        return (
          <>
            <ListItem
              key={id}
              sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h6" sx={{ flexGrow: 1, width: '80%' }}>
                {name}
              </Typography>
              <ListItemButton>
                <Tooltip title="Delete the line">
                  <IconButton>
                    <DeleteIcon onClick={() => setDialogOpen(id)} />
                  </IconButton>
                </Tooltip>
              </ListItemButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </>
        );
      })}
    </List>
  );
}
