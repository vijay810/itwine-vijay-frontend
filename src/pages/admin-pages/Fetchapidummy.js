import React, { useEffect, useState } from 'react';

const Fetchapidummy = () => {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchText, setSearchText] = useState("");

    // Fetch API data
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    // Button click handler
    const handleSearch = () => {
        setSearchText(searchInput);
    };

    // Filter users
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2>User Search</h2>

            <input
                type="text"
                placeholder="Enter name"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                style={{ padding: "5px", marginRight: "10px" }}
            />

            <button onClick={handleSearch}>Search</button>

            <table border="1" width="100%" cellPadding="8" style={{ marginTop: "15px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address.city}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" align="center">
                                No Data Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


export default Fetchapidummy;
