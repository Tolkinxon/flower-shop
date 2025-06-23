import { verifyToken } from"../lib/tokenService.js";

 async function checkToken(token){
    if(!token) return {message: 'Token required', status: false}
    const tokenId = verifyToken(token).id;

    if(!users.some(item => item.id == tokenId)) return {message: 'This user is not available', status: false}
    return {message: 'This user is available', status: 200, id: tokenId }
}

export default checkToken;