const User = require('../models/UserModel')


// [GET] /auth/register
module.exports.upsertUserSocialMedia = async (typeAcc, dataRaw) => {
    try {
        let user = null
        user = await User.findOne(
            {
                email: dataRaw.email,
                type: typeAcc
            }
        )
        if (!user) {
            user = new User({
                name: dataRaw.fullName,
                email: dataRaw.email,
                type: typeAcc,
                avatar: dataRaw.avatar,
            })
            await user.save()
        } 
        return user
    }catch(error) {
        console.log(error)
    }
}