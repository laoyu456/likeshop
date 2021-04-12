
import {
	mapGetters,
	mapMutations
} from 'vuex'
import wechath5 from '@/utils/wechath5'

import {isWeixinClient, currentPage, paramsToStr} from '@/utils/tools'
import Cache from "@/utils/cache"
import {inputInviteCode} from "@/api/user"
import {BACK_URL} from '@/config/cachekey'
export default {
	data() {
		return {
            primaryColor: "#FF2C3C"
		};
	},
	async onLoad(option) {
		const route = currentPage().route
		if(!['pages/login/login', 'pages/forget_pwd/forget_pwd', 'pages/register/register'].includes(route)) {
			Cache.set(BACK_URL, `/${route}${paramsToStr(option)}`)
		}
		console.log(this.$store.getters.inviteCode)
		// #ifdef H5
		if (isWeixinClient()) {
			
			await wechath5.config()
			setTimeout(() => {
				this.wxShare()
			}, 500)
		}
		// #endif
	},
	methods: {
		wxShare(options) {
			const shareInfo = Cache.get("shareInfo")
			const sym = window.location.href.includes('?') ? '&' : '?'
			const option = {
				shareTitle: "100%开源免费商用电商系统",
				shareLink: window.location.href + sym + "invite_code=" + this.$store.getters.inviteCode,
				shareImage: "",
				shareDesc: "likeshop已经把小程序、安卓APP、苹果APP都免费开源出来了"
			}
            if(!options) {
				if(shareInfo) {
					option.shareImage = shareInfo.h5_share_image
					option.shareTitle = shareInfo.h5_share_title
					option.shareDesc = shareInfo.h5_share_intro
				}
                wechath5.share( option)
            } else {
                wechath5.share(options)
            }
		}
	},
	computed: {
		...mapGetters(['isLogin', 'loginNum']),
	}
};
