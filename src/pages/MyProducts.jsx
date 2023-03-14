import {useState, useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate, Link} from "react-router-dom";
import config from "../config.json";
import {tableContainerSX} from "../components/Styled/ConstantsStyle";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,  TablePagination
} from "@mui/material";
import {getMyProducts} from "../services/ProductService";


const MyProducts = (props) => {
    const [myProducts, setMyProducts] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        const isAdmin = cookies.get(config.tokenKeyAdmin);
        if (isAdmin === 'true')
            navigate('/');
        if (token && isAdmin) {
            getMyProducts(token, setMyProducts);
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
    //id: 82, name: 'aple', bidMax: 0, openToAction: true

    return (
        <div>
            <TableContainer component={Paper} sx={tableContainerSX}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="center">Bid Max</TableCell>
                            <TableCell align="right">Open/Close</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/product/${row.id}`}>{row.name}</Link>
                                </TableCell>
                                <TableCell align="center">{row.bidMax}</TableCell>
                                <TableCell align="right">{row.openToAction ? 'open' : 'close'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={myProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>

    );
}
export default MyProducts;