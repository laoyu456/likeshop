module.exports = {
    HEADER: {
        'content-type': 'application/json'
    },
	// #ifdef H5
    baseURL: process.env.NODE_ENV == 'production' ? '/api/' : 'http://likeshop.yixiangonline.com/api/',
	// #endif
	// #ifdef MP-WEIXIN
	baseURL: 'http://likeshop.yixiangonline.com/api/'
	// #endif
}