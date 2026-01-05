import React, { useState } from 'react';
import Layout from '../../components/AdminLayouts/Layout';

const Practice = () => {
    const [myform, setMyform] = useState({
        name: '',
        desc: '',
        status: '',
        practice: [],
    })

    const practiceOptions = ["Cricket", "Football", "Basketball", "Hockey"];

    const handleInputChange = (e) =>{
        const {name, value}= e.target
        setMyform((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const handlePracticeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setMyform((prev) => ({
                ...prev,
                practice: [...prev.practice, value]
            }));
        } else {
            setMyform((prev) => ({
                ...prev,
                practice: prev.practice.filter((item) => item !== value)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(myform)
        setMyform({
            name: '',
            desc: '',
            status: '',
            practice: [],
        })
    } 
    return (
        <>
            <Layout>
            <div>
                <p>All practice works here!</p>
            </div>
            <form>
                <div className='row mx-0'>
                    <div className='col-sm-2'>
                        <label htmlFor="" className='form-label'>Enter name</label>
                        <input type="text" className='form-control' name='name' value={myform.name} onChange={handleInputChange} />
                    </div>
                    <div className='col-sm-2'>
                        <label htmlFor="" className='form-label'>Description</label>
                        <input type="text" className='form-control' name='desc' value={myform.desc} onChange={handleInputChange} />
                    </div>
                    <div className='col-sm-2'>
                        <label htmlFor="" className='form-label'>Description</label>
                        <select name="status" className='form-control' value={myform.status} onChange={handleInputChange} id="">
                            <option value="" disabled>Select Status</option>
                            <option value="0">InActive</option>
                            <option value="1">Active</option>
                        </select>
                    </div>
                    <div className='col-sm-2'>
                        <label htmlFor="" className='form-label'>Select Practice</label>
                        {practiceOptions.map((item) => (
                            <div key={item}>
                                <input
                                    type="checkbox"
                                    value={item}
                                    checked={myform.practice.includes(item)}
                                    onChange={handlePracticeChange}
                                />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
            <div className='text-end'>
                <button type='button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
            </div>
            </Layout>
        </>

    );
}

export default Practice;
