
import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import Row from "./userRow";


function UserTable({updateUser}) {
    const users = useSelector(state => state.user.users)

    return  <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{backgroundColor:"#d3e0ea"}}>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>          
                    {users.length> 0 ?  users.map((row) => (
                        <Row key={row.id} user={row} updateUser={updateUser}/>
                        )) : 
                        <TableRow>
                            <TableCell>No User are currently in the app :(</TableCell>
                        </TableRow>
                    }      
                </TableBody>
                </Table>
            </TableContainer>
}

export default UserTable
