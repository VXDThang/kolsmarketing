import React from 'react';
import Grid from '@mui/material/Grid';

//file
import List_Job from './List_Job';
import Job_Content from './Job_Content';

export default function Job() {

  const [idJobPicker, setIdJobPicker] = React.useState(0);
  return (
    <div>
      <Grid container >

      <Grid item xs={4.5}>
          <List_Job
            id_job_picker={(value) => setIdJobPicker(value)} />
        </Grid>

        <Grid item xs={7.5} sx={{ paddingLeft: "30px", paddingRight: "20px" }}>
          <Job_Content
            idJobPicker={idJobPicker} />
        </Grid>

       

      </Grid>
    </div>
  );
}