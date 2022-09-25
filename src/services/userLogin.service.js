import {usersDB as db} from '../database/usersDB';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const loginUserService = (email, password) => {
    const user = db.find((e)=>e.email === email);
    if (!user){
        return "Algo errado aconteceu, tente novamente.";
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return "Algo errado aconteceu, tente novamente.";
    };
    const token = jwt.sign({email: email, isAdm:user.isAdm, id:user.id}, "SECRET_KEY", {expiresIn: "24h"});

    return token;
}

export default loginUserService;