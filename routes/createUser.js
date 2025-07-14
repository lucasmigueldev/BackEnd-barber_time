import express from 'express';
import { auth, db } from '../firebase/firebase.js';

import Ajv from 'ajv';
import {userSchema} from '../schema/userSchema.js';
import addFormats from 'ajv-formats';




const router = express.Router();
const ajv = new Ajv();
addFormats(ajv);
const validateUser = ajv.compile(userSchema);

router.post('/', async (req, res) => {

    const valid = validateUser(req.body);
    if (!valid) {
        return res.status(400).json({ error: 'Dados inválidos', details: validateUser.errors });
    }

    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Campos obrigatórios não podem estar vazios' });
    }

    try {

        const userRecord = await auth.createUser({
            email: email,
            password: password,
            displayName: name
        });

        await db.ref('users/' + userRecord.uid).set({
            name: name,
            email: email,
            createdAt: new Date().toISOString()
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso', userId: userRecord.uid });
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

export default router;