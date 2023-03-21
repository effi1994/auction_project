import {useState, useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate, Link} from "react-router-dom";
import config from "../config.json";
import {tableContainerSX} from "../components/Styled/ConstantsStyle";
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Alert
} from "@mui/material";
import {getMyProducts} from "../services/ProductService";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './css/table.css';

const MyProducts = (props) => {
    const [myProducts, setMyProducts] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('name');

    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        const isAdmin = cookies.get(config.tokenKeyAdmin);
        if (isAdmin === 'true') navigate('/');
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

    const handleSort = (column) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortField(column);
        const sortedProducts = [...myProducts].sort((a, b) => {
                if (a[column] < b[column]) {
                    return newSortOrder === 'asc' ? -1 : 1;
                } else if (a[column] > b[column]) {
                    return newSortOrder === 'asc' ? 1 : -1;
                } else {
                    return 0;
                }
            }
        );
        setMyProducts(sortedProducts);
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


    //id: 82, name: 'aple', bidMax: 0, openToAction: true
    // openToAction = true => open  color: green  text: Open  openToAction= false => close  color: red  text: Close

    return (<div>

            {myProducts.length > 0 ? <>
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
                    >My Products</h2>

                    <TableContainer component={Paper} sx={tableContainerSX}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={() => handleSort('name')}>
                                 <span style={{cursor: 'pointer'}}>
                                Product Name {getSortIcon('name')}
                                </span>
                                    </TableCell>
                                    <TableCell align="center" onClick={() => handleSort('bidMax')}>
                                    <span style={{cursor: 'pointer'}}>
                                        Bid Max
                                        {getSortIcon('bidMax')}
                                    </span>
                                    </TableCell>
                                    <TableCell align="right" onClick={() => handleSort('openToAction')}>
                                    <span style={{cursor: 'pointer'}}>
                                        Open/Close {getSortIcon('openToAction')}
                                    </span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {myProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow
                                        className="table-row"
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        component={Link} to={`/product/${row.id}`}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.bidMax}$</TableCell>
                                        <TableCell align="right"
                                                   style={{color: row.openToAction ? 'green' : 'red', fontWeight: 'bold'}}
                                        >{row.openToAction ? 'open' : 'close'}</TableCell>
                                    </TableRow>))}
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
                </>
                :
                <Alert sx={{marginTop: 10}} severity="warning">You have no products yet</Alert>
            }
        </div>

    )
        ;
}
export default MyProducts;