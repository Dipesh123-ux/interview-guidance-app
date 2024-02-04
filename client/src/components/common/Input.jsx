// InputField.js
import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({ label, value, onChange ,placeholder}) => {
    return (
        <div className="mb-4 flex flex-col items-center">
            <motion.label
                initial={{  y: 50 }}
                animate={{ y: 0 }}
                transition={{duration:0.5}}
                className="block text-gray-800 text-xl font-bold mb-2">{label}</motion.label>
            <motion.input
                type="text"
                value={value}
                onChange={onChange}
                className="w-3/4 mx-auto p-3 border rounded-md focus:outline focus:ring focus:border-blue-300 transition-all duration-200"
                initial={{ opacity: 0, x: -500 }}
                animate={{ opacity: 1, x: 0 }}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
