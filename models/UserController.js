class UserController{
    static async app(req, res){
        return res.status(200).json({'succes': 'Welcome to Anime-Finance mining APP'})
    }
}

module.exports = UserController;
