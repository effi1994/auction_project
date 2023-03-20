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
    TableRow, TablePagination, Alert
} from "@mui/material";
import {getMyBids} from "../services/BidService";
import {randomUniqKey} from "../utilities/utilities"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './css/table.css';


const MyBids = (props) => {
    const [MyBidsModels, setMyBidsModels] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('name');

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        const isAdmin = cookies.get(config.tokenKeyAdmin);
        if (isAdmin === 'true')
            navigate('/');
        if (token && isAdmin) {
            getMyBids(token, setMyBidsModels);
        } else {
            navigate('/');
        }


    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (column) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortField(column);
        const sortedProducts = [...MyBidsModels].sort((a, b) => {
                if (a[column] < b[column]) {
                    return newSortOrder === 'asc' ? -1 : 1;
                } else if (a[column] > b[column]) {
                    return newSortOrder === 'asc' ? 1 : -1;
                } else {
                    return 0;
                }
            }
        );
        setMyBidsModels(sortedProducts);

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


    //{id: 21, name: 'all', bid: 100, openToAction: true, isWinner: 3}
    //isWinner: 3  - NO RESULT, 2 - LOSS, 1 - winner
    // isWinner: 3 -> color: #FFC107  isWinner: 2 -> color: #FF0000  isWinner: 1 -> color: #00FF00
    // openToAction = true => open  color: green  text: Open  openToAction= false => close  color: red  text: Close

    return (
        <div>

            {
                MyBidsModels.length > 0 ?
                    <>
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
                        >My Bids</h2>
                        <TableContainer component={Paper} sx={tableContainerSX}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell onClick={() => handleSort('name')}>
                                <span style={{cursor: 'pointer'}}>
                                    Product Name {getSortIcon('name')}
                                </span>
                                        </TableCell>
                                        <TableCell align="center" onClick={() => handleSort('bid')}>
                                <span style={{cursor: 'pointer'}}>
                                Bid {getSortIcon('bid')}
                                </span>
                                        </TableCell>
                                        <TableCell align="right" onClick={() => handleSort('openToAction')}>
                                <span style={{cursor: 'pointer'}}>
                                Open/Close {getSortIcon('openToAction')}
                                </span>
                                        </TableCell>
                                        <TableCell align="right" onClick={() => handleSort('isWinner')}>
                                <span style={{cursor: 'pointer'}}>
                                Result {getSortIcon('isWinner')}
                                </span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {MyBidsModels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow
                                            key={randomUniqKey()}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            className="table-row"
                                            component={Link} to={`/product/${row.id}`}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.bid}$</TableCell>
                                            <TableCell align="right" style={{
                                                color: row.openToAction ? 'green' : 'red',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}
                                            >{row.openToAction ? 'Open' : 'Close'}</TableCell>
                                            <TableCell style={{
                                                color: row.isWinner === 3 ? '#969aa2' : row.isWinner === 2 ? '#FF0000' : '#00FF00',
                                                fontWeight: 'bold'
                                            }}
                                                       align="right">{row.isWinner === 3 ? 'No Result' : row.isWinner === 2 ? 'Loss' : 'Winner'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            component="div"
                            count={MyBidsModels.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </> : <Alert sx={{marginTop: 10}} severity="warning">You have no bids</Alert>
            }


        </div>
    );


}

export default MyBids;