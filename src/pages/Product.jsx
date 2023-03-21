import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getToken, getUser} from '../services/userAtuhService';
import {Cookies} from 'react-cookie';
import config from "../config.json";
import {useNavigate} from "react-router-dom";
import {getProduct, closeProduct} from "../services/ProductService";
import {addBid} from "../services/BidService";
import {
    Button,
    InputAdornment,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TablePagination, Paper
} from "@mui/material";
import {tableContainerSX} from "../components/Styled/ConstantsStyle";
import StyledButton from "../components/Styled/StyledButton";
import {randomUniqKey} from "../utilities/utilities"


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
                    getProduct(token, id, setProduct, setMyBids);

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
            setBid(0);
        } else {

        }
    }

    const closeAction = () => {
        const token = getToken();
        if (token) {
            closeProduct(token, id, navigate);
        }

    }


    const productImage = product.imageLink;
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
                    <br/>
                    <img style={{maxWidth: '100px', maxHeight: '100px'}} src={productImage} alt={"green iguana"}/>
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
                    user.id === product.publishUserId && product.openToAction === true && !isAdmin &&

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

            {
                product.openToAction === true && user.id !== product.publishUserId && !isAdmin &&

                <>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Bid Price"
                        variant="outlined"
                        value={bid}
                        onChange={handleBid}
                        sx={{
                            position: "relative",
                            left: "-381px",
                            top: "67px"
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">$</InputAdornment>,
                        }}
                        type={"number"}
                    />

                    <StyledButton
                        variant="contained"
                        sx={{
                            position: "relative",
                            left: "-346px",
                            top: "78px"
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
                            <TableContainer TableContainer component={Paper} sx={tableContainerSX}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell align="center">Bid Price</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {myBids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                            <TableRow
                                                key={randomUniqKey()}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell align="center">{row.userBid}$</TableCell>
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
            }


        </div>
    );
}

export default Product;