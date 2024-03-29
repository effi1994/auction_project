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
    TableRow,
    TablePagination,
    TextField,
    Alert
} from "@mui/material";
import StyledButton from "../components/Styled/StyledButton";
import {tableContainerSX} from "../components/Styled/ConstantsStyle";

import {randomUniqKey} from "../utilities/utilities"
import {getToken, getUser} from "../services/userAtuhService";
import {getTable} from "../services/TableMainService";
import AddProductModal from "../modles/AddProductModal ";
import {toast} from 'react-toastify';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './css/table.css';

const HomeTable = (props) => {
    const [user, setUser] = useState({});
    const [mainTableModels, setMainTableModels] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('name');
    const navigate = useNavigate();


    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        if (token) {
            getTable(token, setMainTableModels, setFilteredProducts);


            getUser(token, setUser);


        } else {
            navigate('/login');
        }


    },[]);


    useEffect(() => {
        const eventSource = new EventSource(config.apiUrl + "/sse-handler-main-table");
        eventSource.onmessage = event => {
            const updateTable = JSON.parse(event.data);
            if (updateTable.statement === 1) {
                setMainTableModels((prevMainTableModel) => {
                    const newMainTableModel = prevMainTableModel.slice();
                    const copy = [];
                    copy.push(updateTable);
                    copy.push(...newMainTableModel);
                    newMainTableModel.push(updateTable);
                    return copy;

                })

                setFilteredProducts((prevFilteredProducts) => {
                    const newFilteredProducts = prevFilteredProducts.slice();
                    const copy = [];
                    copy.push(updateTable);
                    copy.push(...newFilteredProducts);
                    newFilteredProducts.push(updateTable);
                    return copy;


                });

                if (updateTable.bidToken !== getToken()) toast.success(`New Product ${updateTable.name} add`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (updateTable.statement === 2) {
                setMainTableModels((prevMainTableModel) => {
                    const newMainTableModel = prevMainTableModel.slice();
                    const index = newMainTableModel.findIndex((product) => product.id === updateTable.id);
                    newMainTableModel.splice(index, 1);
                    return newMainTableModel;
                })

                setFilteredProducts((prevFilteredProducts) => {
                    const newFilteredProducts = prevFilteredProducts.slice();
                    const index = newFilteredProducts.findIndex((product) => product.id === updateTable.id);
                    newFilteredProducts.splice(index, 1);
                    return newFilteredProducts;
                })
                if (updateTable.bidToken === getToken()) {
                    toast.success(`Product ${updateTable.name} sell to ${updateTable.usernameWinnerOrBidder}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }

            } else if (updateTable.statement === 3) {
                setMainTableModels((prevMainTableModel) => {
                    const newMainTableModel = prevMainTableModel.slice();
                    const index = newMainTableModel.findIndex((product) => product.id === updateTable.id);
                    if (updateTable.bidToken !== getToken()) {
                        updateTable.myBids = newMainTableModel[index].myBids;
                    }
                    newMainTableModel[index] = updateTable;
                    return newMainTableModel;
                })

                setFilteredProducts((prevFilteredProducts) => {
                    const newFilteredProducts = prevFilteredProducts.slice();
                    const index = newFilteredProducts.findIndex((product) => product.id === updateTable.id);


                    if (updateTable.bidToken !== getToken()) {
                        updateTable.myBids = newFilteredProducts[index].myBids;
                    }
                    newFilteredProducts[index] = updateTable;
                    return newFilteredProducts;
                })
                console.log(filteredProducts);

                if (updateTable.publishToken === getToken()) {
                    toast.success(`Bid product: ${updateTable.name} by ${updateTable.usernameWinnerOrBidder}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }

            }
        }
        return () => {
            eventSource.close();
        }


    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const addNewProduct = () => {
        setOpen(true);
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filteredProducts = [...mainTableModels.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()))];
        setFilteredProducts(filteredProducts);
    }

    const handleChangeFilter = (updateTable) => {
        const filteredProducts = [...mainTableModels];
        filteredProducts.push(updateTable);
        setFilteredProducts(filteredProducts);

    }

    const handleSort = (column) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortField(column);

        const sortedMainTableModels = mainTableModels.slice().sort((a, b) => {
            if (a[column] < b[column]) {
                return newSortOrder === 'asc' ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return newSortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setMainTableModels(sortedMainTableModels);

        const sortedFilteredProducts = filteredProducts.slice().sort((a, b) => {
            if (a[column] < b[column]) {
                return newSortOrder === 'asc' ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return newSortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredProducts(sortedFilteredProducts);
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

        <>
            {!user.admin && <StyledButton
                variant="contained"
                sx={{
                    margin: "5px",
                    width: "200px",
                    height: "50px",
                    borderRadius: "10px",
                    padding: "0px",
                    fontSize: "16px",
                    position: "relative",
                    right: "314px",
                    top: "10px",


                }}
                text={"Add new product"}
                icon={"+"}

                onClick={addNewProduct}
            >Add new product</StyledButton>


            }

            <AddProductModal open={open} setOpen={setOpen} handleChangeFilter={handleChangeFilter}/>

            {
                filteredProducts.length > 0 ? <>
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
                            onChange={handleSearch}/>


                        <TableContainer component={Paper} sx={tableContainerSX}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" onClick={() => handleSort('name')}>
                                <span style={{cursor: 'pointer'}}>
                                Name {getSortIcon('name')}
                                </span>


                                        </TableCell>
                                        <TableCell align="center">Image</TableCell>
                                        <TableCell align="center" onClick={() => handleSort('date')}>
                                <span style={{cursor: 'pointer'}}>
                                Date {getSortIcon('date')}
                                </span>
                                        </TableCell>
                                        <TableCell align="center" onClick={() => handleSort('generalBids')}>
                                <span style={{cursor: 'pointer'}}>
                                General bids {getSortIcon('generalBids')}
                                </span>
                                        </TableCell>
                                        {!user.admin && <TableCell align="right" onClick={() => handleSort('myBids')}>
                                <span style={{cursor: 'pointer'}}>
                                My bids {getSortIcon('myBids')}
                                </span>
                                        </TableCell>}

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow key={randomUniqKey()} component={Link} to={`/product/${row.id}`}
                                                  className="table-row">
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center"><img style={{maxWidth: '100px', maxHeight: '100px'}}
                                                                           src={row.linkImage}
                                                                           alt={"green iguana"}/></TableCell>
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.generalBids}</TableCell>
                                            {!user.admin && <TableCell align="right">{row.myBids}</TableCell>}

                                        </TableRow>))}
                                </TableBody>
                            </Table>
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
                    : <Alert sx={{marginTop: 10}} severity="warning">
                        <strong>No products open</strong>
                        </Alert>


            }

        </>)
};

export default HomeTable;