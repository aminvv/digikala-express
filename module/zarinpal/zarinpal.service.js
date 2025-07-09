const { default: axios, create } = require("axios");
const { config } = require("dotenv");
const createHttpError = require("http-errors");
config()
async function zarinpalRequest(amount, user) {
    const result = axios.post(process.env.ZARINPAL_REQUEST_URL, {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount,
        callback_url: process.env.ZARINPAL_CALLBACK_URL,
        description: "Transaction description.",
        metadata: {
            mobile: user?.mobile,
            email: "info.test@example.com"
        }
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then(res => res.data).catch(err => {
        console.log(err);
    })
    if (result?.data?.Authority) {

        return {
            payment_url: `${process.env.ZARINPAL_GATEWAY_URL}/${result.data.authority}`,
            authority:result?.data?.Authority,
        }
    } else {
        throw create(400, "zarinpal service not available")
    }
}







async function zarinpalVerify(amount, authority) {
    const result = axios.post(process.env.ZARINPAL_VERIFY_URL, {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        authority,
        amount,
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then(res => res.data).catch(err => {
        console.log(err);
    })
    if (result?.data?.code == 100) {
        return true
    } else if (result?.data?.code == 101) {
        throw createHttpError(409, "Already verified payment")
    } else {
        throw createHttpError(500, " some thing  is wang")
    }
}


module.exports = {
    zarinpalRequest,
    zarinpalVerify,
}