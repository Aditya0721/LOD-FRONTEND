const localhost = '127.0.0.1'

exports.allUsersUrl = `http://${localhost}:8081/lod/admin/users`
exports.logInByPhoneUrl = `http://${localhost}:8081/lod/user/login/?phoneNumber=`
exports.logInByEmailUrl = `http://${localhost}:8081/lod/user/login/?email=`
exports.pinCodeUrl = `http://${localhost}:4000/data`
exports.allShopUrl = `http://${localhost}:8081/lod/shop/shops`
exports.fetchProductByBrandAndTypeUrl = `http://${localhost}:8081/lod/product/products`
exports.addProductToMenuUrl = `http://${localhost}:8081/lod/shop/menu/add/`
exports.updateProductInMenuUrl = `http://${localhost}:8081/lod/shop/menu/update/`
exports.getUsersShop = `http://${localhost}:8081/lod/shop/shops/`
exports.registerUrl = `http://${localhost}:8081/lod/user/signup`
exports.getUserByPhoneUrl = `http://${localhost}:8081/lod/user/`
exports.createShopRequestUrl = `http://${localhost}:8081/lod/admin/shopRequest/A89431`
exports.getShopRequestsUrl = `http://${localhost}:8081/lod/admin/fetchRequests`
exports.closeRequestUrl = `http://${localhost}:8081/lod/admin/closeRequest/`
exports.updateShopStatusUrl = `http://${localhost}:8081/lod/shop/updateStatus/`
exports.updateCartUrl = `http://${localhost}:8081/lod/user/updateCart/`