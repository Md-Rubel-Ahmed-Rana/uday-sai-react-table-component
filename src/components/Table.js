import React, { useEffect, useState } from 'react';

const Table = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState({})

    useEffect(() => {
        fetch("MOCK_DATA.json")
        .then((res) => res.json())
            .then((data) => setData(data))
    }, [])

    const sorting = (col, order) => {
        if (col === "ASC"){
            const sortedData = [...data].sort((a,b) => 
                a[order].toLowerCase() > b[order].toLowerCase() ? 1 : -1)
            setData(sortedData);
        }
        if (col === "DSC") {
            const sortedData = [...data].sort((a, b) =>
                a[order].toLowerCase() < b[order].toLowerCase() ? 1 : -1)
            setData(sortedData);
        }
    }



    return (
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <th>
                        <span style={{marginRight: "10px"}}>First Name</span>
                        <select onChange={(e) => sorting(e.target.value, "first_name")} name="firstName" id="">
                            <option selected disabled>Unsorted</option>
                            <option value="ASC">Sort by ASC</option>
                            <option value="DSC">Sort by DESC</option>
                        </select>
                    </th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Full Name</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {/* It's only show on small device */}
                    <div className='small-sorting'>
                        <select onChange={(e) => sorting(e.target.value, "first_name")} name="firstName" id="">
                            <option selected disabled>Unsorted</option>
                            <option value="ASC">Sort by ASC</option>
                            <option value="DSC">Sort by DESC</option>
                        </select>
                    </div>
                    {
                        data.map((item) => <tr key={item.id} onClick={() => setSelected(item)} style={selected.id === item.id ? {backgroundColor: "blue", color: "white"} : null}>
                            <td data-aria-label='First Name'>{item.first_name}</td>
                            <td data-aria-label='Last Name'>{item.last_name}</td>
                            <td data-aria-label='Age'>{item.age}</td>
                            <td data-aria-label='Full Name'>{item.first_name} {item.last_name}</td>
                            <td data-aria-label='status' style={item.status ? { backgroundColor: "green", color: "white" } : { backgroundColor: "red", color: "white" } }>{item.status} {item.status ? "True" : "False" }</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;