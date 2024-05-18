import React, { useState } from 'react';
import Booking from './Booking';

const ParentComponent = () => {
    const [code, setCode] = useState('');

    return (
        <div className="parent-container">
            <h1>Welcome to Your Movie Theatre</h1>
            <Booking setCode={setCode} />
            {/* You can render other components or content here */}
        </div>
    );
};

export default ParentComponent;
