export default (color: string, percent: number): string => {

    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    const p: number = (100 + percent) / 100;

    R = parseInt(String(R * p));
    G = parseInt(String(G * p));
    B = parseInt(String(B * p));

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    const RR: string = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    const GG: string = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    const BB: string = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}