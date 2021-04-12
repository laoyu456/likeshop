
//分页状态
export const loadingType = {
  LOADING: 'loading',
  FINISHED: 'finished',
  ERROR: 'error',
  EMPTY: 'empty'
}; 

// 收藏状态
export const CollectType = {
    COLLECTION: 1,
    CANCEL_COLLECTION: 0
}

//支付方式
export const payWay = {
	WECHAT: 1,
	BALANCE:3
}

export const orderType = {
 ALL: 'all',
  //全部
 PAY: 'pay',
  //待付款
 DELIVERY: 'delivery',
  //待收货
 FINISH: 'finish',
  //待收货
 CLOSE: 'close' //待收货

};
// 售后状态
export const AfterSaleType = {
    // 售后申请 
    NORMAL: 'normal',
    // 处理中
    HANDLING: 'apply',
    // 已处理
    FINISH: 'finish'
}

// 售后退款操作
export const refundOptType = {
    // 仅退款
    ONLY_REFUND: 0,
    // 退货退款
    REFUNDS: 1
}

// 短信发送
export const SMSType = {
    REGISTER: 'ZCYZ',
    FINDPWD: 'ZHMM',
    LOGIN: 'YZMDL',
    CHANGE_MOBILE: 'BGSJHM',
    BIND_MOBILE: 'BDSJHM'
}

// 分销订单状态
export const userOrderPromoteOrder = {
    ALL: 0,
    WAIT_RETURN: 1,
    HANDLED: 2,
    INVALED: 3
}

// 排序类型
export const SortType = {
    NONE: '',
    ASC: 'asc',
    DESC: 'desc'
}

// 粉丝类型 
export const FansType = {
    ALL: 'all',
    FIRST: 'first',
    SECOND: 'second'
}


export const groupType = {
  ALL: -1,
  PROGESS: 0,
  SUCCESS: 1,
  FAIL: 2
};

export const bargainType = {
    ALL: 'all',
    BARGINNING: "bargainning",
    SUCCESS: 'success',
    FAIL: 'fail'
}