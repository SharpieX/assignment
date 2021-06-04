const express = require('express');
const Product = require('./../models/Product');
const router = express.Router();
const authorize = require("../middlewares/auth");

const escapeRegex = (string) => {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.route('/')
    .post(authorize, function (req, res) {
        let products = new Product();
        products.name = req.body.name;
        products.price = req.body.price;
        products.quantity = req.body.quantity;
        products.description = req.body.description;
        products.created_by = req.user.userId;

        //response
        products.save(function (error) {
            if (error)
                res.status(500).send('Failed to register new product. ERROR: ' + error);
            res.json({message: "product successfully registered"});
        });
    })

    .get(authorize, async function (req, res) {
        const { page = 1} = req.query;
        const  limit = 20;

        try {
            const products = await Product.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort('name')
                .exec();

            const count = await Product.countDocuments();

            res.json({
                products,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (err) {
            res.status(500).send("Failed to show products. ERROR: " + err.message);
            console.error(err.message);
        }
    });
router.route('/search')
    .get(authorize, async function (req, res) {
        const { page = 1, query} = req.query;
        const  limit = 20;
        try {
            //{$text: {$search: query}}
            const regex = new RegExp(escapeRegex(query), 'gi');
            const products = await Product.find({name:regex})
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort('-name')
                .exec();

            const count = await Product.count({name:regex});

            res.json({
                products,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (err) {
            res.status(500).send("Failed to show products. ERROR: " + err.message);
            console.error(err.message);
        }
    });



router.route('/:product_id')
    .get(authorize, function (req, res) {
        Product.findById(req.params.product_id, function (error, product) {
            if (error)
                res.status(500).send('error: ' + error);
            res.json(product);
        })
    })

    .put(authorize, function (req, res) {
        Product.findById(req.params.product_id, function (error, product) {
            if (error)
                res.send('error: ' + error);
            //update attributes of the product with req fields
            product.name = req.body.name;
            product.price = req.body.price;
            product.quantity = req.body.quantity;
            product.description = req.body.description;
            if (req.user.userId !== product.created_by.toString()) {
                res.status(403).send("You can update products only created by you");
            }
            //save
            product.save(function (error) {
                if (error)
                    res.status(500).send('Failed to update product. ERROR: ' + error);
                res.json({message: 'Product update successful!'});
            });
        });
    })

    .delete(authorize, function (req, res) {
        Product.deleteOne({
            _id: req.params.product_id,
            created_by: req.user.userId
        }, function (error, response) {
            if (error || response.deletedCount === 0)
                res.status(500).send('Unable to find product by id. Failed to remove.');

            res.json({message: 'Product deleted successful!'});
        });
    });

//export
module.exports = router;