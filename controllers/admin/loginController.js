
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
module.exports = {

    get: function (req,res){
        res.render('admin/adminLogin')
    },post:  async (req, res) => {
        const username = req.body.userName;
        const password = req.body.password.trim()
        try {
          // Find the admin with the provided username
          const admin = await Admin.findOne({ username });
        
          if (admin) {
            // Compare the provided password with the hashed password in the database
            // r
            const passwordMatch = password === admin.password;

        //    let   passwordMatch = false
        //         if(password==admin.password){
        //             passwordMatch = true
        //         }        
            if (passwordMatch) {
            req.session.admin = 'admin logged'
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
              // If credentials match, redirect or perform other actions
              res.redirect('/admin/dashboard');
            } else {
              // If credentials do not match, handle authentication failure
              res.render('admin/adminLogin',{error:'invalid ueernmae or password'})
            }
          } else {
            // If admin not found, handle authentication failure
            res.render('admin/adminLogin',{error:'invalid ueernmae or password'})
          }
        } catch (error) {
          console.error('Error during admin login:', error);
          res.status(500).send('Internal Server Error');
        }
        
      },getLogOut: async function(req,res){
        req.session.destroy();
        res.redirect('/admin/login')
      }
}