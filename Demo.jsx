import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable, { createTheme } from 'react-data-table-component';
import './Filter.css'
const Demo = () => {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState();
    const[inputdata,setInptData] =useState('');
    function handleChange(e){   
        setInptData(e.target.value)
    }
    function clear(){
        setInptData('')
    }
    createTheme('solarized', {
        background: {
            default: '#002b36',
        }
    }, 'dark');
    const customStyles={
        rows: {
            style: {
                width:'fitcontent',
                height:'auto'
            }
        }
    }
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos').then((resp) => {
            setData(resp.data)
        }).catch((error) => {
            console.warn(error);
        })
    }, [])

    const columns = [
        {
            name: 'UserID',
            selector: row => row.UserId,
            sortable: true,
        },
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Completed',
            selector: row => row.Completed,
        },
    ];

    const tableData = data?.filter((item)=>{
    const itemId = item.id && item.id.toString().toLowerCase().includes(inputdata.toLowerCase());
    const itemTitle = item.title && item.id && item.title.toLowerCase().includes(inputdata.toLowerCase());
    const itemResult = item.completed && item.completed.toString().toLowerCase().includes(inputdata.toLowerCase());
    return itemId || itemTitle || itemResult;
    }).map((item) => {
        
        return {
            UserId: item.userId,
            id: item.id,
            title: item.title,
            Completed: item.completed.toString()
        };
    });

    const handleSelected = ({ selectedRows }) => {
        if (selectedRows !== '') {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }
    function handleDisable(rows) {
        if (rows.Completed === 'false') {
            return true;
        } else {
            return false;
        }
    }
    // function handlePre(rows){
    //     if(rows.city==='Bartholomebury'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
    function handleExpand({ data }) {
        return (
            <pre>{JSON.stringify(data, null, 2)}</pre>
        )
    }
    function rowExpandDisable(rows) {
        if (rows.Completed === 'false') {
            return true;
        } else {
            return false;
        }
        // if (selected=='false') {
        //     return true;
        // }else{
        //     return false;
        // }
    }
    // const handleExpand=({data})=>(<pre>{JSON.stringify(data,null,2)}</pre>)  
    return (
        <div>
            <h1>Demo</h1>
            <div className='container'>
                <input type="text" className='inputbox' value={inputdata} 
                onChange={handleChange} style={{paddingLeft:'10px'}} />
                <button className='clearbtn' onClick={clear}>X</button>
            </div>
            <DataTable
                columns={columns}
                data={tableData}
                fixedHeader={true}
                fixedHeaderScrollHeight='400px'
                theme="solarized"
                // progressComponent={<AiOutlineLoading3Quarters></AiOutlineLoading3Quarters>}
                // defaultSortFieldId={2}  
                selectableRows
                onSelectedRowsChange={handleSelected}
                selectableRowDisabled={handleDisable}
                // selectableRowSelected={handlePre}
                expandableRows
                expandableRowsComponent={handleExpand}
                expandableRowDisabled={rowExpandDisable}
                pagination
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
            />
        </div>
    )
}

export default Demo
