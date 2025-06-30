import pkg from 'jsonwebtoken';
const  { sign, verify } = pkg;
import c from 'config'; 


export const tokenService = {
    createToken: (payload) => sign(payload, c.get('TOKEN_KEY'), {expiresIn: '1d'}),
    verifyToken: (token) => verify(token, c.get('TOKEN_KEY')),
}
