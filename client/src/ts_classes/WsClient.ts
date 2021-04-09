export default  class WsClient {
    static port: number;
    static userData: any;
    private ws: WebSocket;

    constructor(userCredits: any, Callbacks: any) {

        WsClient.port = 8999;
        interface ServerEvent {
            method: string,
            payload: any,
            info?: string
        };


        this.ws = new WebSocket(`ws://localhost:${WsClient.port}/${userCredits.token}`);

        this.ws.onopen = () => {
            console.log("websocket connected");
        }

        this.ws.onclose = (ev: CloseEvent) => {
            if (ev.reason === undefined || ev.reason === "" || ev.reason === "appClosed") { 
                console.log("Ws connection closed");
                return;
            }
            const msgData: ServerEvent = JSON.parse(ev.reason);
            if (msgData.method === "ERROR") {
                console.log('Ws connection closed, ERROR:', msgData.info);
            }
            //TODO - send 'close' uri to set status on server to niedostpeny
        }

        this.ws.onmessage = (message: any) => {
            const msgData: ServerEvent = JSON.parse(message.data);
            console.log("msg", msgData);
            switch(msgData.method) {
                case 'loginPayload':
                    Callbacks.setupUser(msgData.payload);
                    break;

                case 'Alert':
                    Callbacks.newAlert(msgData.payload);
                    break;

                case 'newFriend':
                    Callbacks.newFriend(msgData.payload);
                    break;

                case 'friendStatusUpdate':
                    Callbacks.friendStatusUpdate(msgData.payload);
                    break;

                case 'friendInfoUpdate':
                    if (msgData.payload.status) {
                        Callbacks.friendStatusUpdate(msgData.payload);
                    }
                    else {
                        Callbacks.friendInfoUpdate(msgData.payload);
                    }
                    break;
                
                case 'newChat':
                    Callbacks.newChat(msgData.payload);
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