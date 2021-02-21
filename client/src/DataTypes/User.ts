/*export obj = {
    type User = {
    nick: string,
    status: string,
    id: number
};
*/
export function getStatusPoint(status: string): number {
    switch(status) {
        case 'online':
            return 0;
        case 'brb':
            return 1;
        case 'offline':
            return 2;
        default:
            return -1;
    }
};