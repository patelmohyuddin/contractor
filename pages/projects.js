import React from 'react';
import {useSelector} from 'react-redux'
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import {CircularProgress, Button} from '@material-ui/core';
import AddProjectModal from '../components/addProjectModal';
import Layout from '../components/layout';

export default function Projects() {
  const [open, setOpen] = React.useState(false);

  useFirestoreConnect([
    {collection: 'projects'}
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const projects = useSelector(state => state.firestore.ordered.projects);

  return (
    <Layout>
      <h1>Projects</h1>
      {!isLoaded(projects) ? <CircularProgress/> : (
        <>
          <ul>
            {!isEmpty(projects) && projects.map((project, idx) => <li key={idx}>{project.name}</li>)}
          </ul>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            + Add Project
          </Button>
        </>
      )}
      <AddProjectModal open={open} handleClose={handleClose}/>
    </Layout>
  );
}
