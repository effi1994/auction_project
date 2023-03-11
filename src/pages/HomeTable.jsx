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
    TableRow, Tooltip, TablePagination, TextField
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
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);


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

    useEffect(() => {
        const eventSource = new EventSource(config.apiUrl + "/sse-handler-main-table");
        eventSource.onmessage = event => {
            const updateTable = JSON.parse(event.data);
            if (updateTable.statement===1){
                debugger

                const mainTableModel = [...mainTableModels];
                mainTableModel.push(updateTable);
                setMainTableModels(mainTableModel);
                setFilteredProducts(mainTableModel);

            }else if (updateTable.statement===2) {
                const mainTableModel = updateTable
            }else if (updateTable.statement===3) {
                const mainTableModel = updateTable
            }


        };
        return () => {
            eventSource.close();
        };
    } , [])




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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filteredProducts = [...mainTableModels.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()))];
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


            <TextField
                sx={{
                    margin: "10px"
                }}
                id="outlined-basic" label="Search" variant="outlined" value={searchTerm}
                onChange={handleSearch}/>


            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">Date open</TableCell>
                            <TableCell align="right">General bids</TableCell>
                            {
                                !user.admin &&
                                <TableCell align="right">My bids</TableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="right"><Link to={`/products/${row.id}`}>{row.name}</Link></TableCell>
                                <TableCell align="right">{row.linkImage}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.generalBids}</TableCell>
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