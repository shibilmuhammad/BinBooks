const customersModel = require('../../models/customers');
module.exports = {
    get: async function (req,res){
        let Allcustomers = await customersModel.find()
        let  customers = Allcustomers.reverse()
        res.render('admin/adminCustomers',{customers})
    },
    getEdit:  async function(req,res){
        let itemId = req.params.customerId;
        let item = await customersModel.findById(itemId)
        res.json({item})
    },postEdit: async function(req,res){
        let customerId = req.body.customerIdForEdit
        const update = {
            name:req.body.nameEdit,
            phone:req.body.phoneEdit,
            email:req.body.emailEdit,
            gender:req.body.genderEdit,
            status:req.body.statusEdit
        }
        let updatedUser = await customersModel.findOneAndUpdate(  { _id: customerId }, 
         update, 
         { new: true } )
        res.redirect('/admin/customers')
    },postSearch: async function (req, res) {
        try {
            const searchValue = req.body.searchValue;
            const isNumeric = !isNaN(searchValue);
               let query;
               if (isNumeric) {
                   query = {
                       $or: [
                           { name: { $regex: new RegExp(searchValue, 'i') } },
                           { email: { $regex: new RegExp(searchValue, 'i') } },
                           { phone: searchValue } 
                       ]
                   };
               } else {
                   query = {
                       $or: [
                           { name: { $regex: new RegExp(searchValue, 'i') } },
                           { email: { $regex: new RegExp(searchValue, 'i') } }
                       ]
                   };
               }
            const customers = await customersModel.find(query);
                res.render('partials/admin/customersTabledata', { customers: customers });
        }catch (error) {
            console.error('Error in postSearch:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    postSort: async function(req,res){
        const sortStatus =req.body.sort
        let  customersinDb = await customersModel.find()
        if(sortStatus=="z-a"){
         let customers =  customersinDb.sort(sortArrayZtoA)
         res.render('partials/admin/customersTabledata', { customers: customers });
        }
        if(sortStatus=="a-z"){
            let customers =  customersinDb.sort(sortArrayAtoZ)
            res.render('partials/admin/customersTabledata', { customers: customers });
        }
        if(sortStatus=="Newest first"){
            let customers =  customersinDb.reverse()
            res.render('partials/admin/customersTabledata', { customers: customers });
        }
        if(sortStatus=="Oldest First"){
            let customers =  customersinDb
            res.render('partials/admin/customersTabledata', { customers: customers });
        } if(sortStatus=="Ascending"){
          
        } if(sortStatus=="Descending"){
          
        }
      },
      postFilter: async function(req,res){
        const filterStatus =req.body.filterValue;

            if(filterStatus =='All'){
            let customersData = await customersModel.find()
            let customers = customersData.reverse()
            res.render('partials/admin/customersTabledata', { customers: customers });
            }else{
                let customers = await customersModel.find({status:filterStatus});
                res.render('partials/admin/customersTabledata',{ customers:customers})
              }
     }

    }

    function sortArrayZtoA(a,b){
      if(a.name < b.name){
        return 1
      }
      if(a.name > b.name){
        return -1
      }
      return 0;
    }
    function sortArrayAtoZ(a,b){
      if(a.name < b.name){
        return-1
      }
      if(a.name > b.name){
        return 1
      }
      return 0;
    }
    