module.exports = {
    HEADER: {
        'content-type': 'application/json'
    },
	// #ifdef H5
    baseURL: process.env.NODE_ENV == 'production' ? '/api/' : 'https://ljtest02.liuziqian.top/api/',
	// #endif
	// #ifdef MP-WEIXIN
	baseURL: 'https://ljtest02.liuziqian.top/api/'
	// #endif
}