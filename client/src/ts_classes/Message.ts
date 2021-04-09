export interface Message {
    timestamp: number,
    data: string,
    author: {
        id: string,
    }
}
