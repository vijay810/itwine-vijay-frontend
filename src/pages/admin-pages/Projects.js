import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/AdminLayouts/Layout';

const Projects = () => {

    const [projectsForm, setProjectsForm] = useState({
        startdate: '',
        enddate: '',
        project: '',
        status: '1'
    });

    const [hideStatus, setHideStatus] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectsForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true
        }));
    };

    const validateForm = useCallback(() => {
        const validationErrors = {};

        if (!projectsForm.startdate) {
            validationErrors.startdate = 'Start date is required.';
        }

        if (!projectsForm.enddate) {
            validationErrors.enddate = 'End date is required.';
        }

        if (!projectsForm.project) {
            validationErrors.project = 'Project name is required.';
        }

        if (hideStatus && !projectsForm.status) {
            validationErrors.status = 'Status is required.';
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    }, [projectsForm, hideStatus]);

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [projectsForm, touched, validateForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(projectsForm);
            setErrors({});
            setTouched({});
            setIsFormValid(false);
        }
    };

    const addBtn = () => {
        setHideStatus(false);
        setProjectsForm({
            startdate: '',
            enddate: '',
            project: '',
            status: '1'
        });
        setTouched({});
        setErrors({});
        setIsFormValid(false);
    };

    return (
        <Layout>
            <div className="container-fluid">
                <div className='card mt-2'>
                    <div className='text-center card-header'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 fw-bold'>Projects</p>
                            <button className='btn btn-primary' onClick={addBtn}>Add</button>
                        </div>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='row mx-0'>
                                <div className='col-sm-3'>
                                    <label htmlFor='start-date' className='form-label'>Select start date</label>
                                    <input
                                        type="date"
                                        id='start-date'
                                        className='form-control'
                                        name='startdate'
                                        value={projectsForm.startdate}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.startdate && errors.startdate && <div className="text-danger">{errors.startdate}</div>}
                                </div>
                                <div className='col-sm-3'>
                                    <label htmlFor='end-date' className='form-label'>Select end date</label>
                                    <input
                                        type="date"
                                        id='end-date'
                                        className='form-control'
                                        name='enddate'
                                        value={projectsForm.enddate}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.enddate && errors.enddate && <div className="text-danger">{errors.enddate}</div>}
                                </div>
                                <div className='col-sm-3'>
                                    <label htmlFor='project' className='form-label'>Projects</label>
                                    <input
                                        id='project'
                                        className='form-control'
                                        placeholder='Enter project name'
                                        name='project'
                                        value={projectsForm.project}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.project && errors.project && <div className="text-danger">{errors.project}</div>}
                                </div>
                                {hideStatus && (
                                    <div className='col-sm-3'>
                                        <label htmlFor='status' className='form-label'>Status</label>
                                        <select
                                            id='status'
                                            className='form-control'
                                            name='status'
                                            value={projectsForm.status}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="" disabled>Select Status</option>
                                            <option value="0">In-active</option>
                                            <option value="1">Active</option>
                                        </select>
                                        {touched.status && errors.status && <div className="text-danger">{errors.status}</div>}
                                    </div>
                                )}
                            </div>
                            <div className='text-end mt-3'>
                                <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Projects;
