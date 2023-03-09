import React from 'react';
import LeaguesList from "../components/LeaguesList";
import {useEffect, useState} from "react";
import {getLiveGames,liveGamesInDb} from "../services/gameService";


const LiveResults = (props) => {
    const [liveGames, setLiveGames] = useState([]);
    useEffect(() => {

        getLiveGames()
        setLiveGames(liveGamesInDb);
        const interval = setInterval(() => {
            getLiveGames()
            setLiveGames(liveGamesInDb);
        }, 2000);

        return () => clearInterval(interval);

    },[])


    return (
        <>
            <LeaguesList games={liveGames} mode={"result"}/>
        </>
    );
};

export default LiveResults;