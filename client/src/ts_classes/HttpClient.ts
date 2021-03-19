import axios from 'axios';

export interface LoginData {
    email: string,
    pass: string
}

export interface RegisterData {
    name: string,
    email: string,
    pass: string
}

export class HttpClient {

    private serverUrl: string;

    constructor() {
        this.serverUrl = "http://localhost:5000";
    }

    login(data: Map<string, string>) {
        console.log("login: ",data);
        axios.post(this.serverUrl+"/api/login", {
            email: data.get("email"),
            pass: data.get("pass")
        })
        .then((reponse) => {
            console.log("reponse:", reponse);
        })
        .catch((reason: any) => {
            console.error("error reason", reason);
        })
    }

    register(data: Map<string, string>, registerSucceed: any, registerFailed: any) {
        console.log("register: ", data);
        axios.post(this.serverUrl+"/api/register", {
            email: data.get("email"),
            name: data.get("nazwa"),
            pass: data.get("pass")
        })
        .then((reponse) => {
            console.log("reponse:", reponse);
            registerSucceed(reponse.status);
        })
        .catch((reason) => {
            console.error("error reason", reason);
            registerFailed(reason);
        })
    }

}