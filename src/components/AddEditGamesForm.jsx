import React, {useEffect, useState} from 'react';
import StyledBox from "./Styled/StyledBox";
import {Alert, Typography} from "@mui/material";
import GameList from "./GameList";
import StyledButton from "./Styled/StyledButton";
import {objectIsEmpty} from "../utilities/utilities"
import {  getTeamsName } from "../services/teamService"
import { addGame ,updateGameLive,getLiveGames,updateEndGames} from "../services/gameService"
import {getToken, getUser} from "../services/userAtuhService"
import {allGamesButtonSX,gamesPageButtonSx} from "./Styled/ConstantsStyle"
import {toast } from 'react-toastify';




const AddEditGamesForm = (props) => {

    const [userId, setUserId] = useState(null)
    const [teams, setTeams] = useState([])
    const [editGame, setEditGame] = useState({});
    const [games, setGames] = useState([])

    useEffect(() => {
        let currentUser = getUser(getToken());
        setTeams(getTeamsName())
        if (currentUser != null) {
            setUserId(currentUser.id)
        }
        if (props.mode!=1) {
            setGames(getLiveGames())
        }


    },[])

    useEffect(() => {
        if (props.mode==2) {
            setGames(props.liveGames)
        }
    },[props.liveGames])




    const handleSaveAllGamesClick = () => {
        addGame(games)
        setGames([])
    }


    const createGame = (newGame) => {
        let gamesLive=getLiveGames();
        if (!checkIfTeamExistInGames(newGame,gamesLive)) {
            if (!checkIfTeamExistInGames(newGame, games)) {
                newGame.userId = userId
                setGames([...games, newGame])
            }else {
                toast.error("Team already exist in games list")
            }
        }else {
            toast.error("Team already exist in games live")
        }



    }
    const checkIfTeamExistInGames = (game,games) => {
        let teamExist = false
        games.forEach((g) => {
            if (g.homeTeam === game.homeTeam ||
                 g.homeTeam=== game.foreignTeam ||
                g.foreignTeam === game.homeTeam ||
                g.foreignTeam === game.foreignTeam) {
                teamExist = true
                return teamExist;
            }
        })
        return teamExist
    }







    const update = (updatedGame) => {
        const index = games.findIndex(object => {
            return (
                object.session===editGame.session&&
                object.homeTeam===editGame.homeTeam&&
                object.foreignTeam===editGame.foreignTeam&&
                object.goalsForeign===editGame.goalsForeign&&
                object.goalsHome===editGame.goalsHome
            )
        })

        const currentGames=games
        currentGames[index]=updatedGame
        updateGameLive(currentGames[index]);
        if (currentGames[index].live === false) {
                currentGames.splice(index, 1);
        }
            setGames(currentGames)

        setEditGame({})


    }

    const handleRemoveAllGames = () => {
        setGames([])
        setEditGame({})
    }

    const handleRemoveGame = (index) => {

        let clone = [...games]
        clone.splice(index, 1)
        setGames(clone);
        if (games[index] === editGame) {
            setEditGame({})
        }

    }

    const handleEndGames = () => {
        games.map(game => game.live=false);
        updateEndGames(games)
        setGames([]);
    }



    const handleEditGame = (index) => {
        setEditGame(games[index])
        window.scrollTo({
            top: 0,
            behavior: 'smooth',

        })

    }



   return(
       <>
           <StyledButton
               text={"Back"}
               onClick={props.onClick}
               sx={gamesPageButtonSx}
               value={0}
               color={"error"}
               icon={"<"}
           />

           {
               props.mode!=1&&(objectIsEmpty(games) || objectIsEmpty(props.liveGames))?
                   <Alert sx={{marginTop:10}} severity="warning">There is no live games yet</Alert>
                   :
                   <>

                       <Typography variant={"h4"} padding={2} textAlign={"center"} >{props.mode==1 ? objectIsEmpty(editGame)? "Add games" : "Edit game" :"Edit existing games"}</Typography>
                       <StyledBox create={createGame}
                                  update={update}
                                  editGame={editGame}
                                  teams={teams}
                                  mode={props.mode}
                       />
                       {
                           games.length > 0&&
                           <GameList games={games}
                                     teams={teams}
                                     handleRemove={handleRemoveGame}
                                     handleEdit={handleEditGame}
                                     editGame={editGame}
                                     mode={props.mode}
                           />
                       }

                       {
                           games.length > 0 && props.mode==1  &&
                           <>
                               <StyledButton text={"Save all games"}
                                             sx={allGamesButtonSX}
                                             color={"success"}
                                             icon={"v"}
                                             onClick={handleSaveAllGamesClick}
                               />
                               {
                                   props.mode==1&&

                                   <StyledButton text={"Remove all games"}
                                                 sx={allGamesButtonSX}
                                                 color={"warning"}
                                                 icon={"x"}
                                                 onClick={handleRemoveAllGames}

                                   />
                               }
                           </>
                       }

                       {
                           props.mode == 2 &&
                           <StyledButton text={"End All Games "}
                                         sx={allGamesButtonSX}
                                         color={"warning"}
                                         icon={"c"}
                                         onClick={handleEndGames}
                           />

                       }

                   </>
           }

       </>
   )
};

export default AddEditGamesForm;