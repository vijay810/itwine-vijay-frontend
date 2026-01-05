import React, { useState, useCallback, useEffect } from 'react';
import Layout from '../../components/AdminLayouts/Layout';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Teams = () => {
    const [teamform, setTeamForm] = useState({
        teamname: '',
        description: '',
        startdate: '',
        enddate: '',
        status: '1'
    });

    const [hidestatus, setHidestatus] = useState(false);
    const [searchtext, setSearchText] = useState(false);
    const [hideDesc, setHideDesc] = useState(true);
    const [addtext, setAddtext] = useState(true);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamsData, setTeamsData] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');
    const [searchflag, setSearchflag] = useState(false)
    const [addformflag, setAddformflag] = useState(true)

    const [searchTeamName, setSearchTeamName] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);


    const searchBtn = () => {
        setHidestatus(true);
        setSearchText(true);
        setAddtext(false);
        setHideDesc(false);
        setSearchflag(true);
        setAddformflag(false)
        setTeamForm({
            teamname: "",
            description: "",
            startdate: "",
            enddate: "",
            status: ""
        });
    };

    const addBtn = () => {
        setAddtext(true);
        setHidestatus(false);
        setSearchText(false);
        setHideDesc(true);
        setSelectedTeam(null);
        setSearchflag(false);
        setAddformflag(true)
        setTeamForm({
            teamname: '',
            description: '',
            startdate: '',
            enddate: '',
            status: '1'
        });
        setTouched({});
        setErrors({});
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamForm(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = useCallback(() => {
        const validationErrors = {};
        if (!(teamform.teamname || '').trim()) {
            validationErrors.teamname = 'Team Name is required.';
        }
        if (!teamform.description && hideDesc) {
            validationErrors.description = 'Description is required.';
        }
        if (!teamform.startdate) {
            validationErrors.startdate = 'Start date is required.';
        }
        if (!teamform.enddate) {
            validationErrors.enddate = 'End date is required.';
        }
        if (!teamform.status) {
            validationErrors.status = 'Status is required.';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [teamform, hideDesc]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        if (!selectedTeam) {
            axios
                .post(`${process.env.REACT_APP_API}/teams/create-teams`, teamform)
                .then((res) => {
                    setSuccessMsg('Team added successfully!');
                    addBtn();
                    setTeamForm({
                        teamname: "",
                        description: "",
                        startdate: "",
                        enddate: "",
                        status: "1"
                    });
                    setTimeout(() => {

                        getData();
                        setSuccessMsg('');
                    }, 1000)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            axios.put(`${process.env.REACT_APP_API}/teams/update-teams/${selectedTeam._id}`, teamform)
                .then((res) => {
                    setSuccessMsg(res.data.msg || 'Team updated successfully!');
                    setTimeout(() => {
                        setSuccessMsg('')
                        addBtn();
                        getData();
                    }, 1000)

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const getData = () => {
        axios.get(`${process.env.REACT_APP_API}/teams`)
            .then((res) => {
                setTeamsData(res.data.data || []);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editTeam = (_id) => {
        const selected = teamsData.find((team) => team._id === _id);
        if (!selected) return;
        setSearchflag(false);
        setAddformflag(true)

        setTeamForm({
            teamname: selected.teamname || '',
            description: selected.description || '',
            startdate: formatDateToInput(selected.startdate),
            enddate: formatDateToInput(selected.enddate),
            status: String(selected.status ?? '1')
        });
        setSelectedTeam(selected);
        setAddtext(true);
        setHidestatus(true);
        setSearchText(false);
        setHideDesc(true);
        setTouched({});
        setErrors({});
    };

    const deleteTeam = (_id) => {
        axios
            .delete(`${process.env.REACT_APP_API}/teams/delete-teams/` + _id)
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
    };


    const formatDateToInput = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    };

    const formatDateToDisplay = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB');
    };
    const handleSearch = (e) => {
        setSearchTeamName(e.target.value);
        setFilteredTeams([]);
    };

    const search = () => {
        const filtered = teamsData.filter((team) =>
            team.teamname.toLowerCase().includes(searchTeamName.toLowerCase())
        );
        setFilteredTeams(filtered);
    };



    useEffect(() => {
        setIsFormValid(validateForm());
    }, [teamform, touched, validateForm]);

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout>
            <div className='card m-2'>
                <div className='card-header'>
                    <div className='d-flex justify-content-between'>
                        {addtext && <p className='mb-0'>Add Teams</p>}
                        {searchtext && <p className='mb-0'>Search Teams</p>}
                        <div className='d-flex text-end'>
                            <div className='px-1'>
                                <button className='btn btn-warning' onClick={searchBtn}><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</button>
                            </div>
                            <div className='px-1'>
                                <button className='btn btn-primary' onClick={addBtn}><FontAwesomeIcon icon={faPlus} /> Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    {searchflag && (<div> <div className='row'>
                        <div className='col-sm-3'>
                            <label>Team Name</label>
                            <input
                                className='form-control'
                                type="text"
                                name="teamname"
                                value={searchTeamName}
                                onChange={handleSearch}
                            />

                        </div>
                    </div>
                        <div className='text-end pt-2'>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={search}
                                disabled={searchTeamName.trim() === ''}
                            >
                                Search
                            </button>

                        </div>
                    </div>
                    )}
                    {addformflag && (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <label>Team Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter Team Name'
                                            value={teamform.teamname}
                                            name='teamname'
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.teamname && errors.teamname && <div className='text-danger'>{errors.teamname}</div>}
                                    </div>
                                    {hideDesc && (
                                        <div className='col-sm-3'>
                                            <label>Description</label>
                                            <textarea
                                                className='form-control'
                                                placeholder='Enter Description'
                                                value={teamform.description}
                                                name='description'
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.description && errors.description && <div className='text-danger'>{errors.description}</div>}
                                        </div>
                                    )}
                                    <div className='col-sm-3'>
                                        <label>Start Date</label>
                                        <input
                                            type='date'
                                            className='form-control'
                                            value={teamform.startdate}
                                            name='startdate'
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.startdate && errors.startdate && <div className='text-danger'>{errors.startdate}</div>}
                                    </div>
                                    <div className='col-sm-3'>
                                        <label>End Date</label>
                                        <input
                                            type='date'
                                            className='form-control'
                                            value={teamform.enddate}
                                            name='enddate'
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.enddate && errors.enddate && <div className='text-danger'>{errors.enddate}</div>}
                                    </div>
                                    {hidestatus && (
                                        <div className='col-sm-3'>
                                            <label>Status</label>
                                            <select
                                                className='form-select'
                                                name='status'
                                                value={teamform.status}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value='' selected disabled>Please select status</option>
                                                <option value='1'>Active</option>
                                                <option value='0'>Inactive</option>
                                            </select>
                                            {touched.status && errors.status && <div className='text-danger'>{errors.status}</div>}
                                        </div>
                                    )}
                                </div>
                                <div className='text-end my-2'>
                                    <button type='submit' className='btn btn-primary' disabled={!isFormValid}>
                                        {selectedTeam ? 'Update' : 'Submit'}
                                    </button>
                                </div>
                            </form>

                            {successMsg && (
                                <p className='text-center text-success'>{successMsg}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className='card m-2'>
                <div className='card-body table-responsive'>
                    <table className='table table-bordered table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Team Name</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filteredTeams.length > 0 ? filteredTeams : teamsData).length > 0 ? (
                                (filteredTeams.length > 0 ? filteredTeams : teamsData).map((team, index) => (

                                    <tr key={team._id}>
                                        <td>{index + 1}</td>
                                        <td>{team.teamname}</td>
                                        <td>{team.description}</td>
                                        <td>{formatDateToDisplay(team.startdate)}</td>
                                        <td>{formatDateToDisplay(team.enddate)}</td>
                                        <td>
                                            {team.status === 0 && <span className='badge rounded-pill text-bg-danger'>Inactive</span>}
                                            {team.status === 1 && <span className='badge rounded-pill text-bg-success'>Active</span>}
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center">
                                                <span className="me-2 my-0 text-primary pointer" onClick={() => editTeam(team._id)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </span>
                                                <span className="my-0 text-danger pointer" onClick={() => deleteTeam(team._id)}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='7' className='text-center'>No Teams found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Teams;
