
import React, { useState, useCallback, useEffect } from 'react';
import Layout from '../../components/AdminLayouts/Layout';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, } from '@fortawesome/free-solid-svg-icons';

const News = () => {
    const [newsForm, setNewsForm] = useState({
        date: '',
        news: '',
        status: "1"
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const [hideStatus, setHideStatus] = useState(false);
    const [newsData, setNewsData] = useState([])

    const [selectedNews, setSelectedNews] = useState(null);
    const [successMsg, setSuccessMsg] = useState(false)

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsForm({
            ...newsForm,
            [name]: value,
        });
        // Clear error for the field if it's corrected
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear the error for the specific field being changed
        }));
    };

    const addBtn = () => {
        setHideStatus(false)
        setSelectedNews(null);
        setNewsForm({
            news: "",
            date: "",
            status: "1"
        });
    }
    // Function to format date in dd-mm-yyyy format
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;  // Ensure it's in yyyy-mm-dd format
    };



    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', newsForm);

            // Format the date using the formatDate function
            const formattedDate = formatDate(newsForm.date);

            // Create a new object with the formatted date
            const formattedNewsForm = { ...newsForm, date: formattedDate };

            if (!selectedNews) {
                axios
                    .post(`${process.env.REACT_APP_API}/news/create-news`, formattedNewsForm)
                    .then((res) => {
                        console.log(res.data);

                        setNewsForm({
                            news: "",
                            date: "",
                            status: "1"
                        });

                        setTimeout(() => {
                            getData();

                        }, 1000);
                        setErrors({});
                        setTouched({});
                        setIsFormValid(false);
                        setNewsForm({
                            date: '',
                            news: '',
                            status: "1"
                        });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });



            } else {
                axios
                    .put(`${process.env.REACT_APP_API}/news/update-news/${selectedNews._id}`, newsForm)
                    .then((res) => {
                        console.log(res.data);
                        setSuccessMsg(res.data.msg)
                        setNewsForm({
                            date: '',
                            news: '',
                            status: ''
                        });
                        setSelectedNews(null);
                        setHideStatus(false)
                        // setErrors({});
                        setTimeout(() => {
                            getData();
                            setSuccessMsg("")
                        }, 1000)
                        setErrors({});
                        setTouched({});
                        setIsFormValid(false);
                        setNewsForm({
                            date: '',
                            news: '',
                            status: "1"
                        });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
        }
    };
    const deleteNews = (_id) => {
        axios
            .delete(`${process.env.REACT_APP_API}/news/delete-news/` + _id)
            .then((res) => {
                console.log("Data successfully deleted!");
                setSuccessMsg(res.data.msg);
                setTimeout(() => {
                    getData();
                    setSuccessMsg("")
                }, 1000)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Handle blur (focus out) event
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true, // Mark the field as touched
        }));
    };

    // Form validation logic
    const validateForm = useCallback(() => {
        const validationErrors = {};

        if (!newsForm.date) {
            validationErrors.date = 'Date is required.';
        }

        if (!newsForm.news) {
            validationErrors.news = 'News is required.';
        }

        if (touched.status && !newsForm.status) {
            validationErrors.status = 'Status is required.';
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0; // Form is valid if no errors
    }, [newsForm, touched]);

    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/news/`)
            .then((res) => {
                setNewsData(res.data.data);
                console.log('Response Data:', res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // Update form validity on every change
    useEffect(() => {
        getData()
        setIsFormValid(validateForm());
    }, [newsForm, validateForm]);

    const editClient = (_id) => {
        const selected = newsData.find((user) => user._id === _id);
        setHideStatus(true)
        // Convert the date to YYYY-MM-DD format (if necessary)
        const formattedDate = new Date(selected.date).toISOString().split('T')[0];

        setNewsForm({
            date: formattedDate,
            news: selected.news,
            status: selected.status,
        });
        setSelectedNews(selected);
    }

    return (
        <>
            <Layout>
                <div className='container-fluid'>
                    <div className='card mt-2'>
                        <div className='text-center card-header'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 fw-bold '>Latest News</p>
                                <button className='btn btn-primary' onClick={addBtn}>Add</button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='row mx-0'>
                                    <div className='col-sm-3'>
                                        <label className='form-label' htmlFor='date'>Select Date</label>
                                        <input
                                            type="date"
                                            id='date'
                                            className='form-control'
                                            placeholder='Select date'
                                            name='date'
                                            value={newsForm.date}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        {touched.date && errors.date && <div className="text-danger">{errors.date}</div>}
                                    </div>
                                    <div className='col-sm-3'>
                                        <label className='form-label' htmlFor='news'>News</label>
                                        <textarea
                                            id='news'
                                            className='form-control'
                                            placeholder='Enter news'
                                            name='news'
                                            value={newsForm.news}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        {touched.news && errors.news && <div className="text-danger">{errors.news}</div>}
                                    </div>
                                    {hideStatus && <div className='col-sm-3'>
                                        <label className='form-label' htmlFor='status'>Status</label>
                                        <select
                                            id='status'
                                            className='form-control'
                                            name="status"
                                            value={newsForm.status}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="" disabled>Select Status</option>
                                            <option value="0">In-active</option>
                                            <option value="1">Active</option>
                                        </select>
                                        {touched.status && errors.status && <div className="text-danger">{errors.status}</div>}

                                    </div>}
                                </div>
                                <div className='text-end'>
                                    {/* <button
                                        className='btn btn-primary'
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid}>Submit
                                    </button> */}
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}
                                        disabled={!isFormValid}>
                                        {selectedNews ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {successMsg && (<p className='text-center text-success'>{successMsg}
                            </p>)}
                        </div>
                        <div className='border border-1 rounded m-2'>
                            <p className='mb-0 p-2 fw-bold'>News List</p>
                            <table className='table table-bordered table-striped table-hover mb-0'>
                                <thead>
                                    <tr>
                                        <th>Sl.No</th>
                                        <th>Date</th>
                                        <th>News</th>
                                        <th>Status</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsData.map((ns, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {/* <td>{ns.date}</td> */}
                                            <td>
                                                {/* Format the date as dd-mm-yyyy */}
                                                {new Date(ns.date).toLocaleDateString('en-GB')}</td>
                                            <td>{ns.news}</td>
                                            <td>
                                                {ns.status === 0 && <span className='badge rounded-pill text-bg-warning'>Inactive</span>}
                                                {ns.status === 1 && <span className='badge rounded-pill text-bg-success'>Active</span>}
                                            </td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center">
                                                    <p className="me-2 my-0 text-primary pointer" onClick={() => editClient(ns._id)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </p>
                                                    <p className="my-0 text-danger pointer"
                                                        onClick={() => deleteNews(ns._id)}>
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default News;

