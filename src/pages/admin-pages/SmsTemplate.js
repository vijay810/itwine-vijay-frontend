import React, { useEffect, useState } from 'react';
import Layout from '../../components/AdminLayouts/Layout';
import axios from 'axios';

function SmsTemplate() {
    const [smsForm, setSmsForm] = useState({
        id: null,
        email:'',
        date: '',
        desc: '',
        status: '1'
    });

    const [statusflag, setStatusFlag] = useState(false);
    const [alldata, setAlldata] = useState([]);
    const [editFlag, setEditFlag] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errors, setErrors] = useState({});


    /* -------------------- Helpers -------------------- */

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSmsForm((prev) => ({ ...prev, [name]: value }));
    };

    const formatDateForDB = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    const formatDateForTable = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        const day = String(d.getDate()).padStart(2, '0');
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const y = d.getFullYear();
        return `${day}-${m}-${y}`;
    };

    /* -------------------- API -------------------- */

    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/sms/`)
            .then((res) => setAlldata(res.data.data))
            .catch((err) => console.error(err));
    };

    /* -------------------- Submit -------------------- */

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; 
        const payload = {
            ...smsForm,
            date: formatDateForDB(smsForm.date)
        };

        if (editFlag) {
            // UPDATE
            axios
                .put(
                    `${process.env.REACT_APP_API}/sms/update-sms/${smsForm.id}`,
                    payload
                )
                .then((res) => {
                    setSuccessMsg(res.data.msg || 'Sms updated successfully!');
                    resetForm();
                    getData();
                })
                .catch((err) => console.error(err));
        } else {
            // CREATE
            axios
                .post(`${process.env.REACT_APP_API}/sms/create-sms`, payload)
                .then(() => {
                    setSuccessMsg('Sms added successfully!');
                    resetForm();
                    getData();
                })
                .catch((err) => console.error(err));
        }
    };

    /* -------------------- Edit -------------------- */

    const editBtn = (row) => {
        setEditFlag(true);
        setStatusFlag(true);

        setSmsForm({
            id: row._id,
            email: row.email,
            date: formatDateForDB(row.date),
            desc: row.desc,
            status: String(row.status)
        });
    };

    /* -------------------- Reset -------------------- */

    const resetForm = () => {
        setSmsForm({
            id: null,
            email:'',
            date: '',
            desc: '',
            status: '1'
        });
        setEditFlag(false);
        setStatusFlag(false);

        setTimeout(() => setSuccessMsg(''), 1500);
    };

    const addBtn = () => resetForm();
    const validateForm = () => {
        let err = {};

        if (!smsForm.date) {
            err.date = 'Date is required';
        }

        if (!smsForm.desc.trim()) {
            err.desc = 'Description is required';
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };
    const deleteSms = (_id) =>{
        axios
            .delete(`${process.env.REACT_APP_API}/sms/delete-sms/` + _id)
            .then((res) => {
                setSuccessMsg(res.data.msg);
                setTimeout(() => {
                    getData();
                    setSuccessMsg("");
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    /* -------------------- Effects -------------------- */

    useEffect(() => {
        getData();
    }, []);

    /* -------------------- JSX -------------------- */

    return (
        <Layout>
            <div className="card m-2">
                <div className="card-header d-flex justify-content-between">
                    <p className="mb-0">Sms Template</p>
                    <button className="btn btn-primary" onClick={addBtn}>
                        Add
                    </button>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="form-label">Date *</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={smsForm.date}
                                    onChange={handleInputChange}
                                />
                                {errors.date && <small className="text-danger">{errors.date}</small>}
                            </div>

                            
                            <div className="col-sm-3">
                                <label className="form-label">Email*</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={smsForm.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="col-sm-3">
                                <label className="form-label">Description *</label>
                                <textarea
                                    className="form-control"
                                    name="desc"
                                    value={smsForm.desc}
                                    onChange={handleInputChange}
                                />
                                {errors.desc && <small className="text-danger">{errors.desc}</small>}
                            </div>

                            {statusflag && (
                                <div className="col-sm-2">
                                    <label className="form-label">Status *</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={smsForm.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                            )}
                        </div>

                        <div className="text-end mt-3">
                            <button className="btn btn-primary" type="submit">
                                {editFlag ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </form>

                    {successMsg && (
                        <p className="text-center text-success mt-2">
                            {successMsg}
                        </p>
                    )}
                </div>

                {/* TABLE */}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alldata.length > 0 ? (
                            alldata.map((row, index) => (
                                <tr key={row._id}>
                                    <td>{index + 1}</td>
                                    <td>{formatDateForTable(row.date)}</td>
                                    <td>{row.email}</td>
                                    <td>{row.desc}</td>
                                    <td>
                                        {row.status === 1 ? (
                                            <span className="badge bg-success">Active</span>
                                        ) : (
                                            <span className="badge bg-danger">Inactive</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => editBtn(row)}
                                        >
                                            Edit
                                        </button>
                                        <button type="button" className="my-0 btn btn-danger pointer btn-sm" onClick={() => deleteSms(row._id)}>
                                           delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default SmsTemplate;
