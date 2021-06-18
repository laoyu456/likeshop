// +----------------------------------------------------------------------
// | LikeShop100%开源免费商用电商系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | Gitee下载：https://gitee.com/likemarket/likeshopv2
// | 访问官网：https://www.likemarket.net
// | 访问社区：https://home.likemarket.net
// | 访问手册：http://doc.likemarket.net
// | 微信公众号：好象科技
// | 好象科技开发团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | Author: LikeShopTeam
// +----------------------------------------------------------------------

<template>
	<view :class="'active-area ' + extClass">
		<view class="a-header">
			<slot name="header"></slot>
		</view>
		<view class="public-class a-main">
			<slot name="main-header"></slot>
			<scroll-view style="height: 340rpx; white-space: nowrap;" scroll-x="true" scroll-with-animation="true">
				<navigator v-for="(item, index) in lists" :key="index" class="goods-item bg-white" hover-class="none" :url="'/pages/goods_details/goods_details?id=' + item.id">
					<custom-image width="200rpx" height="200rpx" radius="10rpx" lazy-load :src="item.image"></custom-image>
					<view style="padding: 8rpx">
						<view class="goods-name line1">{{item.name}}</view>
						<view>
							<price-format :price="item.seckill_price || item.price" :first-size="32" :second-size="22" :subscript-size="22"
							 color="#FF2C3C"></price-format>
						</view>
						<view>
							<price-format :price="item.min_price || item.market_price" color="#999999" :second-size="22" :first-size="22"
							 :subscript-size="22" :line-through="true"></price-format>
						</view>
					</view>
				</navigator>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		trottle,
		getRect
	} from "@/utils/tools";

	export default {
		data() {
			return {
				currentSwiper: 0,
			};
		},

		components: {},
		props: {
			extClass: {
				type: String,
				default: ''
			},
			lists: {
				type: Array,
				default: () => []
			}
		},
		watch: {
			"lists": function(value) {
				if (!value) {
					return;
				}
			}
		},

		beforeMount: function() {

		},
		destroyed: function() {},
		methods: {}
	};
</script>
<style lang="scss">
	.active-area {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border-radius: 10rpx;
		margin: 0 20rpx;

		&.seckill {
			 
		}

		&.hot {
			/*background-image: url(../../static/images/home_hot_bg.png);*/
		}

		.a-main {
			position: relative;
			box-sizing: border-box;
			padding-bottom: 20rpx;

			.goods-item {
				width: 200rpx;
				margin-left: 10rpx;
				display: inline-block;
				border-radius: 10rpx;
				overflow: hidden;
				&:first-of-type {
					margin-left: 20rpx;
				}

				&:last-of-type {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
