const localhost = '127.0.0.1'
exports.allUsersUrl = `http://${localhost}:8081/lod/admin/users`
exports.logInByPhoneUrl = `http://${localhost}:8081/lod/user/login/?phoneNumber=`
exports.logInByEmailUrl = `http://${localhost}:8081/lod/user/login/?email=`
exports.pinCodeUrl = `http://${localhost}:4000/data`
exports.allShopUrl = `http://${localhost}:8081/lod/shop/shops`