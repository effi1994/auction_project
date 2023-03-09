import React, {useEffect, useState} from 'react';
import StyledButton from "../components/Styled/StyledButton";
import AddEditGamesForm from "../components/AddEditGamesForm";
import {getTeams} from "../services/teamService";
import {getLiveGames} from "../services/gameService";
import {addEditGamesPageButtonSx} from "../components/Styled/ConstantsStyle";
const AddEditGamesPage = () => {
    const[mode, setMode] = useState(0)
    const [gameLive, setGameLive] = useState([])

    useEffect(() => {
        getTeams()
    },[])

    useEffect(() => {
        setGameLive(getLiveGames())
    },[getLiveGames()])

    const onClick = () => {

        setMode(0)

    }

    return (
        <>
            {
                mode==0?
                <>
                    <StyledButton text={"Add Games"}
                                  onClick={() => setMode(1)}
                                  sx={addEditGamesPageButtonSx}
                                  value={1}
                                  color={"success"}
                                  icon={"+"}
                    />

                    <StyledButton
                        text={"Edit Games"}
                        onClick={() => setMode(2)}
                        sx={addEditGamesPageButtonSx}
                        value={2}
                        color={"warning"}
                        icon={"/"}
                    />
                </>
                :
                <AddEditGamesForm mode={mode} onClick={onClick} liveGames={gameLive} />
            }



        </>
    )
};

export default AddEditGamesPage;