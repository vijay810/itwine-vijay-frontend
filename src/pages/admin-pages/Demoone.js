import React, { useState, useCallback, useEffect } from 'react';
import Layout from '../../components/AdminLayouts/Layout';

const Demoone = () => {
    const [form, setMyForm] = useState({
        name: '',
        age:'',
        desc:'',
        active:'1'
    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInput = (e) =>{
        const {name, value} = e.target
        setMyForm((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prevState => ({
            ...prevState,
            [name]: true
        }))

    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        if (validateForm()) {
            console.log('Submitted:', form);
        }
        setMyForm({
            name:'',
            age:'',
            desc: '',
            status:'1'
        })
    }
    const validateForm = useCallback(() => {
        const validationErrors = {};
        // if (!form.name.trim()) {
        //     validationErrors.name = 'Name is required.';
        // }
        // if (!form.age) {
        //     validationErrors.age = 'Age is required.';
        // }
        // if (!form.desc.trim()) {
        //     validationErrors.desc = 'Description is required.';
        // }
        // Name validation
        if (!form.name.trim()) {
            validationErrors.name = 'Name is required.';
        } else if (!/^[A-Z]/.test(form.name.trim())) {
            validationErrors.name = 'Name must start with a capital letter.';
        }

        // Age validation
        if (!form.age) {
            validationErrors.age = 'Age is required.';
        } else if (Number(form.age) === 0) {
            validationErrors.age = 'Age cannot be 0.';
        } else if (Number(form.age) > 100) {
            validationErrors.age = 'Age cannot be greater than 100.';
        } else if (!/^\d+$/.test(form.age)) {
            validationErrors.age = 'Age must be a number.';
        }

        // Description validation
        if (!form.desc.trim()) {
            validationErrors.desc = 'Description is required.';
        } else if (form.desc.trim().length < 5) {
            validationErrors.desc = 'Description must be at least 5 characters.';
        }
        if (!form.status) {
            validationErrors.status = 'Status is required.';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [form]);
    useEffect(()=>{
        setIsFormValid(validateForm());
    }, [form, touched, validateForm])
    return (
        <>
            <Layout>
                <h1>Hello Demoone</h1>
                <form>
                    <div className='row mx-0'>
                        <div className='col-sm-3'>
                            <label htmlFor="na" className='form-label'>Enter Name</label>
                            <input type="text" id='na' className='form-control' value={form.name} name='name' onChange={handleInput} onBlur={handleBlur}/>
                            {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className='col-sm-2'>
                            <label htmlFor="age" className='form-label'>Enter Age</label>
                            <input type="text" id='age' className='form-control' value={form.age} name='age' onChange={handleInput} onBlur={handleBlur} />
                            {touched.age && errors.age && <div className="text-danger">{errors.age}</div>}
                        </div>
                        <div className='col-sm-3'>
                            <label htmlFor="desc" className='form-label'>Enter Description</label>
                            <input type="text" id='desc' className='form-control' value={form.desc} name='desc' onChange={handleInput} onBlur={handleBlur} />
                            {touched.desc && errors.desc && <div className="text-danger">{errors.desc}</div>}
                        </div>
                        <div className='col-sm-2'>
                            <label htmlFor="sta" className='form-label'>Status</label>
                            <select id="sta" className='form-control' value={form.status} name='status' onChange={handleInput} onBlur={handleBlur}>
                                <option value="">Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                            {touched.status && errors.status && <div className="text-danger">{errors.status}</div>}
                        </div>

                    </div>
                    <div>
                        <button className='btn btn-primary' disabled={!isFormValid} onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </Layout>
        </>
    );
}

export default Demoone;
