import React, {useEffect, useState}  from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {tableContainerSX} from "./Styled/ConstantsStyle"
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


const GameList = (props) => {

    const [editIndex, setEditIndex] = useState(-1)

    useEffect(() => {
        if ((Object.keys(props.editGame).length === 0)) {
            setEditIndex(-1)
        }

    },[props.editGame])



    return (
       <>

           <TableContainer sx={tableContainerSX}
                component={Paper}
           >
               <Table  sx={{ minWidth: 650}} aria-label="simple table">
                   <TableHead>
                       <TableRow>
                           <TableCell align="center">Session</TableCell>
                           <TableCell align="center">Home team</TableCell>
                           <TableCell align="center">Foreign team</TableCell>
                           <TableCell align="center">Goals to foreign</TableCell>
                           <TableCell align="center">Goals to Home</TableCell>
                           <TableCell align="center">Ended</TableCell>
                           <TableCell align="right"/>
                           {
                               props.mode==1&&
                               <TableCell align="right"/>
                           }
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {props.games.map((game, index) => (
                           <TableRow sx={{
                               backgroundColor: editIndex==index ? "rgba(132, 159, 219, 0.44)": "",
                               transition:  "0.1s linear",
                               opacity: 0.85,
                               ":hover": {
                                   backgroundColor: editIndex!=index ? "rgba(168, 173, 170, 0.05)" : "",
                                   opacity: 1
                               },
                           }}
                               key={randomUniqKey()}
                           >

                               <TableCell align="center">{game.gameSession}</TableCell>
                               <TableCell align="center">{game.homeTeam}</TableCell>
                               <TableCell align="center">{game.foreignTeam}</TableCell>
                               <TableCell align="center">{game.foreignScore}</TableCell>
                               <TableCell align="center">{game.homeScore}</TableCell>
                               <TableCell align="center">{!game.live ? "Yes" : "No"}</TableCell>
                               {
                                   props.mode == 1&&
                                   <TableCell align={"right"}>
                                       <Tooltip title={"Delete game"}>
                                           <span>
                                               <IconButton
                                                    onClick={() => props.handleRemove(index)}
                                                    color={"error"} aria-label="delete"
                                               >
                                                    <DeleteIcon/>
                                               </IconButton>
                                           </span>
                                       </Tooltip>
                                   </TableCell>
                               }
                               <TableCell align={props.mode==1 ? "left" : "center"}>
                                   <Tooltip title={"Edit game"}>
                                       <span>
                                           <IconButton
                                               disabled={editIndex >= 0}
                                               value={editIndex}
                                               onClick={() => {
                                                   setEditIndex(index)
                                                   props.handleEdit(index)
                                               }}
                                               color={"info"} aria-label="edit">
                                           <EditIcon />
                                       </IconButton>
                                       </span>
                                   </Tooltip>
                               </TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>

       </>
    )
}

export default GameList;