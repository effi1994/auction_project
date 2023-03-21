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
    TableRow, TablePagination, TextField
} from "@mui/material";
import {tableContainerSX} from "../components/Styled/ConstantsStyle";

import {randomUniqKey} from "../utilities/utilities"
import {getAllUsers} from "../services/ManageService";

const UsersSystem = (props) => {
    const [users, setUsers] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);



    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        const admin = cookies.get(config.tokenKeyAdmin);

        if (admin === 'true') {
            getAllUsers(token, setUsers,setFilteredUsers);
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

    //id: 6, username: 'effi26@'

    return (
        <div>
            <h1>Users System</h1>
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
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Username</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, i) => (
                            <TableRow
                                key={randomUniqKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align={"center"}>
                                    {i + 1}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`/user/${user.id}`}>
                                        {user.username}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>


    )


}
export default UsersSystem;