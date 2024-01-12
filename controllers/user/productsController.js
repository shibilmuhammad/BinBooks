const prodectModel = require('../../models/products');
const customerModel = require('../../models/customers')
module.exports = {
    get: async function (req, res) {
        categoryName = req.params.categoryName;
        let products = await prodectModel.find({ category: categoryName });
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
        }
        res.render('user/products', { products, categoryName ,user:res.locals.user});
    },

    filterPost: async function (req, res) {
        const { priceRange, condition, discount } = req.body;

        const query = {};

        if (priceRange) {
            if (Array.isArray(priceRange) && priceRange.length > 0) {
                query.$or = priceRange.map(data => {
                    const [minPrice, maxPrice] = data.split('-');
                    return { salePrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } };
                });
            } else {
                const [minPrice, maxPrice] = priceRange.split('-');
                query.salePrice = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
            }
        }
        if (condition) {
            query.condition = condition;
        }
        if (discount) {
            if (Array.isArray(discount) && discount.length > 0) {
                query.$or = discount.map(data => {
                    return { discount: { $gte: parseInt(data) } };
                });
            } else {
                query.discount = { $gte: parseInt(discount) };
            }
        }
        try {
            const searchResults = await prodectModel.find({ category: categoryName, ...query });
            res.render('partials/user/searchResultInnerData.ejs', { searchResults });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
};
