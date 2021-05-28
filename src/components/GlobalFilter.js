import React from 'react';
import { Input } from 'semantic-ui-react'

export const GlobalFilter=({filter, setFilter})=>{

    return (

        <span>

            Search : {' '}

            <Input focus value={filter || ''} onChange={(e)=>setFilter(e.target.value)}/>
            
        </span>
    )


}
