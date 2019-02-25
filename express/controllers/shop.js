const Product = require('../models/product');


exports.getIndex = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getProducts = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                hasProducts: products.length > 0,
                activeProducts: true,
                productCSS: true
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            console.log(product)
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                activeProducts: true
            });
        })
        .catch(err => {
            console.log(err);
        })
};


exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            console.log(products)
            res.render('shop/cart', {
                activeCart: true,
                path: '/cart',
                pageTitle: 'Your Cart',
                hasProducts: products.length > 0,
                products: products
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product
        .findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart')
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                activeOrders: true,
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
                hasOrders: orders.length > 0
            });
        })
        .catch(err => console.log(err))
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
};