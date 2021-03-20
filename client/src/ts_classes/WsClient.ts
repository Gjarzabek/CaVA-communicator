import msgType from './Message';

export default  class WsClient {
    static port: number;
    private ws: WebSocket;

    constructor(userCredits: any) {
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
            const msgData: msgType = message.data;

            switch(msgData.method) {
                default:
                    console.log('got some message', msgData);
                    break;
            }

        };
    }

    close(info: string): void {
        this.ws.close(1000, info);
    }
}