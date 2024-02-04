// Dropdown.js
import React from 'react';
import Select from 'react-select';

const Dropdown = ({ options, value, onChange }) => {
  return (
    <div>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={false}
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            border: '2px solid #ccc',
            minHeight: '40px',
            fontSize: '16px',
            fontWeight: '600',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#333',
          }),
        }}
      />
    </div>
  );
};

export default Dropdown;
