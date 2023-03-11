/*import StyledButton from "../components/Styled/StyledButton";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import {Link} from "react-router-dom";


import { useState, useEffect } from "react";
import { Cookies } from 'react-cookie';
import { useNavigate,Link } from "react-router-dom";
import config from "../config.json";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { tableContainerSX } from "../components/Styled/ConstantsStyle";
import {
    IconButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Tooltip,
    TablePagination, TextField
} from "@mui/material";
import StyledButton from "../components/Styled/StyledButton";
import { randomUniqKey } from "../utilities/utilities"
import { getUser } from "../services/userAtuhService";
import { getTable } from "../services/TableMainService";

const MyProducts = (props) => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        if (token) {
            getTable(token, setProducts); // Assuming getTable function returns the products array
            getUser(token, setUser);
        } else {
            navigate('/login');
        }
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper sx={tableContainerSX}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Highest Bid</TableCell>
                            <TableCell align="right">Tender Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow key={randomUniqKey()}>
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="right">{product.highestBid}</TableCell>
                                    <TableCell align="right">{product.tenderStatus}</TableCell>
                                    <TableCell align="right">
                                        <Link to={`/edit-product/${product.id}`}>
                                            <IconButton size="small" aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton size="small" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
            )
            };


export default MyProducts;*/