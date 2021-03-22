import msgType from './Message';

export default  class WsClient {
    static port: number;
    static userData: any;
    private ws: WebSocket;

    constructor(userCredits: any,
        userSetupCallback: any,
        newAlert: any
        ) {
        WsClient.port = 8999;

        this.ws = new WebSocket(`ws://localhost:${WsClient.port}/${userCredits.token}`);

        this.ws.onopen = () => {
            console.log("websocket connected");
        }

        this.ws.onclose = (ev: CloseEvent) => {
            if (ev.reason === undefined || ev.reason === "" || ev.reason === "appClosed") { 
                console.log("Ws connection closed");
                return;
            }
            const msgData: msgType = JSON.parse(ev.reason);
            if (msgData.method === "ERROR") {
                console.log('Ws connection closed, ERROR:', msgData.info);
            }
        }

        this.ws.onmessage = (message: any) => {
            const msgData: any = JSON.parse(message.data);
            console.log("msg.method=",msgData.method);
            switch(msgData.method) {
                case 'loginPayload':
                    userSetupCallback(msgData.payload);
                    break;

                case 'Alert':
                    newAlert(msgData.payload);
                    break;

                default:
                    console.log('got some message', msgData);
                    break;
            }

        };
    }

    close(info: string, userId: any): void {
        const payload = {method:'close', id: userId};
        this.ws.send(JSON.stringify(payload));
        this.ws.close(1000, info);
    }

    send(payload: any) {
        this.ws.send(JSON.stringify(payload));
    }
}