import {useState, useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate, Link} from "react-router-dom";
import config from "../config.json";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TablePagination, TextField,
    Alert
} from "@mui/material";
import {tableContainerSX} from "../components/Styled/ConstantsStyle";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import {randomUniqKey} from "../utilities/utilities"
import {getAllUsers} from "../services/ManageService";
import './css/table.css';

const UsersSystem = (props) => {
    const [users, setUsers] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('username');


    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        const admin = cookies.get(config.tokenKeyAdmin);

        if (admin === 'true') {
            getAllUsers(token, setUsers, setFilteredUsers);
        } else {
            navigate('/');
        }
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    const handleSearchUsers = (event) => {
        setSearchTerm(event.target.value);
        const filteredUsers = [...users.filter(user => user.username.toLowerCase().includes(event.target.value.toLowerCase()))];
        setFilteredUsers(filteredUsers);
    }

    const handleSort = (column) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortField(column);
        const sortedUsers = [...filteredUsers].sort((a, b) => {
                if (a[column] < b[column]) {
                    return newSortOrder === 'asc' ? -1 : 1;
                }
                if (a[column] > b[column]) {
                    return newSortOrder === 'asc' ? 1 : -1;
                }
                return 0;
            }
        );
        setFilteredUsers(sortedUsers);
    };


    const getSortIcon = (field) => {
        if (sortField !== field) {
            return null;
        } else if (sortOrder === 'asc') {
            return <ArrowUpwardIcon/>;
        } else {
            return <ArrowDownwardIcon/>;
        }
    }


    return (
        <div>
            {
                users.length > 0 ? <>
                    <h2
                        style={{
                            textAlign: 'center',
                            color: '#3f51b5',
                            fontWeight: 'bold',
                            fontSize: '30px',
                            marginTop: '20px',
                            marginBottom: '20px',
                            fontFamily: 'sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            textDecoration: 'underline',
                            textDecorationColor: '#0335fc',
                            textDecorationThickness: '3px',
                            textDecorationStyle: 'double',
                            textUnderlineOffset: '10px',
                            textShadow: '2px 2px 2px #3f51b5',
                        }}

                    >Users System</h2>
                    <TextField
                        sx={{
                            margin: "5px",
                            width: "300px",
                            height: "50px",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            padding: "0px",
                            fontSize: "16px",
                            position: "relative",
                            left: "120px;",
                            top: "10px",
                            transform: "translateX(-50%)"
                        }}
                        id="outlined-basic" label="Search" variant="outlined" value={searchTerm}
                        onChange={handleSearchUsers}/>

                    <TableContainer component={Paper} sx={tableContainerSX}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" onClick={() => handleSort('username')}>
                                 <span style={{cursor: 'pointer'}}>
                                Username{getSortIcon('username')}
                                </span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, i) => (
                                    <TableRow
                                        className={"table-row"}
                                        key={randomUniqKey()}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        component={Link} to={`/user/${user.id}`}
                                    >
                                        <TableCell align="left">
                                            {user.username}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={filteredUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </> : <Alert sx={{marginTop: 10}} severity="warning">
                    <strong>There are no users in the system!</strong>
                    </Alert>
            }


        </div>


    )


}
export default UsersSystem;