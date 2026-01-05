import React, { useState, useEffect } from 'react';
import Layout from '../../components/AdminLayouts/Layout';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus, faPenToSquare, faTrashCan, } from '@fortawesome/free-solid-svg-icons';
import Pagination from "react-js-pagination";
function Clients() {
    const [clientForm, setClientForm] = useState({
        name: "",
        phone: "",
        email: "",
        project: "",
        status: "1"
    });
    const [clientsData, setClientsData] = useState([]);
    const [hideStatus, setHideStatus] = useState(false);

    const [addForm, setAddForm] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [searchForm, setSearchForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [successMsg, setSuccessMsg] = useState(false)
    const [searchResult, setSearchResult] = useState([]);


    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);



    const searchBtn = () => {
        setHideStatus(true)
        setAddForm(false)
        setSearchForm(true)
        setSearchName("");
        getData();
    }
    const addBtn = () => {
        setHideStatus(false)
        setAddForm(true)
        setSearchForm(false)
        setSelectedUser(null);
        setSearchName("");
        getData();
    }

    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_API}/clients/`)
            .then((res) => {
                setClientsData(res.data.data);
                setSearchResult(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(clientForm)
        if (!selectedUser) {
            axios
                .post(`${process.env.REACT_APP_API}/clients/create-client`, clientForm)
                .then((res) => {
                    console.log(res.data);

                    setClientForm({
                        name: "",
                        phone: "",
                        email: "",
                        project: "",
                        status: "1"
                    });

                    setTimeout(() => {
                        getData();
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            axios
                .put(`${process.env.REACT_APP_API}/clients/update-clients/${selectedUser._id}`, clientForm)
                .then((res) => {
                    console.log(res.data);
                    setSuccessMsg(res.data.msg)
                    setClientForm({
                        name: "",
                        email: "",
                        phone: "",
                        project: "",
                        status: ''
                    });
                    setSelectedUser(null);
                    setHideStatus(false)
                    // setErrors({});
                    setTimeout(() => {
                        getData();
                        setSuccessMsg("")
                    }, 1000)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setClientForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleStatusChange = (e) => {
        setClientForm((prevForm) => ({
            ...prevForm,
            status: e.target.value
        }));
    };

    const editClient = (_id) => {
        const selected = clientsData.find((user) => user._id === _id);
        setHideStatus(true)
        setAddForm(true)
        setSearchForm(false)
        setClientForm({
            name: selected.name,
            email: selected.email,
            phone: selected.phone,
            project: selected.project,
            status: selected.status,
        });
        setSelectedUser(selected);
    }
    const deleteClient = (_id) => {
        axios
            .delete(`${process.env.REACT_APP_API}/clients/delete-clients/` + _id)
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
    const handleSearch = () => {
        if (searchName === "") {
            setSearchResult([]);
            setTimeout(() => {
                console.log(setSearchResult(clientsData));
            }, 1000);
        } else {
            const filteredItems = clientsData.filter((user) => {
                return (
                    user.name.toLowerCase().includes(searchName.toLowerCase())
                    // user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
                    // String(user.status).toLowerCase().includes(searchStatus.toLowerCase())
                );
            });
            setSearchResult(filteredItems);
        }
        setCurrentPage(1);
    }
    return (
        <Layout>
            <div className="p-2">
                <div className='card'>
                    <div className='d-flex card-header justify-content-between py-1 px-1'>
                        <div className='d-flex align-items-center'>
                            <h5 className='fw-bold mb-0 px-1 text-danger'>Client Master</h5>
                        </div>
                        <div className="d-flex text-end">
                            <div className='px-1'>
                                <button className='btn btn-warning' onClick={searchBtn}><FontAwesomeIcon icon={faMagnifyingGlass} />Search</button>
                            </div>
                            <div className='px-1'>
                                <button className='btn btn-primary' onClick={addBtn}><FontAwesomeIcon icon={faPlus} />Add</button>
                            </div>
                        </div>
                    </div>
                    <div className='p-2'>
                        {searchForm && (<div id='searchForm'>

                            <div>
                                <p className='h6 pb-2 headigs'>Search Clients Master Group:</p>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name"
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="text-end py-2">
                                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                            </div>
                        </div>)}
                        {addForm && (<div id='addForm'>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <p className='h6 pb-2 headigs'>Add New Clients Master Group:</p>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-sm-3">
                                        <label className="form-label my-0">Name</label><span className="text-danger">*</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={clientForm.name || ''}
                                            onChange={inputsHandler}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="form-label my-0">Phone number</label><span className="text-danger">*</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={clientForm.phone || ''}
                                            onChange={inputsHandler}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="form-label my-0">Projects</label><span className="text-danger">*</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="project"
                                            value={clientForm.project || ''}
                                            onChange={inputsHandler}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="form-label my-0">Email-id</label><span className="text-danger">*</span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={clientForm.email || ''}
                                            onChange={inputsHandler}
                                        />
                                    </div>
                                    {hideStatus && (<div className="col-sm-4">
                                        <label className='form-label my-0'>Status</label><span className='text-danger'>*</span>
                                        <select
                                            className="form-control"
                                            value={clientForm.status}
                                            onChange={handleStatusChange}
                                        >
                                            <option value="" disabled>Select status</option>
                                            <option value="0" className="text-danger">Upcoming</option>
                                            <option value="1" className="text-warning">Inprogress</option>
                                            <option value="2" className="text-success">completed</option>
                                        </select>
                                    </div>)}
                                </div>
                                <div className="text-end p-2">
                                    <button type="submit" className="btn btn-primary">
                                        {selectedUser ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </form>
                            <div>
                                {successMsg && (<p className='text-center text-success'>{successMsg}
                                </p>)}
                            </div>
                        </div>)}
                    </div>

                    <div className="p-2">
                        <div className='card'>
                            <div className='card-head'>
                                <p className='h5 fw-bold py-1 mb-0 px-2 text-danger border-bottom border-danger'>Clients List</p>
                            </div>
                            <div className='card-body p-0'>
                                <table className="table table-striped table-hover mb-0">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th>Sl.No</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Project</th>
                                            <th className='text-center'>Status</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {/* {clientsData.length > 0 ? (
                                            clientsData.map((client, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{client.name}</td>
                                                    <td>{client.phone}</td>
                                                    <td>{client.email}</td>
                                                    <td>{client.project}</td>
                                                    <td>
                                                        <div className='text-center'>
                                                            {client.status === 0 && <span className="badge rounded-pill text-bg-warning">Upcoming</span>}
                                                            {client.status === 1 && <span className="badge rounded-pill text-bg-primary">In-Progress</span>}
                                                            {client.status === 2 && <span className="badge rounded-pill text-bg-success">Completed</span>}
                                                        </div>
                                                    </td>

                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center">
                                                            <p className="me-2 my-0 text-primary pointer" onClick={() => editClient(client._id)}>
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </p>
                                                            <p className="my-0 text-danger pointer"
                                                                onClick={() => deleteClient(client._id)}>
                                                                <FontAwesomeIcon icon={faTrashCan} />
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No clients found</td>
                                            </tr>
                                        )} */}



                                        {currentItems.length > 0 ? (
                                            currentItems.map((client, index) => (

                                                    <tr key={index}>
                                                        <td>{indexOfFirstItem + index + 1}</td>
                                                    <td>{client.name}</td>
                                                    <td>{client.phone}</td>
                                                    <td>{client.email}</td>
                                                    <td>{client.project}</td>
                                                    <td>
                                                        <div className='text-center'>
                                                            {client.status === 0 && <span className="badge rounded-pill text-bg-warning">Upcoming</span>}
                                                            {client.status === 1 && <span className="badge rounded-pill text-bg-primary">In-Progress</span>}
                                                            {client.status === 2 && <span className="badge rounded-pill text-bg-success">Completed</span>}
                                                        </div>
                                                    </td>

                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center">
                                                            <p className="me-2 my-0 text-primary pointer" onClick={() => editClient(client._id)}>
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </p>
                                                            <p className="my-0 text-danger pointer"
                                                                onClick={() => deleteClient(client._id)}>
                                                                <FontAwesomeIcon icon={faTrashCan} />
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No result found</td>
                                            </tr>
                                        )}

                                       
                                    </tbody>
                                </table>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={itemsPerPage}
                                    totalItemsCount={searchResult.length}
                                    pageRangeDisplayed={3}
                                    onChange={handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Clients;
