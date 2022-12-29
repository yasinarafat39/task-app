import React from 'react';

import taskFile from '../../assets/taskFile.jpg';

const Home = () => {
    return (
        <div>
            <div className='flex justify-center items-center'>
                <img src={taskFile} width="600" height="500" alt="" />
            </div>
            <h2 className='text-xl font-semibold text-center'>Add Your Task from Add task section</h2>
        </div>
    );
};

export default Home;