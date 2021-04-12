import {
	mnpLogin
} from '@/api/app'; //用户是否已经授权
import {
	isWeixinClient,
	currentPage
} from './tools'
import store from '@/store'
import Cache from './cache'
import {
	BACK_URL
} from '@/config/cachekey'
import wechath5 from './wechath5'
import {inputInviteCode} from '@/api/user'

export function isAuthorize() {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					resolve(true);
				} else {
					resolve(false);
				}
			}

		});
	});
}
export function wxgetUserInfo() {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
			lang: 'zh_CN',

			success(res) {
				resolve(res);
			},

			fail(res) {
				resolve(res);
			}

		});
	});
}
// 获取登录凭证（code）

export function getWxCode() {
	return new Promise((resolve, reject) => {
		uni.login({
			success(res) {
				resolve(res.code);
			},

			fail(res) {
				reject(res);
			}

		});
	});
}
//微信授权登录登录 

export function wxLogin(data) {
	return new Promise(resolve => {
		getWxCode().then(code => {
			return mnpLogin({ ...data,
				code
			});
		}).then(res => {
			resolve(res);
		});
	});
}
//授权后自动登录

export function wxAutoLogin() {
	return new Promise(resolve => {
		let code;
		return getWxCode().then(res => {
			code = res;
			return wxgetUserInfo();
		}).then(res => {
			if (!res.userInfo) return;
			let {
				encryptedData: encrypted_data,
				iv
			} = res;
			return mnpLogin({
				encrypted_data,
				iv,
				code
			});
		}).then(res => {
			resolve(res);
			const inviteCode = Cache.get("INVITE_CODE")
			if(inviteCode) {
			    inputInviteCode({
			        code: inviteCode
			    })
			}
		});
	});
}
