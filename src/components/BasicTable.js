import React from 'react'
import { useMemo, useEffect, useState} from 'react'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {COLUMNS} from './columns'
import { GlobalFilter } from './GlobalFilter'
import 'semantic-ui-css/semantic.min.css'
import { Button, Table, Icon } from 'semantic-ui-react'


//import './table.css'

export const BasicTable = () => {


    const columns= useMemo(()=>COLUMNS,[])
    

    const [data, setData] =useState([]);

    


    useEffect(()=> {

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(result=>setData(result))
        .catch(error=>console.log(error));
    },[])

    
    


    const tableInstance = useTable({

        columns,
        
        data,


    }, useGlobalFilter, useSortBy, usePagination
    )

   

    const{ 

        getTableProps,
        headerGroups,
        page,
        

        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter
    }= tableInstance

    const {globalFilter}=state

    const {pageIndex}=state

    return (

        <>

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <Table celled {...getTableProps()}>

            <Table.Header>

                {headerGroups.map((headerGroup)=>(

                    <Table.Row {...headerGroup.getHeaderGroupProps()}>

                        {headerGroup.headers.map((column)=>(

                            <Table.HeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                            <span>

                                {column.isSorted?(column.isSortedDesc? <Icon name='angle down'/>:<Icon name='angle up'/>):''}
                            </span>
                            
                            
                            
                            
                            
                            </Table.HeaderCell>
                        ))


                        }
                    </Table.Row>

                ))}
            </Table.Header>

            <Table.Body {...getTableProps()}>

                {page.map((row)=>{

                    prepareRow(row)

                    return(

                        <Table.Row {...row.getRowProps()}>

                            {row.cells.map((cell)=>{

                                return <Table.Cell {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </Table.Cell>
                            })}
                        </Table.Row>

                    )


                })}

                
            </Table.Body>
        </Table>

        <div>
            <span>
                Page{' '}

                <strong>
                    {pageIndex+1} of {pageOptions.length}
                </strong>{' '}
            </span>

            <Button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</Button>
            <Button onClick={()=>nextPage()} disabled={!canNextPage}>Next</Button>
            
            
        </div>
        </>

        


        
    )

    
}