import {useState, useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate, Link} from "react-router-dom";
import config from "../config.json";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {tableContainerSX} from "../components/Styled/ConstantsStyle";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip, TablePagination
} from "@mui/material";
import StyledButton from "../components/Styled/StyledButton";

import {randomUniqKey} from "../utilities/utilities"
import {getUser} from "../services/userAtuhService";
import {getTable} from "../services/TableMainService";

const HomeTable = (props) => {
    const [user, setUser] = useState({});
    const [mainTableModels, setMainTableModels] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const navigate = useNavigate();


    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        if (token) {
            getTable(token, setMainTableModels);

            getUser(token, setUser);
            if (user.admin) {
                console.log("admin")
                console.log(user)
            } else {
                console.log("not admin")
            }

        } else {
            navigate('/login');
        }


    }, [])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const addNewProduct = () => {
        console.log("add new product");
        //navigate('/addProduct');
    }


    return (
        <>

            <StyledButton
                variant="contained"
                sx={{
                    margin: "10px"

            }}
                text={"Add new product"}
                icon={"+"}

                onClick={addNewProduct}
            >Add new product</StyledButton>


            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">Date open</TableCell>
                            <TableCell align="right">General bids</TableCell>
                            <TableCell align="right">My bids</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mainTableModels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="right"><Link to={`/products/${row.id}`}>{row.name}</Link></TableCell>
                                <TableCell align="right">{row.linkImage}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.generalBids}</TableCell>
                                <TableCell align="right">{row.myBids}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={mainTableModels.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
};

export default HomeTable;