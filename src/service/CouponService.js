const Coupon = require("../models/couponModel")

// [POST] /create
module.exports.createCoupon = (newCoupon) => {
    return new Promise(async (resolve, reject) => {
        const {code, discount, count, description, expireAt, image} = newCoupon
        try {
            const createCoupon = await Coupon.create({
                code, discount, count, description, expireAt, image
            })
            if (createCoupon) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createCoupon
                })
            }
        }catch(error) {
            reject(error)
        }
    })
}

// [PUT] /update-coupon/:id
module.exports.updateCoupon = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const coupon = await Coupon.findOne({
                _id: id
            })
            if (!coupon) {
                resolve({
                    status: 'OK',
                    message: 'The post is not defined',
                })
            }
            await Coupon.updateOne(
                {
                    _id: id
                },
                data
            )

            const newCoupon = await Coupon.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newCoupon
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// // [PATCH] /update-comment/:id
// module.exports.updateCommentPost = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Post.findByIdAndUpdate(
//                 {_id: id},
//                 data
//             );

//             const newPost = await Post.findOne({_id: id})

//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: newPost
//             })
            
//         }catch(error) {
//             reject(error)
//         }
//     })
// }

// // [GET] /detailCoupon/:id
module.exports.detailCoupon = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const coupon = await Coupon.findOne({
                _id: id
            })
            if (!coupon) {
                resolve({
                    status: 'OK',
                    message: 'The coupon is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: coupon
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// // [PATCH] /delete/:id
// module.exports.deletePost = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const post = await Post.findOne({
//                 _id: id
//             })
//             if (!post) {
//                 resolve({
//                     status: 'OK',
//                     message: 'The post is not defined',
//                 })
//             }
//             await Post.deleteOne(
//                 {
//                     _id: id
//                 }
//             )

//             resolve({
//                 status: 'OK',
//                 message: 'Delete is success'
//             })
            
//         }catch(error) {
//             reject(error)
//         }
//     })
// }

// // [PATCH] /delete-many
// module.exports.deleteManyPost = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Post.deleteMany(
//                 {
//                     _id: ids 
//                 }
//             )

//             resolve({
//                 status: 'OK',
//                 message: 'Delete is success'
//             })
            
//         }catch(error) {
//             reject(error)
//         }
//     })
// }

// [GET] /
module.exports.listCoupon = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const coupons = await Coupon.find({ deleted: false });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: coupons,
            })
            
        }catch(error) {
            reject(error)
        }
    })
}
