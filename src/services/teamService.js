import {sendApiGetRequest} from "./ApiRequests";
import config from "../config.json";

let urlApi= config.apiUrl;
let teamsName=[];
 export let teams=[];

export const getTeams= () => {
    sendApiGetRequest(urlApi + "/get-all-teams", (response) => {
        if (response.data.success) {
            teams = response.data.teamsObjectList;
            teamsName=response.data.teamsObjectList.map(team=>{
                return {
                    nameTeams:team.nameTeams,
                    id:team.id
                }
            });
            return teams;
        }else {
            teamsName = null;
        }
    })
}


export const getTeamsName = () => {
    return teamsName;
}
