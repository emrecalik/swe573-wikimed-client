import axios from "axios";

export const Request = () => axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "http://wikimedserver-env.eba-dxmx23mr.eu-central-1.elasticbeanstalk.com",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});