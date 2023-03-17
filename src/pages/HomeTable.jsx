import {useState, useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate, Link} from "react-router-dom";
import config from "../config.json";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip, TablePagination, TextField
} from "@mui/material";
import StyledButton from "../components/Styled/StyledButton";
import {tableContainerSX} from "../components/Styled/ConstantsStyle";

import {randomUniqKey} from "../utilities/utilities"
import {getToken, getUser} from "../services/userAtuhService";
import {getTable} from "../services/TableMainService";
import AddProductModal from "../modles/AddProductModal ";
import {toast} from 'react-toastify';
const HomeTable = (props) => {
    const [user, setUser] = useState({});
    const [mainTableModels, setMainTableModels] = useState([]);
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [open, setOpen] = useState(false);



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


    }, []);

  /*  useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        const eventSource = new EventSource(config.apiUrl + "/sse-handler?token="+ token);
        eventSource.onmessage = event => {
            const newStats = JSON.parse(event.data);
            console.log(newStats);

        }
    }, [])*/



    useEffect(() => {
        const eventSource = new EventSource(config.apiUrl + "/sse-handler-main-table");
        eventSource.onmessage = event => {
            const updateTable = JSON.parse(event.data);
            if (updateTable.statement === 1) {
                setMainTableModels((prevMainTableModel) => {
                    const newMainTableModel = prevMainTableModel.slice();
                    const copy =[];
                    copy.push(updateTable);
                    copy.push(...newMainTableModel);
                    newMainTableModel.push(updateTable);
                    return copy;

                })

                setFilteredProducts((prevFilteredProducts) => {
                    const newFilteredProducts = prevFilteredProducts.slice();
                    const copy =[];
                    copy.push(updateTable);
                    copy.push(...newFilteredProducts);
                    newFilteredProducts.push(updateTable);
                    return copy;


                });

                if (updateTable.bidToken !==getToken())
                toast.success(`New Product ${updateTable.name} add` , {
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

                toast.success("Product sell", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (updateTable.statement === 3) {
                setMainTableModels((prevMainTableModel) => {
                    const newMainTableModel = prevMainTableModel.slice();
                    const index = newMainTableModel.findIndex((product) => product.id === updateTable.id);
                    if (updateTable.bidToken !==getToken()){
                        updateTable.myBids =newMainTableModel[index].myBids;
                    }
                   if (updateTable.publishToken === getToken()){
                        toast.success(`bid ${updateTable.name}`, {
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

                    newMainTableModel[index] = updateTable;
                    return newMainTableModel;
                })

                setFilteredProducts((prevFilteredProducts) => {
                    const newFilteredProducts = prevFilteredProducts.slice();
                    const index = newFilteredProducts.findIndex((product) => product.id === updateTable.id);


                    if (updateTable.bidToken !==getToken()){
                        updateTable.myBids =newFilteredProducts[index].myBids;
                    }
                    newFilteredProducts[index] = updateTable;
                    return newFilteredProducts;
                })

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

        //navigate('/addProduct');
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


    return (

        <>

            {
                !user.admin &&
                <StyledButton
                    variant="contained"
                    sx={{
                        margin: "10px"

                    }}
                    text={"Add new product"}
                    icon={"+"}

                    onClick={addNewProduct}
                >Add new product</StyledButton>


            }

            <AddProductModal open={open} setOpen={setOpen} handleChangeFilter={handleChangeFilter}/>
            <TextField
                sx={{
                    margin: "10px"
                }}
                id="outlined-basic" label="Search" variant="outlined" value={searchTerm}
                onChange={handleSearch}/>


            <TableContainer  component={Paper} sx={tableContainerSX}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Date open</TableCell>
                            <TableCell align="center">General bids</TableCell>
                            {
                                !user.admin &&
                                <TableCell align="right">My bids</TableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={randomUniqKey()}>
                                <TableCell align="center"><Link
                                    to={`/product/${row.id}`}>{row.name}</Link></TableCell>
                                <TableCell align="center"><img style={{ maxWidth: '100px', maxHeight: '100px' }} src={row.linkImage} alt={"green iguana"} /></TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">{row.generalBids}</TableCell>
                                {
                                    !user.admin &&
                                    <TableCell align="right">{row.myBids}</TableCell>
                                }

                            </TableRow>
                        ))}
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
    )
};

export default HomeTable;