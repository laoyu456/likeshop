<template>
	<view class="swiper-wrap">
		<swiper class="swiper" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration" @change="swiperChange">
			<block v-for="(item, index) in urls" :key="index">
				<swiper-item  @tap="previewImage(index)">
					<view v-if="item.type == 'video'" class="video-wrap">
						<video id="myVideo"  class="my-video"  :enable-progress-gesture="false" :controls="showControls"  :autoplay="false" :show-progress="true" :show-fullscreen-btn="showControls"
						 :src="item.url" :show-center-play-btn="false" :show-play-btn="showControls" @play="showPlay = false" @ended="showPlay = true" @fullscreenchange="fullscreenchange"></video>
						 <image v-if="showPlay" @tap.stop="play" src="/static/images/icon_play.png" class="icon-play"></image>
					</view>
					<custom-image v-else width="750upx" height="750upx" mode="aspectFit" :src="item.url"></custom-image>
				</swiper-item>
			</block>
		</swiper>
		<view class="dots black sm bg-white br60">{{currentSwiper + 1}}/{{urls.length}}</view>
	</view>
</template>

<script>
	var app = getApp();

	export default {
		data() {
			return {
				currentSwiper: 0,
				urls: [],
				showPlay: true,
				showControls: false
			};
		},

		components: {},
		props: {
			imgUrls: {
				type: Array,
				default: () => [],
			},
			circular: {
				type: Boolean,
				default: true,
			},
			autoplay: {
				type: Boolean,
				default: false,
			},
			interval: {
				type: Number,
				default: 3000,
			},
			duration: {
				type: Number,
				default: 500,
			},
			video: {
				type: String,
			}
		},
		watch: {
			imgUrls: {
				handler(val) {
					this.urls = val.map(item => {
						return {
							url: item.uri,
							type: "image"
						}
					});
				},
				immediate: true,
			},
			video(val) {
				if(!val) return
				this.urls.unshift({
					url: val,
					type: "video"
				})
				this.$nextTick(() =>{
					 this.videoContext = uni.createVideoContext('myVideo', this)
				})
			}
		},
		methods: {
			swiperChange(e) {
				this.currentSwiper = e.detail.current
			},

			previewImage(current) {
				let index = current
				// #ifdef MP-WEIXIN
				wx.previewMedia({
					current,
					sources: this.urls 
				});
				//#endif
				// #ifdef H5
				if(this.video) {
					let index = current - 1
				}
				if(this.urls[current].type == "video") {
					this.videoContext.requestFullScreen()
				}else {
					uni.previewImage({
						index,
						urls: this.imgUrls.map((item) => item.uri)
					})
				}
				
				//#endif
			},
			play() {
				this.videoContext.play()
			},
			fullscreenchange(e) {
				const {fullScreen} = e.detail
				this.showControls = fullScreen ? true : false
			}

		}
	};
</script>
<style>
	.swiper-wrap {
		width: 100%;
		height: 750rpx;
		position: relative;
	}

	.swiper-wrap .swiper {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.swiper-wrap .swiper .slide-image {
		width: 100%;
		height: 100%;
	}

	.swiper-wrap .dots {
		position: absolute;
		right: 24rpx;
		bottom: 24rpx;
		display: flex;
		height: 34rpx;
		padding: 0 15rpx;
	}
	.swiper-wrap .video-wrap {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.swiper-wrap  .my-video {
	    width: 100%;
	    height: 100%;
	   
	}
	.swiper-wrap .icon-play {
		width: 90rpx;
		height: 90rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>
