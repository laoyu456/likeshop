<template>
<!--pages/user_bill/user_bill.wxml-->
<view class="user-bill">
    <tabs :active="active" line-width="40" @change="onChange">
        <tab title="全部">
            <view class="list mt20">
                <view v-for="(item, index) in lists" :key="index" class="item">
                    <view class="bill-list bg-white">
                        <view class="bill-item row-between">
                            <view>
                                <view class="black mb10">{{item.source_type}}</view>
                                <view class="xs muted">{{item.create_time}}</view>
                            </view>
                            <view :class="'lg ' + (item.change_type == 1 ? 'income' : '')">{{item.change_amount}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <loading-footer :status="loadingStatus" slotEmpty>
                <view class="data-null column-center" slot="empty">
                    <image class="img-null" src="/static/images/order_null.png" />
                    <text class="nr muted">暂无记录～</text>
                </view>
            </loading-footer>
        </tab>
        <tab title="消费">
            <view class="list mt20">
                <view v-for="(item, index) in lists" :key="index" class="item">
                    <view class="bill-list bg-white">
                        <view class="bill-item row-between">
                            <view>
                                <view class="black mb10">{{item.source_type}}</view>
                                <view class="xs muted">{{item.create_time}}</view>
                            </view>
                            
                            <view class="lg">{{item.change_amount}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <loading-footer :status="loadingStatus" slotEmpty>
                <view class="data-null column-center" slot="empty">
                    <image class="img-null" src="/static/images/order_null.png" />
                    <text class="nr muted">暂无消费记录～</text>
                </view>
            </loading-footer>
        </tab>
        <tab title="充值">
            <view class="list mt20">
                <view v-for="(item, index) in lists" :key="index" class="item">
                    <view class="bill-list bg-white">
                        <view class="bill-item row-between">
                            <view>
                                <view class="black mb10">{{item.source_type}}</view>
                                <view class="xs muted">{{item.create_time}}</view>
                            </view>
                            <view class="lg income">{{item.change_amount}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <loading-footer :status="loadingStatus" slotEmpty>
                <view class="data-null column-center" slot="empty">
                    <image class="img-null" src="/static/images/order_null.png"></image>
                    <text class="nr muted">暂无充值记录～</text>
                </view>
            </loading-footer>
        </tab>
    </tabs>
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
import { getAccountLog } from "@/api/user";
import { loadingType } from "@/utils/type";
import {loadingFun} from "@/utils/tools"
export default {
  data() {
    return {
      active: 0,
      lists: [],
      page: 1,
      loadingStatus: loadingType.LOADING
    };
  },

  components: {
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.type, "option.type")
    this.active = parseInt(options.type);

    this.getAccountLogFun(this.active);
  },

  
  onReachBottom: function () {
    this.getAccountLogFun(this.active);
  },

  methods: {
    onChange(e) {
      this.active = e;
      this.cleanStatus();
      this.getAccountLogFun(e);
    },

    cleanStatus() {
      // 清理状态
      this.page = 1;
      this.lists = [];
      this.loadingStatus = loadingType.LOADING
    },

    getAccountLogFun(type) {
      let changeType = 0;
      type == 0 ? changeType = 0 : type == 1 ? changeType = 2 : changeType = 1;
      let {
        lists,
        loadingStatus,
        page
      } = this;
      loadingFun(getAccountLog, page, lists, loadingStatus, { source: 1, type: changeType}).then(res => {
          if(res) {
              this.page = res.page;
              this.lists = res.dataList
              this.loadingStatus = res.status
          }
      })
    }

  }
};
</script>
<style lang="scss">
/* pages/user_bill/user_bill.wxss */
.user-bill {
    .list {
        .item {
            .time{
                padding: 30rpx;
            }
            .bill-list {
                .bill-item {
                    padding: 20rpx 30rpx;
                    border-bottom: $-solid-border;
                    .income {
                        color: $-color-primary;
                    }
                }
            }
        }
    }
}

.order-null {
    padding-top: 200rpx;
}

.data-null {
    padding-top: 150rpx;
}
</style>