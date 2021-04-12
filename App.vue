<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		inputInviteCode
	} from '@/api/user'
	import {
		userShare,
		getConfig
	} from '@/api/app'
	import Cache from '@/utils/cache'
	import {
		strToParams
	} from '@/utils/tools'
	export default {
		globalData: {
			navHeight: ""
		},
		onLaunch: function(options) {
			console.log("onLaunch:####", options);
			this.options = options
			// 获取配置
			this.getConfigFun()
			if (this.isLogin) {
				this.getUser()
			}
			// 获取分享
			this.getShareInfo()
			//更新登录次数
			//#ifdef MP-WEIXIN
			this.SETLOGINNUM(0)
			//#endif
			//获取系统信息
			this.getSystemInfo()

		},
		onShow: function() {
			//绑定邀请码
			this.bindCode(this.options)
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['SETLOGINNUM', 'SETCONFIG']),
			...mapActions(['getUser']),
			getSystemInfo() {
				uni.getSystemInfo({
					success: res => {
						let {
							statusBarHeight,
							platform
						} = res;
						let navHeight;

						if (platform == 'ios' || platform == 'devtools') {
							navHeight = statusBarHeight + 44;
						} else {
							navHeight = statusBarHeight + 48;
						}
						this.globalData.navHeight = navHeight;

					},
					fail(err) {
						console.log(err);
					}

				});
			},
			async getShareInfo() {
				const {
					code,
					data
				} = await userShare()
				if (code == 1) {
					Cache.set('shareInfo', data)
				}

			},
			async getConfigFun() {
				const {
					code,
					data
				} = await getConfig()
				if (code == 1) {
					this.SETCONFIG(data)
				}
			},
			bindCode(options) {
				let invite_code = options.query.invite_code || strToParams(decodeURIComponent(options.query.scene)).invite_code
				if (invite_code) {
					if (this.isLogin) {
						inputInviteCode({
							code: invite_code
						})
					} else {
						Cache.set("INVITE_CODE", invite_code)
					}
				}
			}
		}
	}
</script>

<style lang='scss'>
	@import 'styles/base.scss';
	/*每个页面公共css */
	@import "components/uview-ui/index.scss";
</style>
