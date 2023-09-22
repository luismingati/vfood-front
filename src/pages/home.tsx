import React from 'react';

interface HomeProps {
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className='flex flex-1 h-full w-full bg-white rounded-[20px] py-9 px-12'>
      <h1>Welcome to Home page!</h1>
    </div>
  );
};

export default Home;