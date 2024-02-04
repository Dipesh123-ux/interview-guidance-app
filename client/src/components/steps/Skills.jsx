import React from 'react'
import InputField from '../common/Input'

const Skills = ({ values, setValues }) => {
    const handleChange = (e) => {
        setValues({ ...values, skills: e.target.value })
    }

    return (
        <div className="container mx-auto mt-8">
            <InputField label="Skills" placeholder={"Please enter all your skills.."} onChange={handleChange} value={values.skills} />
        </div>
    )
}

export default Skills