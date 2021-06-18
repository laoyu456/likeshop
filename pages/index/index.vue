<template>
	<view class="index">
		<view class="header">
			<u-sticky offset-top="0" h5-nav-height="0">
				<view class="navigation-bar bg-primary row" :style="{height: navHeight + 'px'}">
					<image mode="heightFix" class="logo ml20" :src="logo"></image>
				</view>
				<!--<view class="city-box">4444</view>-->
				<view class="big-box">
					 <view class="city-box sec-box">
						 <navigator hover-class="none" url="/pages/city/city">
							<image style="width:30upx;height:30upx;vertical-align:middle;" src="../../static/images/d-w.png" />  <text style="padding-left:5upx;">{{city}}</text>  
						 </navigator>
					 </view>
					 <view class="search-box sec-box">
						 <navigator class="search" hover-class="none" url="/pages/goods_search/goods_search">
						 	 <u-search bg-color="#fff" wrap-bg-color="#FF2C3C" :disabled="true"></u-search>
						 </navigator>
					 </view>
				</view>
				
			</u-sticky>
		</view>
		<view class="contain">
			<!--<view class="top-bg">
				
				<image v-for="(list,index) in adList" :key="index" :src="list.image"></image>
			</view>-->
			<!-- banner -->
			<swiper class="swiper banner" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item class="banner" v-for="(item,index) in adList" :key="index">
					   <image :src="item.image" class="banner" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="main">
				 <bubble-tips top="50rpx" :discharge="isDischarge"></bubble-tips>
				<swipers :pid="2" height="284rpx" padding="20rpx"></swipers>
				<!-- 导航入口 -->
				<view class="nav bg-white" v-if="navList.length">
					<swiper :style="'height:' + navSwiperH + 'rpx;'" @change="swiperChange">
						<swiper-item v-for="(items, index) in navList" :key="index">
							<view class="nav-list row wrap">
								<view v-for="(item, index2) in items" :key="index2" @tap="tapMenu(item)" class="nav-item column-center">
									<image class="nav-icon" :src="item.image"></image>
									<view class="name xs">{{item.name}}</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="dots" v-if="navList.length > 1">
						<view v-for="(item, index) in navList" :key="index" :class="'dot ' + (index == currentSwiper ? 'active' : '')"></view>
					</view>
				</view>
				<!-- 资讯 -->
				<navigator v-if="news.length" class="information bg-white row" hover-class="none" open-type="navigate" url="/pages/news_list/news_list">
					<image class="icon-toutiao" src="/static/images/icon_toutiao.png"></image>
					<text class="gap-line"></text>
					<view class="news flex1">
						<view class="shade"></view>
						<swiper autoplay="true" style="height: 76rpx; flex: 1" vertical="true" circular="true" :interval="3000">
							<swiper-item v-for="(item, index) in news" :key="index" class="row">
								<view class="flexnone"><u-tag v-if="item.is_new" shape="circle" text="最新" size="mini" type="primary" mode="plain" /></view>
								<view class="text-swiper ml10 line1">{{item.title }}</view>
							</swiper-item>
						</swiper>
					</view>
					<image class="icon-sm ml20" src="/static/images/arrow_right.png" />
				</navigator>
				<!-- 领卷 -->
				<view class="mt20 hide">
					<home-coupon class="mt20" :list="coupon" @reflash="getHomeFun"></home-coupon>
				</view>
				<!-- 活动专区 -->
				<!--<view class="special-area row  " v-if="activityArea.length">
					<navigator v-for="(item, index) in activityArea" :key="index" hover-class="none" class="area-item column-center" :url="'/pages/bundle/activity_detail/activity_detail?id=' + item.id + '&title=' + item.name + '&name=' + item.title">
						<view class="mb10 flex1">
							<view class="bold lg">{{item.name}}</view>
							<view :style="'color: ' + colors[index%colors.length]" class="mt10 xs desc">{{item.title}}</view>
						</view>
						<custom-image width="130rpx" height="130rpx" :src="item.image"></custom-image>
					</navigator>
				</view>-->
				<!-- 秒杀 -->
				<view class="seckill mt20 hide" v-if="seckillGoods.length">
					<active-area extClass="seckill" progressBarColor="#FF2C3C" :lists="seckillGoods">
						<navigator slot="header" hover-class="none" class="row activity-header white" open-type="navigate" url="/pages/bundle/goods_seckill/goods_seckill">
							<view class="title xxl bold">超值秒杀</view>
							<text class="white xs ml10 line1" style="flex:1">超值好物 限时秒杀</text>
							<view class="dec ml20 row-center mr20 br60">
								<u-count-down :timestamp="remainTime" separator-color="#FF2C3C" color="#FF2C3C" :separator-size="24" :font-size="24"
								 bg-color="transparent"></u-count-down>
							</view>
							<view class="row xs">
								更多
								<u-icon name="arrow-right" size="28"></u-icon>
							</view>
						</navigator>
					</active-area>
				</view>
				<!-- 热销 -->
				<view class="hot mt20 hide" v-if="hotGoods.length">
					<active-area extClass="hot" progressBarColor="#9912FE" :lists="hotGoods">
						<navigator slot="header" hover-class="none" class="row activity-header white" open-type="navigate" url="/pages/bundle/hot_list/hot_list">
							<view class="title xxl bold">热销榜单</view>
							<view style="flex:1" class="ml20 xs">实时更新热销火爆商品</view>
							<view class="row xs">
								更多
								<u-icon name="arrow-right" size="28"></u-icon>
							</view>
						</navigator>
					</active-area>
				</view>
				<!-- 新品推荐 -->
				<view v-if="newGoods.length" class="goods" style="margin: 0 20rpx;">
					<view class="goods-title row-center">
						<text class="line"></text>
						<view class="row">
							<image class="mr10 icon" src="/static/images/icon_new_recommend.png"></image>
							<text class="bold xxl">新品推荐</text>
						</view>
						<text class="line"></text>
					</view>
					<goods-list type="new" :list="newGoods"></goods-list>
				</view>
				<!-- 好物优选 -->
				<view class="goods mt20" v-if="goodsList.length">
					<view class="goods-title row-center">
						<text class="line"></text>
						<view class="row">
							<image class="mr10 icon" src="/static/images/icon_like.png"></image>
							<text class="bold xxl">好物优选</text>
						</view>
						<text class="line"></text>
					</view>
					<goods-list :list="goodsList"></goods-list>
					<loading-footer :status="status"></loading-footer>
				</view>
			</view>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger" @fabClick="fabClick" />
		 <!--mydev start-->
		    <u-popup v-model="showPram" mode="bottom" border-radius="14">
		    	<view>
		    		<view class="row-between" style="padding: 30rpx;">
		    			<view class="title md bold" style="text-align:center;">微信号</view>
		    			<view class="close" @tap="showPram = false">
		    				<image class="icon-lg" src="/static/images/icon_close.png"></image>
		    			</view>
		    		</view>
		    		<view class="content bg-body">
		    			 <image :src="config_info.image" mode="aspectFit" show-menu-by-longpress="true" />
						 <view class="wechat-box">微信号：{{config_info.wechat}}</view>
		    		</view>
		    	</view>
		    </u-popup>
		 <!--mydev end-->
		 <!--mydev start-->
		    <u-popup v-model="showKf" mode="bottom" border-radius="18">
		    	<view>
		    		<view class="row-between" style="padding: 30rpx;">
		    			<view class="title md bold" style="text-align:center;">客服电话</view>
		    			<view class="close" @tap="showKf = false">
		    				<image class="icon-lg" src="/static/images/icon_close.png"></image>
		    			</view>
		    		</view>
		    		<view class="content bg-body bg-phone-body">
		    			 <view class="row-white" v-for="(phone,index) in config_info.phone">
		    			      <view class="xs" style="line-height: 49px;">{{phone}}</view>
		    			      <!-- #ifdef H5 -->
		    			      <a class="ml10 phone-btn xs row-center white" :href="'tel:' + phone">拨打</a>
		    			      <!-- #endif -->
		    			      <!-- #ifdef MP-WEIXIN -->
		    			      <a class="ml10 phone-btn xs row-center " @click="showTelTips(phone)">拨打</a>
		    			      <!-- #endif -->
		    			      <view class="ml5 copy-phone-btn xs row-center" @click="onCopy(phone)">复制</view>
		    			  </view>
		    		</view>
		    	</view>
		    </u-popup>
			<u-modal
			:content="phone_content"
			v-model="showPhoneCall"
			show-cancel-button
			confirm-text='呼叫'
			:confirm-color="primaryColor"
			@confirm="onCall"
			>
			</u-modal>
		 <!--mydev end-->
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		getHome,
		getMenu,
		getBestList
	} from '@/api/store';
	import {
		loadingType
	} from '@/utils/type'
	import {
		loadingFun,
		menuJump,
		arraySlice,
		copy
	} from '@/utils/tools'
	import {
		showLoginDialog
	} from '@/utils/wxutil'
	import {
		uniFab
	} from '@/components/uni-fab/uni-fab.vue'
	import {
		getConfig
	} from '@/api/app'
	import Cache from '@/utils/cache'
	const app = getApp()
	export default {
		components:{
			uniFab
		},
		data() {
			return {
				navSwiperH: 374,
				logo: "",
				navHeight: 0,
				currentSwiper: 0,
				colors: ["#FE41B7", "#FA444D", "#BD5AFF", "#FB831C", "#2DC1B9"],
				page: 1,
				status: loadingType.LOADING,
				remainTime: "",
				navList: [],
				news: [],
				goodsList: [],
				adList:[],
				seckillGoods: [],
				hotGoods: [],
				newGoods: [],
				activityArea: [],
				showCoupop: false,
				couponPopList: [],
				coupon: [],
				isDischarge: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				city:'',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
				},
				content: [{
						iconPath: 'dianhua',
						 
						text: '电话',
						active: false
					},
					
					{
						iconPath: 'kefu1',
						
						text: '客服',
						active: false
					},
					{
						iconPath: 'weixin',
						 
						text: '微信',
						active: false
					}
				],
				showPram:false,
				showKf:false,
				config_info:{},
				showPhoneCall: false,
				phone:"",
				phone_content: '即将打电话给'
			}
		},
		async onLoad(options) {
			var city=uni.getStorageSync("city");
			var that=this;
			if(city){
				this.city=city;
			}else{
				//定位获得实时位置
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						uni.request({
						   header:{
						    "Content-Type": "application/text"
						   },
						   //注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
						   url:'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location='+res.longitude+','+res.latitude+'&key=280802ed0116fef931dbcf5e7e9278d7&radius=1000&extensions=all',
						   success(re) {
						    //console.log(re)
						    if(re.statusCode===200){
						     that.city=re.data.regeocode.addressComponent.district;
							 uni.setStorageSync("city",that.city);
						    }else{
						     console.log("获取信息失败，请重试！")
						    }
						    }
						  });
				
					}
				});
			}
			this.navHeight = app.globalData.navHeight
			this.isDischarge = false;
			await this.getMenuFun()
			this.getBestListFun()
		},
		onShow() {
			var city=uni.getStorageSync("city");
			if(city){
				this.city=city;
			}
			this.getHomeFun()
			this.getCartNum()
			getConfig().then(res=>{
				//console.log(res,"-----res----res---");
				if(res.code == 1) {
				    this.config_info = res.data
				}
			})
		},
		onReachBottom() {
			this.getBestListFun()
		},
		onPullDownRefresh() {
			this.getHomeFun()
			this.getMenuFun()
		},
		onShareAppMessage() {
			console.log(this.inviteCode)
			const shareInfo = Cache.get('shareInfo')
		      return {
		        title:  shareInfo.mnp_share_title,
		        path: "pages/index/index?invite_code=" + this.inviteCode
		      };
		},
		destroyed() {
			this.isDischarge = true;
		},
		methods: {
			...mapActions(['getCartNum']),
			async getHomeFun() {
				const {
					code,
					data
				} = await getHome();
				uni.stopPullDownRefresh()
				if (code == 1) {
					//mydev
					console.log(data);
					const {
						news,
						shop_logo,
						ad_list
					} = data;
					this.logo = shop_logo
					this.news = news
					this.adList=ad_list
					/*const {
						coupon,
						news,
						seckill,
						host_goods,
						shop_logo,
						new_goods,
						activity_area,
						ad_list
					} = data;
					this.remainTime = Math.abs(seckill.end_time - Date.parse(new Date()) / 1000);
					this.logo = shop_logo
					this.news = news
					this.seckillGoods = seckill.goods
					this.hotGoods = host_goods
					this.coupon = coupon
					this.newGoods = new_goods
					this.activityArea = activity_area
					this.adList=ad_list*/
					
				}
			},
			async getMenuFun() {
				const {
					code,
					data
				} = await getMenu({
					type: 1
				});
				uni.stopPullDownRefresh()
				if (code == 1) {
					//   截取数组
					if(data.length <= 5) {
						this.navSwiperH = 200
					}else {
						this.navSwiperH = 374
					}
					this.navList = arraySlice(data);
				}
			},
			async getBestListFun() {
				let {
					page,
					goodsList,
					status
				} = this
				const data = await loadingFun(getBestList, page, goodsList, status)
				if (!data) return
				this.page = data.page
				this.goodsList = data.dataList
				this.status = data.status
			},
			tapMenu(item) {
				if (!this.isLogin) return showLoginDialog()
				menuJump(item)
			},
			swiperChange(e) {
				this.currentSwiper = e.detail.current
			},
			trigger(e) {
				//console.log(e)
				this.content[e.index].active = !e.item.active;
				if(e.item.text=="微信"){
					this.showPram=true;
				}
				if(e.item.text=="电话"){
					this.showKf=true;
				}
				
				/*uni.showModal({
					title: '提示',
					content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})*/
			},
			onCopy(str) {
			    copy(str);
			},
			showTelTips(phone) {
			    this.showPhoneCall = true;
				this.phone=phone;
			    this.phone_content = '即将打电话给' +phone
				
			},
			onCall() {
			    wx.makePhoneCall({
			        phoneNumber: this.phone.toString(),
			        success(e) {
			            console.log('成功', e)
			        },
			        fail(err) {
			            console.log('失败', err)
			        }
			    })
			},
			fabClick() {
				/*uni.showToast({
					title: '点击了悬浮按钮',
					icon: 'none'
				})*/
			}
		},
		computed: {
			...mapGetters(["cartNum", "inviteCode"])
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: 400rpx;
		box-shadow: 0px 0px 12px 0px rgba(0, 48, 107, 0.3);
	}
	.big-box{
		width:100%;
		height:100rpx;
		background:#FF2C3C;
	}
	.sec-box{
		display:inline-block;
	}
	.city-box{
		width:15%;
		color:#fff;
		height:55rpx;
		line-height:55rpx;
		text-align:center;
		font-size:26rpx;
	}
	.search-box{
		width:85%;
	}
	/*mydevcss*/
	.bg-body{
		background:#fff;
		text-align:center;
	}
	.wechat-box{
		font-size:34upx;
		color:#999;
		padding:0 0 20upx 0;
	}
	.row-white{
		text-align:center;
		display:inline-block;
		width:100%;
		color:#444;
		
	}
	.row-white .xs{
		font-size:28upx!important;
	}
	 .row-white .xs,.row-white .phone-btn{
		display:inline-block;
		 
	}
	.phone-btn {
	    background: linear-gradient(180deg, #FFA200 0%, #FF5E44 100%);
	    border-radius: 50upx;
		color:#ffffff;
		padding:4upx 20upx;
		 
	}
	.copy-phone-btn {
		//4d9aef
		background: linear-gradient(180deg, #007AFF 0%, #4d9aef 100%);
	    border-radius: 50upx;
		color:#ffffff;
		margin-left:20upx;
		padding:4upx 20upx;
		 
	}
	.bg-phone-body{
		padding:20upx;
	}
	/*.search{
		width:90%;
		display:block;
		float:right;
	}
	.city-box{
		width:10%;
		float:left;
	}*/
	.index {
		.header {
			.navigation-bar {
				padding-top: var(--status-bar-height);
				box-sizing: border-box;

				.logo {
					width: auto;
					height: 50rpx;
				}
			}
		}

		.contain {
			.top-bg {
				 
				background-size: 100% 100%;
				height: 260rpx;
				box-sizing: border-box;
				position: relative;
			}

			.main {
				/*margin-top: -260rpx;*/
				position: relative;
				z-index: 9;

				.nav {
					position: relative;
					.nav-item {
						/*width: 20%;*/
						width: 25%;
						margin-top: 30rpx;

						.nav-icon {
							width: 82rpx;
							height: 82rpx;
							margin-bottom: 15rpx;
						}
					}
					.dots {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom:20rpx;
						display: flex;
						.dot {
							width: 10rpx;
							height: 6rpx;
							border-radius: 6rpx;
							margin-right: 10rpx;
							background-color: rgba(255, 44, 60, 0.4);
							&.active {
								width: 20rpx;
								background-color: $-color-primary;
							}
						}

					}

				}

				.information {
					height: 76rpx;
					box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06);
					padding: 0 20rpx;
					border-top: $-solid-border;
					box-sizing: border-box;

					.news {
						position: relative;

						.shade {
							position: absolute;
							width: 100%;
							height: 100%;
							z-index: 100;
						}
					}

					.icon-toutiao {
						width: 114rpx;
						height: 34rpx;

					}

					.gap-line {
						height: 28rpx;
						width: 1px;
						background-color: #DCDDDC;
						margin: 0 30rpx;
					}
				}

				.special-area {
					margin: 20rpx 20rpx 0;
					flex-wrap: wrap;

					.area-item {
						text-align: center;
						width: 234rpx;
						padding: 20rpx 20rpx 10rpx;
						box-sizing: border-box;
						background-color: #fff;
						border-radius: 10rpx;
						margin-bottom: 4rpx;

						&:not(:nth-of-type(3n)) {
							margin-right: 4rpx;
						}
						.desc {
							overflow: hidden;
							white-space: nowrap;
							width: 200rpx;
						}
					}
				}

				.goods {
					.goods-title {
						height: 100rpx;

						.line {
							width: 58rpx;
							height: 1px;
							background-color: #ccc;
							margin: 0 22rpx;
						}

						.icon {
							width: 38rpx;
							height: 38rpx;
						}
					}
				}

				.activity-header {
					height: 80rpx;
					padding: 0 20rpx;
				}

				.seckill {
					.dec {
						background-color: #FFFBDB;
						width: 150rpx;
					}
				}
			}
		}
	}
</style>
