import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import './Datatable.css'
function DataTables() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((resp) => {
            setData(resp.data)
        }).catch((error) => {
            console.warn(error);
        })
    }, [])
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.fullname,
        },
        {
            name: 'User Name',
            selector: row => row.username,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Street',
            selector: row => row.street
        },
        {
            name: 'Suite',
            selector: row => row.suite
        },
        {
            name: 'City',
            selector: row => row.city
        },
        {
            name: 'Zipcode',
            selector: row => row.zipcode
        }
    ];

    const tableData = data?.map((item) => {
        return {
            id: item.id,
            fullname: item.name,
            username: item.username,
            email: item.email,
            street: item.address.street,
            suite: item.address.suite,
            city: item.address.city,
            zipcode: item.address.zipcode,
        }

    })
    return (
        <>
            <DataTable
                columns={columns}
                data={tableData}
                fixedHeader={true}
                fixedHeaderScrollHeight='400px'
                className='custom-table'
            />

        </>
    )
}

export default DataTables
