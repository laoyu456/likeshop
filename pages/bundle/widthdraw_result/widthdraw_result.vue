<template>
<view class="pay-result">
  <view class="contain bg-white">
    <view class="header  column-center">
      <view>
        <image class="tips-icon" :src="widthdrawInfo.status == 0 ? '/images/icon_cashOut_wait.png' : widthdrawInfo.status == 1 ? '/images/icon_paySuccess.png' : '/images/icon_payFail.png'"></image>
      </view>
      <view class="xl mt20 line1">{{widthdrawInfo.status == 0 ? '提交成功，待审核...' : widthdrawInfo.status == 1 ? '审核通过，已入账' : '审核失败，账号异常'}}</view>
    </view>
    <view style="height:130rpx"></view>
    <view class="column-center">
      <price-format :price="widthdrawInfo.money" color="#FF2C3C" showSubscript subscriptSize="30" firstSize="46" secondSize="46" weight="bold" />
    </view>
    <view class="info">
      <view class="order-num row-between mt20">
        <view class="ml20">流水号</view>
        <view class="mr20">
         {{widthdrawInfo.sn}}
        </view>
      </view>
      <view v-if="widthdrawInfo.create_time" class="order-time row-between mt20">
        <view class="ml20">提交时间</view>
        <view class="mr20">{{widthdrawInfo.create_time}}</view>
      </view>
      <view class="order-pay-type row-between mt20">
        <view class="ml20">提现至</view>
        <view class="mr20">{{widthdrawInfo.type == 1 ? '余额' : widthdrawInfo.type == 2 ? '微信' : '支付宝'}}</view>
      </view>
      <view class="order-pay-money row-between mt20">
        <view class="ml20">服务费</view>
        <view class="mr20">
          ¥ <price-format :price="widthdrawInfo.poundage" />
        </view>
      </view>
      <view class="order-pay-money row-between mt20">
        <view class="ml20">实际到账</view>
        <view class="mr20">
          ¥ <price-format :price="widthdrawInfo.left_money" />
        </view>
      </view>
    </view>
    <view class="line ml20"></view>
    <view class="opt-btn-contain row-center wrap">
      <navigator hover-class="none" class="check-order-btn row-center bg-primary br60 mt20" url="/pages/user_withdraw_code/user_withdraw_code">
        <view class="white bg-primary lg">查看历史提现记录</view>
      </navigator>
      <navigator hover-class="none" class="go-back-btn row-center br60 mt20" open-type="switchTab" url="/pages/index/index">
        <view class="primary br60 lg">返回首页</view>
      </navigator>
      <view class="muted mt20">* 审核通过后约72小时内到账，请留意账户明细</view>
    </view>
  </view>
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
import { getWithdrawDetail } from '@/api/user';

export default {
  data() {
    return {
      widthdrawInfo: {}
    };
  },

  components: {
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this.getWithdrawDetailFun();
  },

 
  methods: {
    getWithdrawDetailFun() {
      getWithdrawDetail({
        id: this.id
      }).then(res => {
        if (res.code == 1) {
          this.widthdrawInfo = res.data
        }
      });
    }

  }
};
</script>
<style lang="scss">
/* pages/pay_result/pay_result.wxss */



.pay-result {
    .contain {
      width: 682rpx;
      /* height: 732rpx; */
      margin-left: 20rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      margin-top: 78rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      padding-bottom: 40rpx;
      position: relative;
        .tips-icon {
          width: 112rpx;
          height: 112rpx;
        }
        .header {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -50rpx;
        }
        .info {
            margin-bottom: 40rpx;
            .order-num {
              align-items: flex-start;
            }
        }
        .opt-btn-contain {
          margin-top: 40rpx;
          .check-order-btn {
            width: 650rpx;
            height: 84rpx;
          }
          .go-back-btn {
            width: 650rpx;
            height: 84rpx;
            border: solid 1rpx $-color-primary;
            box-sizing: border-box;
          }
        }
    }
}

.line {
  width: 650rpx;
  border-top: 1px solid rgba(229,229,229,1);
}
</style>