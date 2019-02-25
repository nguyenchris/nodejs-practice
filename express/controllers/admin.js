const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        productCSS: true,
        activeAddProduct: true,
        formsCSS: true,
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    // req.user
    //     .createProduct({
    //         title: title,
    //         price: price,
    //         imageUrl: imageUrl,
    //         description: description
    //     })
    //     .then(result => {
    //         console.log('Created Product');
    //         res.redirect('/admin/products')
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                productCSS: true,
                formsCSS: true,
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    // const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, prodId);

    Product.findById(prodId).then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;
            return product.save()
        })
        .then(result => {
            console.log('Updated Product!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('Deleted product!')
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find()
        // .select('title price')
        // .populate('userId')
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                activeAdminProducts: true,
                hasProducts: products.length > 0,
                productCSS: true
            });
        })
        .catch(err => {
            console.log(err);
        });
};