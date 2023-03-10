import {useState, useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
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
    TableRow, Tooltip
} from "@mui/material";

import {randomUniqKey} from "../utilities/utilities"
import {getUser} from "../services/userAtuhService";
import {getTable} from "../services/TableMainService";

const HomeTable = (props) => {
    const [user, setUser] = useState({});
    const [mainTableModels, setMainTableModels] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get(config.tokenKey);
        if (token) {
            getTable(token,setMainTableModels);

            getUser(token,setUser);
            if (user.admin){
                console.log("admin")
                console.log(user)
            }else {
                console.log("not admin")
            }

        } else {
            navigate('/login');
        }


    }, [])




    return (
        <div>







        </div>
    )
};

export default HomeTable;