import React, { useState, useEffect } from 'react';
import Layout from '../../components/AdminLayouts/Layout';
import axios from '../../../src/api/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const EmpLeave = () => {
    const [leavesData, setLeavesData] = useState([]);
    const [editStatus, setEditStatus] = useState(null);
    const [newStatus, setNewStatus] = useState(null);

    // 🔹 GET ALL LEAVES (ADMIN)
    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/leave/`)
            .then((res) => {
                setLeavesData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 🔹 UPDATE LEAVE STATUS
    const updateStatus = (leaveId, newStatus) => {
        axios
            .put(`${process.env.REACT_APP_API}/leave/update-status/${leaveId}`, {
                status: newStatus
            })
            .then(() => {
                setLeavesData((prevData) =>
                    prevData.map((leave) =>
                        leave._id === leaveId
                            ? { ...leave, status: newStatus }
                            : leave
                    )
                );
            })
            .catch((error) => {
                console.error('Error updating status:', error);
            });
    };

    const handleEditStatus = (leaveId, currentStatus) => {
        setEditStatus(leaveId);
        setNewStatus(currentStatus);
    };

    const handleSaveStatus = (leaveId) => {
        if (newStatus !== null) {
            updateStatus(leaveId, newStatus);
        }
        setEditStatus(null);
    };

    const handleCancelEdit = () => {
        setEditStatus(null);
        setNewStatus(null);
    };

    // 🔹 DATE FORMAT
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout>
            <div>
                <p className="text-center mb-0 fs-3 fw-bold">
                    Employee Leaves
                </p>
            </div>

            <div className="p-2">
                {leavesData.length > 0 ? (
                     <div className="table-responsive">
                            <table className="table table-striped my-0 table-bordered table-hover">
                                <thead className="table-dark">
                            <tr>
                                <th>Sl.no</th>
                                <th>Employee Name</th>
                                <th>Email</th>
                                <th>Reason for Leave</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="table-group-divider">
                            {leavesData.map((le, index) => (
                                <tr key={le._id}>
                                    <td>{index + 1}</td>

                                    {/* ✅ EMPLOYEE NAME */}
                                    <td>{le.user?.name || 'N/A'}</td>

                                    {/* ✅ EMPLOYEE EMAIL */}
                                    <td>{le.user?.email || 'N/A'}</td>

                                    <td>{le.reason}</td>
                                    <td>{formatDate(le.formdate)}</td>
                                    <td>{formatDate(le.todate)}</td>

                                    <td className="text-center">
                                        {editStatus === le._id ? (
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(Number(e.target.value))}
                                            >
                                                <option value={0}>Pending</option>
                                                <option value={1}>Approved</option>
                                                <option value={2}>Rejected</option>
                                            </select>
                                        ) : (
                                            <>
                                                {le.status === 0 && (
                                                    <span className="badge rounded-pill text-bg-warning">
                                                        Pending
                                                    </span>
                                                )}
                                                {le.status === 1 && (
                                                        <span className="badge rounded-pill text-bg-success">
                                                             Approved
                                                    </span>
                                                )}
                                                {le.status === 2 && (
                                                        <span className="badge rounded-pill text-bg-danger">
                                                            Rejected
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </td>

                                    <td className="text-center">
                                        {editStatus === le._id ? (
                                            <>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleSaveStatus(le._id)}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-sm ms-2"
                                                    onClick={handleCancelEdit}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() =>
                                                    handleEditStatus(le._id, le.status)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    </div>
                ) : (
                    <p className="text-center">No data Found</p>
                )}
            </div>
        </Layout>
    );
};

export default EmpLeave;
