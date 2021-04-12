<template>
<!--pages/invite_fans/invite_fans.wxml-->
<view class="invite-fans-container column-center">
  <image style="width: 600rpx;height: 980rpx;border-radius: 20rpx;" :src="imgUrl" />
   <!-- #ifdef MP-WEIXIN -->
  <view class="save-btn br60 md white row-center" @tap="saveImageToAlbum">保存到相册</view>
  <!-- #endif -->
   <!-- #ifdef H5 -->
  <view class="save-btn br60 md white row-center">长按保存到相册</view>
   <!-- #endif -->
</view>
</template>

<script>
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
import { getInviteBanner } from "@/api/user";
import { Tips } from "@/utils/tools.js";

export default {
  data() {
    return {
      imgUrl: ''
    };
  },

  components: {},
  props: {},

  onLoad: function (options) {
    this.getInviteBannerFun();
  },

  methods: {
    saveImageToAlbum() {
		
      // 下载网络图片到本地
      uni.downloadFile({
        url: this.imgUrl,
        success: res => {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: res => {
              this.$toast({
                title: "保存成功"
              });
            }
          });
        }
      });
    },

    getInviteBannerFun() {
		// #ifdef H5
		let path = '/'
		// #endif
		// #ifdef MP-WEIXIN
		let path = 'pages/index/index'
		// #endif
      getInviteBanner({
        url: path
      }).then(res => {
        if (res.code == 1) {
          this.imgUrl = res.data.url
        }
      });
    }

  }
};
</script>
<style lang="scss">
/* pages/invite_fans/invite_fans.wxss */
.invite-fans-container {
  padding: 0rpx 75rpx;
  background: linear-gradient(180deg, #333333 0%, #767676 100%);
  min-height: 100vh;
  .save-btn {
    background-color: $-color-primary;
    margin-top: 30rpx;
    width: 100%;
    padding: 20rpx 0;
  }
}
</style>