import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';

const ButtonAI = ({ children, onGenerateNote }) => {
    const [loading, setLoading] = useState(false);

    const handleGenerateNote = async () => {
        setLoading(true);
        try {
            // Call the function passed via props to generate the note
            await onGenerateNote();
        } catch (error) {
            console.error('Error generating note:', error);
        }
        setLoading(false);
    };
    

    return (
        <button
        type="button" // Set type to "button" to prevent form submission

            onClick={handleGenerateNote}
            className="px-5 py-2 text-sm bg-green-500 text-white rounded transition duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1 w-[120px] flex items-center justify-center"
        >
            {loading ? <HashLoader color='#ffffff' size={20} /> : children}
        </button>
    );
};

export default ButtonAI;
