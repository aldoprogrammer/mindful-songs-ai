import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';

const ButtonComp = ({ children, onClick }) => {
    
    const [loading, setLoading] = useState(false);



    return (
        <button
            onClick={onClick}
            className="px-5 py-2 bg-green-500 text-white rounded transition duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1 w-[190px] flex items-center justify-center"
        >
            {loading ? <HashLoader color='#ffffff' size={20} /> : children}
        </button>
    );
};

export default ButtonComp;
