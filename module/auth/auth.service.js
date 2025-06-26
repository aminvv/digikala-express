const { User, Otp } = require("../user/model/user.model")

async function sendOtp(req, res, next) {
 try {
    const { mobile } = req.body;

    const code = (Math.floor(10000 + Math.random() * 90000)).toString(); // ۵ رقمی و رشته
    const expires_in = 2 * 60; // ۲ دقیقه

    let user = await User.findOne({ where: { mobile } });
    let otp;

    if (!user) {
      user = await User.create({ mobile });

      otp = await Otp.create({
        code,
        expires_in,
        userId: user.id
      });

    } else {
      otp = await Otp.findOne({ where: { userId: user.id } });

      if (otp) {
        otp.code = code;
        otp.expires_in = expires_in;
        await otp.save();
      } else {
        otp = await Otp.create({
          code,
          expires_in,
          userId: user.id
        });
      }
    }

    return res.json({
      message: "send otp code successfully",
      code
    });



    } catch (error) {
        console.log(error);
        next(error)
    }
}



module.exports = {
    sendOtp
}