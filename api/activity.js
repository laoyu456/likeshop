import request from '@/utils/request'
import{client} from '@/utils/tools'
//获取商品的优惠券
export function getGoodsCoupon(data) {
  return request.get("coupon/getGoodsCoupon",  {params: data});
} 

//领券中心
export function getCouponList(data) {
	return request.get("coupon/couponList", {params: data});
}

// 获取活动专区商品列表
export function getActivityGoodsLists(data) {
    return request.get("activity_area/activityGoodsList", {params: data})
}


// 获取秒杀时间段
export function getSeckillTime() {
	return request.get("/seckill/seckillTime");
}

// 获取秒杀商品
export function getSeckillGoods(params) {
	return request.get("/seckill/seckillGoods", {params})
}



export function getGroupList(params) {
  return request.get('team/teamGoodsList', {params});
} 

//我的拼团
export function getUserGroup(params) {
  return request.get('user/myTeam', {params});
} 

//拼团详情
export function getTeamInfo(params) {
  return request.get('team/teamInfo', {params});
} 

//参与拼团验证
export function teamCheck(data) {
  return request.post('team/check', data);
}

 //拼团下单
export function teamBuy(data) {
  return request.post("team/buy", { ...data,
    order_source: client
  });
}