import React from 'react';

export default function Header() {
  return (
    <div className=''>
      <h1 className='font-semibold text-center mb-2'>To do App</h1>
      <div className='mx-auto flex items-center justify-around p-1 border'>
        <div>Summary</div>
        <div>Status</div>
      </div>
    </div>
  );
}
