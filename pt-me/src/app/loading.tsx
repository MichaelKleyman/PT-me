'use client';
import CircularProgress from '@mui/material/CircularProgress';

export default function loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <CircularProgress />
    </div>
  );
}
