import React, { useState, useCallback, useEffect } from 'react';

const Holidays = () => {
    const [holiForm, setHoliForm] = useState({
        name: '',
        date: '',
        status: ''
    });

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHoliForm((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true
        }));
    };

    const validateForm = useCallback(() => {
        const validationErrors = {};
        if (!holiForm.name.trim()) {
            validationErrors.name = 'Name is required.';
        }
        if (!holiForm.date) {
            validationErrors.date = 'Date is required.';
        }
        if (!holiForm.status) {
            validationErrors.status = 'Status is required.';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [holiForm]);

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [holiForm, touched, validateForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Submitted:', holiForm);
        }
    };

    return (
        <>
            <h1>Hi This is Holiday's</h1>
            <form onSubmit={handleSubmit}>
                <div className='row mx-0'>
                    <div className='col-sm-3'>
                        <label className='form-label'>Enter Name</label>
                        <input
                            className='form-control'
                            type="text"
                            name='name'
                            value={holiForm.name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className='col-sm-3'>
                        <label className='form-label'>Enter Date</label>
                        <input
                            className='form-control'
                            type="date"
                            name='date'
                            value={holiForm.date}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                        {touched.date && errors.date && <div className='text-danger'>{errors.date}</div>}
                    </div>

                    <div className='col-sm-3'>
                        <label className='form-label'>Status</label>
                        <select
                            className='form-control'
                            name='status'
                            value={holiForm.status}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        >
                            <option value="" disabled>select a status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        {touched.status && errors.status && <div className='text-danger'>{errors.status}</div>}
                    </div>
                </div>

                <div className='py-2'>
                    <button className='btn btn-primary' type='submit' disabled={!isFormValid}>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default Holidays;
