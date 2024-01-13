module.exports = {


    get: async function (req,res){
       req.session.destroy()
       res.redirect('/user/home')
    }
}