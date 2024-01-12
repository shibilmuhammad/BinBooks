const prodectModel = require('../../models/products');
const customerModel = require('../../models/customers')
module.exports = {
    getSearch:async function(req,res){
        const searchTerm = req.query.q;
        const searchResults1 = await prodectModel.find({
            $or: [
              { bookName: { $regex: new RegExp(searchTerm, 'i') } },
              { author:{ $regex: new RegExp(searchTerm, 'i') } },
              { category:{ $regex: new RegExp(searchTerm, 'i') } },
            ],
          })
          const searchResults = searchResults1.sort((a, b) => {
            if (a.bookName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return -1;
            } else if (b.bookName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return 1;
            }
            if (a.author.toLowerCase().includes(searchTerm.toLowerCase())) {
              return -1;
          } else if (b.author.toLowerCase().includes(searchTerm.toLowerCase())) {
              return 1;
          }
            if (a.category.toLowerCase() === searchTerm.toLowerCase()) {
                return -1;
            } else if (b.category.toLowerCase() === searchTerm.toLowerCase()) {
                return 1;
            }
        });
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
        }
          res.render('partials/user/searchResult', { searchResults ,user:res.locals.user})
    }
}