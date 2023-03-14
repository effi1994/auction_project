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
    TableRow, TablePagination
} from "@mui/material";
import {getMyBids} from "../services/BidService";
import {randomUniqKey} from "../utilities/utilities"


const MyBids = (props) => {
    const [MyBidsModels, setMyBidsModels] = useState([]);
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
    //{id: 21, name: 'all', bid: 100, openToAction: true, isWinner: 3}
    //isWinner: 3 - NO RESULT, 2 - LOSS, 1 - winner

    return (
        <div>
            <TableContainer component={Paper} sx={tableContainerSX}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="center">Bid</TableCell>
                            <TableCell align="right">Open/Close</TableCell>
                            <TableCell align="right">Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {MyBidsModels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={randomUniqKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <Link
                                        to={`/product/${row.id}`}>{row.name}</Link>
                                </TableCell>
                                <TableCell align="center">{row.bid}</TableCell>
                                <TableCell align="right">{row.openToAction ? 'Open' : 'Close'}</TableCell>
                                <TableCell
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
        </div>
    );


}

export default MyBids;