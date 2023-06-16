import jwt from 'jsonwebtoken'

export default function auth(req,res,next){
    try{
        // tokens are usually not sent in parameters and body
        // they are usually sent in header

        // diff ways
        // Authorization: Bearer <token>
        // x-auth-token: <token>
        const token=req.header('x-auth-token');

        // we created token by encoding user id with secret key
        // now we decode it back

        try{
            const decoded=jwt.verify(token, process.env.SECRET_KEY);
            req.user=decoded.user;
            next();
        }catch(err){
            return res.status(400).send('Invalid token');
        }
    } catch(err){
        console.error(err);
        res.send('Error');
    }
}