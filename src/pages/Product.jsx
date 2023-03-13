import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getToken, getUser} from '../services/userAtuhService';
import {Cookies} from 'react-cookie';
import config from "../config.json";
import {useNavigate} from "react-router-dom";
import {getProduct,closeProduct} from "../services/ProductService";
import  {addBid} from "../services/BidService";
import {
    Box,
    Button,
    GlobalStyles,
    IconButton,
    InputAdornment,
    TextField, Tooltip,
    Typography,
    CardMedia, InputLabel, Select, MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TablePagination
} from "@mui/material";

import {globalStyle, boxSX} from "../components/Styled/ConstantsStyle"
import {FormLabel, FormControlLabel} from '@mui/material';
import StyledButton from "../components/Styled/StyledButton";


function Product() {
    const {id} = useParams();
    const [bid, setBid] = useState(0);
    const [product, setProduct] = useState({});
    const [myBids, setMyBids] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({});
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page dropdown
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
            const token = getToken();
            if (token) {
                setIsAdmin((cookies.get(config.tokenKeyAdmin) === 'true'));
                getUser(token, setUser);
                if (id)
                    getProduct(token, id, setProduct,setMyBids);

            } else {
                navigate('/login');
            }
        }
        , []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBid = (event) => {
        setBid(event.target.value);
    }

    const handleAddBid = () => {
        const token = getToken();
        if (token) {
            addBid(token, id, bid, setMyBids);
        } else {

        }
    }

    const closeAction = () => {
        const token = getToken();
        if (token) {
            closeProduct(token, id,navigate);
        } else {
            navigate('/login');
        }

    }





//content
// :
// "hghg"
// id
// :
// 16
// imageLink
// :
// "hjhj"
// minimumPrice
// :
// 100
// myBids
// :
// []
// numOpenBids
// :
// 0
// openToAction
// :
// true
// productName
// :
// "tot"
// publishDate
// :
// "2023-03-09 09:10"
// publishUserId
// :
// 10
// username
// :
// "effi287586@"
    const productImage = 'https://cdn3.careeraddict.com/uploads/article/60419/entrepreneurship-product-ideas.png';
    return (
        <div>
            <h1>Product</h1>
            <form>
                <div>
                    <label>Product Name: {product.productName}</label>
                </div>
                <div>
                    <label>Product Description: {product.content}</label>
                </div>

                <div>
                    <label>Product Image: </label>
                    <CardMedia
                        component="img"
                        height="194"
                        image={productImage}
                        alt="green iguana"
                    />
                </div>

                <div>
                    <label>Publish Date: {product.publishDate}</label>
                </div>

                <div>
                    <label>Product Owner: {product.username}</label>
                </div>

                <div>
                    <label>Minimum Price: {product.minimumPrice}$</label>
                </div>

                <div>
                    <label>Number of Open Bids: {product.numOpenBids}</label>


                </div>

                {
                    user.id === product.publishUserId && product.openToAction == true &&

                    <div>
                        <Button
                            variant="contained"
                            onClick={closeAction}
                        >
                            Close Auction
                        </Button>
                    </div>

                }

            </form>

            <>
                <h1>My Bids</h1>
                <TextField
                    id="outlined-basic"
                    label="Bid Price"
                    variant="outlined"
                    value={bid}
                    onChange={handleBid}
                    sx={{
                        margin: "10px"
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">$</InputAdornment>,
                    }}
                />

                <StyledButton
                    variant="contained"
                    sx={{
                        margin: "10px"

                    }}
                    text={"Add Bid"}
                    icon={"+"}
                    onClick={handleAddBid}
                >
                    Add Bid
                </StyledButton>




                {

                    myBids && myBids.length > 0 &&
                    <div>
                        <TableContainer>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Bid Price</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {myBids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell>{row.userBid}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            component="div"
                            count={myBids.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                }


            </>


        </div>
    );
}

export default Product;