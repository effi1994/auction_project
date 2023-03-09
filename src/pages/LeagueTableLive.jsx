import React from 'react';
import {useEffect, useState} from "react";
import { calculateTableLeagueLive, tableLeagueLive} from "../services/CalculationTableService";
import {getTeams} from "../services/teamService";
import {getAllGames,liveGamesInDb,getLiveGames} from "../services/gameService";
import  LeaguesList from "../components/LeaguesList";
import {Alert} from "@mui/material";

const LeagueTableLive = () => {
    const [lifeTable,setLifeTable] = useState([]);

    useEffect(()=>{
        getTeams();
        getLiveGames();
        getAllGames();
        calculateTableLeagueLive();
        setLifeTable(tableLeagueLive);
        const interval = setInterval(() => {
            getTeams();
            getLiveGames();
            getAllGames();
            calculateTableLeagueLive();
            setLifeTable(tableLeagueLive);
        }, 1000);
        return () => clearInterval(interval);
    },[])

    return (
        <div>
            {
                liveGamesInDb.length > 0 ? <LeaguesList leagues={lifeTable} mode={"leagueTable"}/> :
                    <Alert sx={{marginTop:10}} severity="warning">There is no live games yet</Alert>

            }
        </div>
    );


};

export default LeagueTableLive;