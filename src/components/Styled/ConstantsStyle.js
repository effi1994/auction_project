
let width = window.innerWidth;

export   const tableContainerSX={
    boxShadow: '5px 5px 20px #ccc',
    padding: 3,
    margin: "auto",
    marginTop: 3,
    maxWidth: width-(width*(1/4)),
    backgroundColor: "rgba(168, 173, 170, 0.28)"
};

export const rowTableLeaguesSX={
    transition:  "0.1s linear",
    opacity: 0.85,
    ":hover": {
        opacity: 1,
        backgroundColor:"rgba(168, 173, 170, 0.05)"
    }
};

export  const globalStyle = {
    "input::-ms-reveal, input::-ms-clear": {
        display: "none"
    }
};

export const boxSX={
    transition: "0.2s ease-in",
    ":hover": {
        boxShadow: '5px 5px 20px #ccc'
    }
}



export const buttonSX = {
    margin: "0 0 0 15px",
    transition: "0.2s ease-in",
    "&:hover": {
        backgroundColor:"rgba(133, 127, 255, 0.36)"
    }
};



export const styledBoxButtonSx={
    marginLeft: 3,
    borderRadius: 3,
    minWidth: 100
};

export  const formControlSx = {
    marginLeft: 3
};

export const allGamesButtonSX = {
    marginTop: 2,
    padding: 2,
    marginLeft: 2,
    borderRadius: 5
};

export  const gamesPageButtonSx = {
    marginRight: 150,
    marginTop: 3,
    borderRadius: 3,

};


 export const addEditGamesPageButtonSx = {
        marginRight: 3,
        marginTop: 3,
        borderRadius: 3,
 };
