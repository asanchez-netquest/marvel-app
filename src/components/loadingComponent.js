"use client";
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingComponent() {
  return (
    <>
    
        <div className="columns is-vcentered is-centered">
          <div className="column">

          <CircularProgress 
          sx={{
            color: '#31DEE5'}}
            size={160}
            thickness={6}
          />
          </div>
         
          
        </div>
     
    </>
  );
}
