interface MsgPayload {
    event: string
}

export default interface msgType {
    method: string,
    payload?: MsgPayload
    info?: string
}