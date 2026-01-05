import React, { useState, useCallback, useEffect } from "react";
import Layout from "../../components/AdminLayouts/Layout";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, } from '@fortawesome/free-solid-svg-icons';
const Events = () => {
    const [myform, setMyform] = useState({
        eventname: "",
        startdate: "",
        enddate: "",
        status: "1",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);

    const [successMsg, setSuccessMsg] = useState(false)
    const [eventsData, setEventsData] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [statusflag, setStatusflag] = useState(false);
    const [submitflag, setSubmitflag] = useState(true); // true = Submit (create), false = Update

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMyform((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
        validateForm();
    };

    const validateForm = useCallback(() => {
        const validationErrors = {};

        if (!myform.eventname) {
            validationErrors.eventname = "Event name is required.";
        }
        if (!myform.startdate) {
            validationErrors.startdate = "Start date is required.";
        }
        if (!myform.enddate) {
            validationErrors.enddate = "End date is required.";
        }
        if (!myform.status) {
            validationErrors.status = "Status is required.";
        }

        setErrors(validationErrors);
        const valid = Object.keys(validationErrors).length === 0;
        setIsFormValid(valid);
        return valid;
    }, [myform]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // start loader
        try {
            if (submitflag) {
                // Create
                const res = await axios.post(
                    `${process.env.REACT_APP_API}/events/create-events`,
                    myform
                );
                setSuccessMsg(res.data.message);
            } else {
                // Update
                const res = await axios.put(
                    `${process.env.REACT_APP_API}/events/update-event/${myform._id}`,
                    myform
                );
                setSuccessMsg(res.data.msg);
            }

            // Reset form
            setMyform({
                eventname: "",
                startdate: "",
                enddate: "",
                status: "1",
            });
            setIsFormValid(false);
            setSubmitflag(true);
            setStatusflag(false);
            setTouched({});
            getData();

            setTimeout(() => {
                setSuccessMsg(false);
            }, 1000);
        } catch (err) {
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false); // stop loader
        }
    };


    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/events/`)
            .then((res) => {
                setEventsData(res.data.data || []);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addBtn = () => {
        setStatusflag(false);
        setSubmitflag(true);
        setMyform({
            eventname: "",
            startdate: "",
            enddate: "",
            status: "1",
        });
        setErrors({});
        setTouched({});
    };

    // Load data once on mount
    useEffect(() => {
        validateForm();
        getData();
    }, [validateForm]);

    // Format date (YYYY-MM-DD)
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toISOString().split("T")[0];
    };
    const tableDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString("en-GB").replace(/\//g, "-") : "";



    const editEvent = (_id) => {
        const selected = eventsData.find((user) => user._id === _id);
        if (!selected) return;

        setStatusflag(true);
        setSubmitflag(false);
        setMyform({
            _id: selected._id,
            eventname: selected.eventname,
            startdate: formatDate(selected.startdate),
            enddate: formatDate(selected.enddate),
            status: String(selected.status),
        });
    }
    const deleteEvent = () => {

    }

    return (
        <Layout>
            <div className="card m-2">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 fw-bold">Events</p>
                        <button type="button" className="btn btn-primary" onClick={addBtn}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="form-label">Enter Event</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="eventname"
                                    value={myform.eventname}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                {touched.eventname && errors.eventname && (
                                    <div className="text-danger">{errors.eventname}</div>
                                )}
                            </div>
                            <div className="col-sm-2">
                                <label className="form-label">Start Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="startdate"
                                    value={myform.startdate}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                {touched.startdate && errors.startdate && (
                                    <div className="text-danger">{errors.startdate}</div>
                                )}
                            </div>
                            <div className="col-sm-2">
                                <label className="form-label">End Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="enddate"
                                    value={myform.enddate}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                {touched.enddate && errors.enddate && (
                                    <div className="text-danger">{errors.enddate}</div>
                                )}
                            </div>
                            {statusflag && (
                                <div className="col-sm-2">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={myform.status}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                    {touched.status && errors.status && (
                                        <div className="text-danger">{errors.status}</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="text-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!isFormValid || loading}
                            >
                                {submitflag ? "Submit" : "Update"}
                                {loading && (
                                    <span
                                        className="spinner-border spinner-border-sm ms-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                )}
                            </button>
                        </div>



                    </form>
                    <div>
                        {successMsg && (<p className='text-center text-success'>{successMsg}
                        </p>)}
                    </div>
                </div>


                {/* Events Table */}
                <div className="mt-4">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {eventsData.length > 0 ? (
                                eventsData.map((le, index) => (
                                    <tr key={le._id}>
                                        <td>{index + 1}</td>
                                        <td>{le.eventname}</td>
                                        <td>{tableDate(le.startdate)}</td>
                                        <td>{tableDate(le.enddate)}</td>
                                        <td className="text-center">
                                            {String(le.status) === "0" && (
                                                <span className="badge rounded-pill text-bg-warning">
                                                    InActive
                                                </span>
                                            )}
                                            {String(le.status) === "1" && (
                                                <span className="badge rounded-pill text-bg-primary">
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center">
                                                <p className="me-2 my-0 text-primary pointer" onClick={() => editEvent(le._id)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </p>
                                                <p className="my-0 text-danger pointer"
                                                    onClick={() => deleteEvent(le._id)}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        No Events Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Events;
