import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/UserLayouts/Layout';
import axios from '../../api/axios';

const Leave = () => {
    const [leaveForm, setLeaveForm] = useState({
        reason: '',
        formdate: '',
        todate: '',
        status: '0'
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [leavesData, setLeavesData] = useState([]);

    /* -------------------- Handlers -------------------- */

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setLeaveForm(prev => ({
            ...prev,
            [name]: value
        }));

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setLeaveForm(prev => ({
            ...prev,
            reason: checked ? name : ''
        }));

        setTouched(prev => ({
            ...prev,
            reason: true
        }));
    };

    /* -------------------- Validation -------------------- */

    const validateForm = useCallback(() => {
        const validationErrors = {};

        if (!leaveForm.reason) {
            validationErrors.reason = 'Please select a reason for leave.';
        }

        if (!leaveForm.formdate) {
            validationErrors.formdate = 'From date is required.';
        }

        if (!leaveForm.todate) {
            validationErrors.todate = 'To date is required.';
        }

        if (leaveForm.formdate && leaveForm.todate) {
            if (new Date(leaveForm.formdate) > new Date(leaveForm.todate)) {
                validationErrors.date =
                    'From date must be before To date.';
            }
        }

        setErrors(validationErrors);
        setIsFormValid(Object.keys(validationErrors).length === 0);
    }, [leaveForm]);

    useEffect(() => {
        validateForm();
    }, [leaveForm, validateForm]);

    /* -------------------- Submit -------------------- */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            const userId = localStorage.getItem('user_id');

            const res = await axios.post(
                `${process.env.REACT_APP_API}/leave`,
                { ...leaveForm, userId }
            );

            setLeaveForm({
                reason: '',
                formdate: '',
                todate: '',
                status: '0'
            });

            setTouched({});
            setResponseMessage(res.data.message);

            getData();

            setTimeout(() => setResponseMessage(''), 3000);
        } catch (err) {
            console.error(err);
        }
    };

    /* -------------------- API -------------------- */

    const getData = async () => {
        try {
            const userId = localStorage.getItem('user_id');
            const res = await axios.get(
                `${process.env.REACT_APP_API}/leave/user/${userId}`
            );
            setLeavesData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
        
    const interval = setInterval(() => {
        getData();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
    }, []);

    /* -------------------- Utils -------------------- */

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-GB');

    /* -------------------- JSX -------------------- */

    return (
        <Layout>
            <div className="container-fluid">

                <div className='py-2 text-center'>
                    <p className="h4">Leave Application Form</p>
                    <img src="../../images/newLayer/layer.png" alt="layer" height="50" width="100%" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row mx-0">
                        <div className="col-sm-4">
                            <label className="form-label">
                                Reason for Leave <span className="text-danger">*</span>
                            </label>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="Emergency Leave"
                                    checked={leaveForm.reason === 'Emergency Leave'}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">
                                    Emergency Leave
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="Casual Leave"
                                    checked={leaveForm.reason === 'Casual Leave'}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">
                                    Casual Leave
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="Others"
                                    checked={leaveForm.reason === 'Others'}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">
                                    Others
                                </label>
                            </div>

                            {touched.reason && errors.reason && (
                                <small className="text-danger">{errors.reason}</small>
                            )}
                        </div>
                    

                        <div className="col-sm-4">
                            <label className="form-label">
                                From <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="formdate"
                                value={leaveForm.formdate}
                                onChange={handleInputChange}
                            />
                            {touched.formdate && errors.formdate && (
                                <small className="text-danger">{errors.formdate}</small>
                            )}
                        </div>

                        <div className="col-sm-4">
                            <label className="form-label">
                                To <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="todate"
                                value={leaveForm.todate}
                                onChange={handleInputChange}
                            />
                            {touched.todate && errors.todate && (
                                <small className="text-danger">{errors.todate}</small>
                            )}
                            {errors.date && (
                                <small className="text-danger">{errors.date}</small>
                            )}
                        </div>
                    </div>

                    <div className="text-end mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!isFormValid}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {responseMessage && (
                    <p className="text-success mt-2">{responseMessage}</p>
                )}

                <hr />

                {leavesData.length > 0 ? (
                    <div className="table-responsive">
                            <table className="table table-striped my-0 table-bordered table-hover">
                                <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Reason</th>
                                <th>From</th>
                                <th>To</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leavesData.map((le, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{le.reason}</td>
                                    <td>{formatDate(le.formdate)}</td>
                                    <td>{formatDate(le.todate)}</td>
                                    <td className="text-center text-dark">
                                        {le.status === 0 && <span className="badge bg-warning">Pending</span>}
                                        {le.status === 1 && <span className="badge bg-success">Approved</span>}
                                        {le.status === 2 && <span className="badge bg-danger">Rejected</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                ) : (
                    <p className="text-center text-muted">
                        No leave records found
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default Leave;
