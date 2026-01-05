import React, { useState, useCallback, useEffect } from 'react';
import Layout from '../../components/AdminLayouts/Layout';

const Demo = () => {
    const [myform, setMyform] = useState({
        name: '',
        age: '',
        status: ''
    })
    const [touched, setTouched] = useState({})
    const [error, setError] = useState({})
    const [isFormValid, setIsFormvalid] = useState(false)
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setMyform((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log(myform)
        }
    }
    const handleBlur = (e) => {
        const { name } = e.target
        setTouched((pre) => ({
            ...pre,
            [name]: true
        }))
    }
    const handleValidation = useCallback(() => {
        const validation = {}
        if (!myform.name.trim()) {
            validation.name = "Name is required"
        } else if (!/^[A-Z]/.test(myform.name.trim())) {
            validation.name = 'Name must start with a capital letter.';
        }
        if (!myform.age) {
            validation.age = "Age is required";
        } else if (myform.age < 1 || myform.age > 100) {
            validation.age = "Age must be between 1 and 100";
        }

        setError(validation)
        return Object.keys(validation).length === 0

    }, [myform])

    useEffect(() => {
        setIsFormvalid(handleValidation())
    }, [myform, touched, handleValidation])

    return (
        <>
            <Layout>
                <form >
                    <div className="row mx-0">
                        <div className="col-sm-2">
                            <label className='form-label'>Enter Name</label>
                            <input className='form-control' type='text' name='name' value={myform.name} onChange={handleInputChange} onBlur={handleBlur} />
                            {touched.name && error.name && <div>{error.name}</div>}
                        </div>
                        <div className="col-sm-2">
                            <label className='form-label'>Enter age</label>
                            <input className='form-control' type='number' name='age' value={myform.age} onChange={handleInputChange} onBlur={handleBlur} />
                            {touched.age && error.age && <div>{error.age}</div>}
                        </div>
                        <div className="col-sm-2">
                            <label className='form-label' htmlFor='sa'>Enter status</label>
                            <select className='form-select' name="status" id="sa" value={myform.status} onChange={handleInputChange} onBlur={handleBlur}>
                                <option value="">Please Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button type='button' disabled={!isFormValid} onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </Layout>
        </>
    );
}

export default Demo;
