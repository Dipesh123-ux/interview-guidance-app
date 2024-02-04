import React from 'react'
import InputField from '../common/Input'

const Industry = ({ values, setValues }) => {
    const handleChange = (e) => {
        setValues({ ...values, industry: e.target.value })
    }

    return (
        <div className="container mx-auto mt-8">
            <InputField label="Industry" placeholder={'Please enter the Industry..'} onChange={handleChange} value={values.industry} />
        </div>
    )
}

export default Industry