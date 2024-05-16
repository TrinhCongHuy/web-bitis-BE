const CouponService = require('../service/CouponService')


// [POST] /create
module.exports.createCoupon = async (req, res) => {
    try {
        const {code, discount, count, description, expireAt} = req.body
        const image = req.file;
        if ( !code, !discount, !count, !description, !expireAt, !image ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }
        const response = await CouponService.createCoupon(
            {
                code,
                discount,
                count,
                description,
                expireAt,
                image: image.path
            }
        )
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PUT] /update-coupon/:id
module.exports.updateCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const { code, discount, count, description, expireAt } = req.body;
        const image = req.file;
        let updateFields = {};

        if (code) updateFields.code = code;
        if (discount) updateFields.discount = discount;
        if (count) updateFields.count = count;
        if (description) updateFields.description = description;
        if (expireAt) updateFields.expireAt = expireAt;
        if (req.file) updateFields.image = req.file.path;
        
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                status: 'ERR',
                message: 'No fields to update'
            });
        }

        const response = await CouponService.updateCoupon(couponId, updateFields);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// // [PATCH] /update-comment/:id
// module.exports.updateCommentPost = async (req, res) => {
//     try {
//         const postId = req.params.id;

//         const response = await PostService.updateCommentPost(postId, req.body);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         });
//     }
// }


// // [GET] /detail/:id
module.exports.detailCoupon = async (req, res) => {
    try {
        const couponId = req.params.id
        
        if (!couponId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The couponId id required'
            })
        }

        const response = await CouponService.detailCoupon(couponId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// // [PATCH] /delete/:id
// module.exports.deletePost = async (req, res) => {
//     try {
//         const postId = req.params.id
        
//         if (!postId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The postId id required'
//             })
//         }

//         const response = await PostService.deletePost(postId)
//         return res.status(200).json(response)
//     }catch(e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// // [PATCH] /delete-many
// module.exports.deleteManyPost = async (req, res) => {
//     try {
//         const postIds = req.body.ids
        
//         if (!postIds) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The postId id required'
//             })
//         }

//         const response = await PostService.deleteManyPost(postIds)
//         return res.status(200).json(response)
//     }catch(e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// // [GET] /
module.exports.listCoupon = async (req, res) => {
    try {
        const response = await CouponService.listCoupon()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
