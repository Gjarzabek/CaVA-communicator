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

export interface UserData {
    _id: string, 
    name: string,
    email: {
        type: string,
        unique: true
    }
}

export class HttpClient {

    private serverUrl: string;

    constructor() {
        this.serverUrl = "http://localhost:5000";
    }

    login(data: Map<string, string>, loginSucceed: any, loginFailed: any) {
        console.log("login: ",data);
        axios.post(this.serverUrl+"/api/login", {
            email: data.get("email"),
            pass: data.get("pass")
        })
        .then((reponse: any) => {
            console.log("reponse.data.user", reponse.data.user);
            loginSucceed(reponse.data);
        })
        .catch((reason: any) => {
            console.log(reason);
            loginFailed(reason);
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
            registerSucceed();
        })
        .catch((reason) => {
            console.error("error reason", reason);
            registerFailed();
        })
    }

}