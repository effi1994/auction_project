import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import config from "../config.json";
import {Cookies} from 'react-cookie';
import StyledButton from "../components/Styled/StyledButton";

import {useNavigate} from "react-router-dom";
import {
    Box,
    TextField,
    Typography,
    InputAdornment
} from "@mui/material";

import {boxSX} from "../components/Styled/ConstantsStyle"
import {getUserDetails, updateCreditsUser} from "../services/ManageService";


const UserDetails = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [credits, setCredits] = useState(0);
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
            const admin = cookies.get(config.tokenKeyAdmin);

            if (admin === 'true') {
                if (id){
                    getUserDetails(id, setUser, setCredits);
                }

            } else {
                navigate('/');
            }
        }
        , []);

    const handleChange = (event) => {
        setCredits(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateCreditsUser( credits,id ,navigate);
    };



    return (
        <div>
            <Box sx={boxSX}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Details
                </Typography>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="openActions">Number Open Tenders:</label>
                    <br/>
                    <TextField
                        id="openActions"
                        value={user.openActions}

                        disabled={true}
                    />
                    <br/>
                    <label htmlFor="credits">Credits:</label>
                    <br/>
                    <TextField
                        id="credits"
                        value={credits}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">$</InputAdornment>,
                        }}
                        type="number"
                        fullWidth

                    />
                    <br/>

                    <StyledButton  variant="contained"
                                   sx={{
                                       margin: "10px"

                                   }}
                                   text={"Save"}
                                   icon={"v"}
                                   onClick={handleSubmit}
                                   >
                        Update
                    </StyledButton>
                </form>
            </Box>
        </div>


    );


}
export default UserDetails;