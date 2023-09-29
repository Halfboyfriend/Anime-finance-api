const dbClient = require('../storage/db');
const bcrypt = require('bcryptjs');
const {createToken} = require('./jstTokenGenerator');

const salt = bcrypt.genSaltSync(10);

class AuthController{
    static async register(req, res) {
        const {fullname, username, email, country, refId, password} = req.body;

        if(!fullname) {res.status(400).json({error: 'fullname not found'}); }
        if(!username) {res.status(400).json({error: 'username not found'}); }
        if(!email) {res.status(400).json({error: 'email not found'}); }
        if(!password) {res.status(400).json({error: 'password not found'}); }
        if(!country) {res.status(400).json({error: 'username not found'}); }

        const hashedPassword = await bcrypt.hashSync(password, salt);

        //  DATABASE connection
        const collection = await dbClient.db.collection('Users')
        // Check If User alreay exist
        const existUser = await collection.findOne({username: username});
        if(existUser){res.status(400).json({error: 'Username already exist'})}

        //Save in the database
        if(!existUser){
            const newUser = {
                fullname,
                username,
                email,
                country,
                refId,
                password: hashedPassword
            }
            await collection.insertOne(newUser);
            res.status(200).json({'data': `${username} created successfully`});
        }  

    }

    static async login(req, res){
        const {username, password} = req.body;
        if(!username) {res.status(400).json({error: 'username not found'}); }
        if(!password) {res.status(400).json({error: 'password not found'}); }

        // Database connection
        const collection = await dbClient.db.collection('Users');
        const User = await collection.findOne({username: username});
        if(!User){res.status(400).json({error: 'User doesnt exist'})}
        if (User){
             const comparedPassword = await bcrypt.compareSync(password, User.password)
             if(!comparedPassword){res.status(400).json({error: 'Incorrect password'})};
             if(comparedPassword){
                const accessToken = createToken(User);
                res.cookie('access-token', accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                });
                res.status(200).json({'message': 'User logged in succesfully'});
             }
        }

    }
}

module.exports = AuthController;
