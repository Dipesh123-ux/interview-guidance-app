import React from 'react'
import InputField from '../common/Input'

const JobRole = ({ values, setValues }) => {


    const handleChange = (e) => {
        setValues({ ...values, role: e.target.value })
    }


    return (
        <div className="container mx-auto mt-8">
            <InputField label="Job Role" placeholder={"Please enter the job role.."} onChange={handleChange} value={values.role} />
        </div>
    )
}

export default JobRole