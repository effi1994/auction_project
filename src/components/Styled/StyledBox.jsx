import React, {useEffect, useState} from 'react';
import { Box, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip} from "@mui/material";
import StyledButton from "./StyledButton";
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import VideogameAssetOffRoundedIcon from '@mui/icons-material/VideogameAssetOffRounded';
import {objectIsEmpty} from "../../utilities/utilities";
import {randomUniqKey} from "../../utilities/utilities"
import {styledBoxButtonSx,formControlSx} from "./ConstantsStyle"

const StyledBox = (props) => {
    let width = window.innerWidth;


    const handleNumFieldChange = (e) => {
        let isNum = /^\d+$/.test(e.target.value);
        if (isNum) {
            setGame((prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })))
        }
    }


    const handleTextFieldChange = (e) => {
        setGame((prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        })))
    }


    const sessionMinVal = 1
    const goalsHomeMinVal = 0
    const goalsForeignMinVal = 0


    const initialGame = {
        userId: 1,
        gameSession: 1,
        homeTeam: "",
        foreignTeam: "",
        foreignScore: 0,
        homeScore: 0,
        live: true


    }


    const [game, setGame] = useState(initialGame)

    const handleCheckBoxChange = (e) => {
        setGame((prevState => ({
            ...prevState,
            live: !game.live
        })))
    }


    useEffect(() => {
        if (!objectIsEmpty(props.editGame)) {
            setGame(props.editGame)
        }
        else {
            setGame(initialGame)
        }
    }, [props.editGame]);


    const addNewGame = (e) => {
        e.preventDefault()
        const newGame = {
            ...game
        }
        props.create(newGame)
        setGame(initialGame)
    }

    const updateGame = (e) => {
        e.preventDefault()
        const updatedGame = {
            ...game
        }

        props.update(updatedGame)
        setGame(initialGame)

    }

    return (

        <Box display={"flex"}
             flexDirection={"column"}
             maxWidth={width-(width*(1/4))}
             margin={"auto"}
             justifyContent={"center"}
             marginTop={0}
             borderRadius={3}
             padding={3}
             boxShadow={'5px 5px 10px #ccc'}
             disabled={true}
             sx={{
                 transition: "0.2s ease-in",
                 ":hover": {
                     boxShadow: '5px 5px 20px #ccc'
                 },
                 flexDirection: "row",
             }}
        >
            <FormControl>
                <InputLabel></InputLabel>
                <TextField
                    disabled={ props.mode!=1}
                    sx={{maxWidth:100}}
                    name={"gameSession"}
                    label="Session"
                    type="number"
                    value={game.gameSession}
                    onChange={handleNumFieldChange}
                    InputProps={{ inputProps: { min: sessionMinVal } }}

                />
            </FormControl>

            <FormControl disabled={!objectIsEmpty(props.editGame) }
                         sx={formControlSx}>
                <InputLabel>Home team</InputLabel>
                <Select sx={{width: 150}}
                        name={"homeTeam"}
                        label="Home team"
                        value={game.homeTeam}
                        onChange={handleTextFieldChange}
                        disabled={ !objectIsEmpty(props.editGame)}
                >
                    {

                        props.teams.map((team) => {
                            return(

                                <MenuItem
                                    key={randomUniqKey()}
                                    value={team.nameTeams}
                                    disabled={game.foreignTeam==team.nameTeams}
                                >
                                    {team.nameTeams}
                                </MenuItem>
                            )
                        })
                    }

                </Select>
            </FormControl>


            <FormControl
                disabled={!objectIsEmpty(props.editGame) }
                sx={formControlSx}>
                <InputLabel>Foreign team</InputLabel>
                <Select sx={{width: 150}}
                        label="Foreign team"
                        name={"foreignTeam"}
                        value={game.foreignTeam}
                        onChange={handleTextFieldChange}
                        disabled={ !objectIsEmpty(props.editGame)}
                >

                    {
                        props.teams.map((team) => {
                            return(
                                <MenuItem
                                    key={randomUniqKey()}
                                    value={team.nameTeams}
                                    disabled={game.homeTeam==team.nameTeams}
                                >
                                    {team.nameTeams}
                                </MenuItem>
                            )
                        })
                    }

                </Select>
            </FormControl>

            <FormControl
                sx={formControlSx}>
                <InputLabel></InputLabel>
                <TextField
                    disabled={objectIsEmpty(props.editGame) && props.mode!=1}
                    sx={{maxWidth:150}}
                    id="outlined-number"
                    label="Goals to foreign"
                    type="number"
                    name={"foreignScore"}
                    value={game.foreignScore}
                    InputProps={{ inputProps: { min: goalsForeignMinVal } }}
                    onChange={handleNumFieldChange}
                />
            </FormControl>

            <FormControl
                sx={formControlSx}>
                <InputLabel></InputLabel>
                <TextField
                    disabled={objectIsEmpty(props.editGame) && props.mode !=1 }
                    sx={{maxWidth:150}}
                    id="outlined-number"
                    label="Goals to home"
                    type="number"
                    name={"homeScore"}
                    value={game.homeScore}
                    InputProps={{ inputProps: { min: goalsHomeMinVal } }}
                    onChange={handleNumFieldChange}
                />


            </FormControl>

            {
                props.mode != 1&&
                <Tooltip title={game.live ? "Mark the game as completed": "Mark the game as in live"}>
                    <span>
                        <Checkbox icon={<VideogameAssetRoundedIcon/>}
                        checkedIcon={<VideogameAssetOffRoundedIcon/>}
                        size={"large"}
                        sx={{marginLeft:"auto"}}
                        value={game.live}
                        onChange={handleCheckBoxChange}
                        disabled={objectIsEmpty(props.editGame)}
                        checked={!game.live}
                        />
                    </span>
                </Tooltip>
            }

            {
                objectIsEmpty(props.editGame) && props.mode==1 ?
                    <StyledButton disabled={(game.homeTeam == "" || game.foreignTeam == "") }
                                  text={"Add"}
                                  sx={styledBoxButtonSx}
                                  onClick={addNewGame}
                                  icon={"+"}
                                  color={"secondary"}

                    />
                    :
                    <StyledButton disabled={objectIsEmpty(props.editGame)}
                                  text={"Edit"}
                                  sx={styledBoxButtonSx}
                                  onClick={updateGame}
                                  icon={"/"}
                                  color={"info"}
                    />
            }


        </Box>
    );
};

export default StyledBox;