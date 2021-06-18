<template>
	<view class="goods-search">

		<view class="header-wrap">
			<u-sticky offset-top="0" h5-nav-height="0">
				<view class="search">
					 <u-search v-model="keyword" placeholder="请输入搜索关键字,多个关键词用空格隔开" @focus="showHistory = true" @search="onSearch" bg-color="#F4F4F4"></u-search>
				</view>
				<view v-show="!showHistory" class="header row bg-white">
					<view :class="'tag row-center ' + (comprehensive ? 'primary' : '')" @tap="onNormal">综合</view>
					<view class="tag row-center" data-type="priceSort" @tap="onPriceSort">
						<text :class="priceSort ? 'primary' : ''">价格</text>
						<view>
							<trigonometry direction="up" size="small" :color="priceSort == 'desc' ? '#FF5058' : '#333'">
							</trigonometry>
							<trigonometry size="small" :color="priceSort == 'asc' ? '#FF5058' : '#333'"></trigonometry>
						</view>
					</view>
					<view class="tag row-center" data-type="saleSort" @tap="onSaleSort">
						<text :class="saleSort ? 'primary' : ''">销量</text>
						<view>
							<trigonometry direction="up" size="small" :color="saleSort == 'desc' ? '#FF5058' : '#333'">
							</trigonometry>
							<trigonometry size="small" :color="saleSort == 'asc' ? '#FF5058' : '#333'"></trigonometry>
						</view>
					</view>
					<view class="tag row-center" v-if="list.cj!=undefined">
						<view class="my-row-center"  @tap="changeType">
							<image class="icon-sm" :src=" goodsType === 'one' ? '/static/images/icon_double.png' : '/static/images/icon_one.png'"></image>
						 
						</view>
						<!--筛选-->
						<view  class="search-box" @click="show = true"  >
							 筛选
						</view>
					</view>
					<view v-else class="tag row-center"  @tap="changeType">
						<image class="icon-sm" :src=" goodsType === 'one' ? '/static/images/icon_double.png' : '/static/images/icon_one.png'"></image>
					 
					</view>
				</view>
				<!--mydev  start-->
				 <!--  <view v-show="!showHistory" class="header row bg-white">
				   	<view :class="'tag row-center ' + (comprehensive ? 'primary' : '')" @tap="onNormal">综合</view>
				   	<view class="tag row-center" data-type="priceSort" @tap="onPriceSort">
				   		<text :class="priceSort ? 'primary' : ''">价格</text>
				   		<view>
				   			<trigonometry direction="up" size="small" :color="priceSort == 'desc' ? '#FF5058' : '#333'">
				   			</trigonometry>
				   			<trigonometry size="small" :color="priceSort == 'asc' ? '#FF5058' : '#333'"></trigonometry>
				   		</view>
				   	</view>
				   	<view class="tag row-center" data-type="saleSort" @tap="onSaleSort">
				   		<text :class="saleSort ? 'primary' : ''">销量</text>
				   		<view>
				   			<trigonometry direction="up" size="small" :color="saleSort == 'desc' ? '#FF5058' : '#333'">
				   			</trigonometry>
				   			<trigonometry size="small" :color="saleSort == 'asc' ? '#FF5058' : '#333'"></trigonometry>
				   		</view>
				   	</view>
				   	<view class="tag row-center" @tap="changeType">
				   		<image class="icon-sm" :src=" goodsType === 'one' ? '/static/images/icon_double.png' : '/static/images/icon_one.png'"></image>
				   	</view>
				   </view>-->
				<!--mydev end-->
			</u-sticky>
		</view>
		<view v-show="showHistory" class="content bg-white">
			<view v-if="hotList.length" class="search-words">
				<view class="title">热门搜索</view>
				<view class="words row wrap">
					<view v-for="(item, index) in hotList" :key="index" class="item br60 bg-gray mr20 mb20 lighter sm line1" @tap="onChangeKeyword(item)">{{item}}</view>
				</view>
			</view>
			<view v-if="historyList.length" class="search-words">
				<view class="title row-between">
					<view>历史搜索</view>
					<view class="xs muted mr20" style="padding: 10rpx 20rpx" @tap="clearSearchFun">清空</view>
				</view>
				<view class="words row wrap">
					<view v-for="(item, index) in historyList" :key="index" class="item br60 bg-gray mr20 mb20 lighter sm line1" @tap="onChangeKeyword(item)">{{item}}</view>
				</view>
			</view>
		</view>
		<view v-show="!showHistory" class="content">
			<view class="goods-list">
				<view v-show="goodsType == 'double'" class="double">
					<goods-list type="double" :list="goodsList"></goods-list>
				</view>
				<view v-show="goodsType == 'one'" class="one">
					<goods-list :list="goodsList" type="one"></goods-list>
				</view>
			</view>
			<loading-footer :status="status" :slot-empty="true" @refresh="reload">
				<view slot="empty" class="column-center" style="padding-top: 200rpx">
					<image class="img-null" src="/static/images/goods_null.png"></image>
					<text class="lighter">暂无商品</text>
				</view>
			</loading-footer>
		</view>
		 <!--mydev start-->
		 <u-popup v-model="show" mode="bottom"  closeable="true"   border-radius="20" >
		 			 <view class="ser-content">
						            <view class="ser-btitle">全部筛选</view>
		 			 				<scroll-view scroll-y="true" style="height:800upx;">
		 			 					<view class="slot-content">
											<view class="name mt30">产地</view>
											<view class="row wrap item-box"> 
												  <view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index,'cj')" v-for="(item, index) in list.cj" :key="index">
												 		{{item.name}}
												 	</view>
		 			 					    </view>
											<view class="name mt30">提货地</view>
											<view class="row wrap item-box"> 
												  <view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index,'gs')" v-for="(item, index) in list.gs" :key="index">
												 		{{item.name}}
												 	</view>
											</view>
											<view class="name mt30">价格区间(元)</view>
											<view class="price-bet">
												<view class="price-box">
													<input v-model="min_price"  type="number" placeholder="自动最低价" />
												</view>
												<view class="line">
													-
												</view>
												<view class="price-box">
													<input v-model="max_price"  type="number" placeholder="自动最高价" />
												</view>
											</view>
										</view>
		 			 				</scroll-view>
		 			 				<view class="confrim-btn">
										<view class="bnt-box">
											<button class="reset-bnt" @click="resetData()">重置</button>
											<button class="com-bnt" @click="seachRes()">确定</button>
										</view>
		 			 				</view>
		 			 </view>
		  </u-popup>
	</view>
</template>

<script>
	import {
		getGoodsSearch,
		getSearchpage,
		clearSearch,
		getSearchData
	} from '@/api/store';
	import {
		trottle
	} from '@/utils/tools';
	import {
		loadingType
	} from '@/utils/type';
	import {
		getRect
	} from '@/utils/tools';
	import {
		loadingFun
	} from '@/utils/tools'
	//mydev
	 
	const app = getApp();

	export default {
		data() {
			return {
				headerH: 0,
				keyword: '',
				status: loadingType.LOADING,
				page: 1,
				goodsType: 'double',
				goodsList: [],
				priceSort: '',
				saleSort: '',
				showHistory: false,
				show:false,
				hotList: [],
				historyList: [],
				list: [],
				//default_list:[],
				open_search:0,
				min_price:"",
				max_price:""
			};
		},

		components: {},
		props: {},
		watch: {
			// 监听属性
			keyword(value, old) {
				if (!value && !this.id) {
					this.showHistory = true
				}
			},
			showHistory(value) {
				if (value) {
					this.getSearchpageFun();
				}
			}

		},
		computed: {
			comprehensive() {
				const {
					priceSort,
					saleSort
				} = this
				if (priceSort == '' && saleSort == '') {
					return true;
				}

				return false;
			}

		},




		onLoad(options) {
			this.onNormal = trottle(this.onNormal, 500, this);
			this.onPriceSort = trottle(this.onPriceSort, 500, this);
			this.onSaleSort = trottle(this.onSaleSort, 500, this);
			this.onSearch = trottle(this.onSearch, 500, this);
			this.init(options);
		},


		onReachBottom: function() {
			this.getGoodsSearchFun();
		},
		methods: {
			onChange(e) {
				this.keyword = e.value
			},

			changeType() {
				this.goodsType = this.goodsType === 'one' ? 'double' : 'one'
			},

			clearSearchFun() {
				clearSearch().then(res => {
					if (res.code == 1) {
						this.getSearchpageFun();
					}
				});
			},

			onNormal() {
				this.priceSort = ''
				this.saleSort = ''
				this.onRefresh();
			},

			onPriceSort() {
				let {
					priceSort
				} = this;
				this.saleSort = ''
				this.priceSort = priceSort == 'asc' ? 'desc' : 'asc'
				this.onRefresh();
			},

			onSaleSort() {
				let {
					saleSort
				} = this;
				this.priceSort = ''
				this.saleSort = saleSort == 'desc' ? 'asc' : 'desc'
				this.onSearch();
			},

			init(option) {
				let {
					id,
					name,
					type
				} = option;
				this.type =type;
				getRect('.header-wrap').then(res => {
					this.headerH = res.height
				});
         
				if (id) {
					uni.setNavigationBarTitle({
						title: name
					});
					this.id = id;
					
					 /*if(name=='厂家直销'){
						getSearchData().then(res=>{
							this.list=res.data.city_list; 
						});
					 }*/
					this.getGoodsSearchFun();
				} else {
					uni.setNavigationBarTitle({
						title: '搜索'
					});
					this.showHistory = true
				}
				//mydev 
				getSearchData().then(res=>{
					this.list=res.data.city_list;
					 
				});
			},

			getSearchpageFun() {
				getSearchpage().then(res => {
					if (res.code == 1) {
						let {
							history_lists,
							hot_lists
						} = res.data;
						this.hotList = hot_lists
						this.historyList = history_lists
					}
				});
			},

			onClear() {
				if (this.id) {
					this.onSearch();
				}
			},
			onSearch() {
				this.onRefresh()
			},
			onRefresh() {
				this.showHistory = false
				this.page = 1
				this.goodsList = []
				this.status = loadingType.LOADING
				this.$nextTick(() => {
					this.getGoodsSearchFun();
				});
			},

			onChangeKeyword(item) {
				this.keyword = item
				this.showHistory = false
				this.onRefresh();
			},

			async getGoodsSearchFun() {
				let {
					page,
					goodsList,
					keyword,
					priceSort,
					saleSort,
					status,
					min_price,
					max_price
				} = this;
				if (status == loadingType.FINISHED) return;
				var city=uni.getStorageSync("city");
				const params = {
					category_id: this.type == 1 ? this.id : '',
					brand_id: this.type == 0 ? this.id : '',
					page_no: page,
					keyword,
					price: priceSort,
					sales_sum: saleSort,
					city:city,
					min_price:min_price,
					max_price:max_price
				}
				//mydev
				 if(this.list.cj!=undefined){
					   params.scity="";
					   for(var i in this.list.cj){
							 if(this.list.cj[i].active){
								  params.scity+=this.list.cj[i].name+",";
								  this.open_search=1;
							 }
							
						 }
						 
				 }
				 if(this.list.gs!=undefined){
					   params.gcity="";
					   for(var i in this.list.gs){
							 if(this.list.gs[i].active){
								  params.gcity+=this.list.gs[i].name+",";
								  this.open_search=1;
							 }
							
						 }
				 						 
				 }
				const data = await loadingFun(getGoodsSearch, page, goodsList, status, params)
				if (!data) return
				
				this.page = data.page
				this.goodsList = data.dataList
				this.status = data.status
				//console.log(this)
			},
			tagClick(index,ky) {
				this.list[ky][index].active = !this.list[ky][index].active;
				this.searchPub();
			},
			searchPub(){
				this.status=loadingType.LOADING;
				this.page=1;
				this.goodsList=[];
				this.getGoodsSearchFun();
			},
			seachRes(){
				this.show=false;
			    if(this.open_search==0&&this.min_price==""&&this.max_price==""){
					return;
				}
				this.searchPub();
			},
			resetData(){
				for(var i in this.list.cj){
					this.list.cj[i].active=false;
				}
				for(var i in this.list.gs){
					this.list.gs[i].active=false;
				}
				this.min_price="";
				this.max_price="";
				this.searchPub();
			}

		}
	};
</script>
<style lang="scss">
	.goods-search {
		.header-wrap {
			.search {
				box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.03);
				position: relative;
				z-index: 1;
			}

			.header {
				height: 80rpx;

				.tag {
					height: 100%;
					flex: 1;
				}
			}
		}


		.content {
			.search-words {
				padding-left: 24rpx;
				padding-bottom: 20rpx;

				.title {
					padding: 26rpx 0;
				}

				.words {
					.item {
						line-height: 52rpx;
						height: 52rpx;
						padding: 0 24rpx;
					}
				}
			}

			.goods-list {
				overflow: hidden;
			}
		}
	}
	.search-box{
		font-size:27upx;
		color:#999;
		 position:absolute;
		 right:30upx;
	}
	.my-row-center{
		 margin-right:30upx;
		 border-right:2upx solid #999;
		 padding-right:10upx;
		 height:32upx;
		 position:relative;
		 width:40upx;
	}
	.my-row-center image{
		position:absolute;
		top:1upx;
	}
	.ser-content{
		padding: 24upx;
	}
	.ser-btitle{
		  font-size:34upx;
		  color:#333;
		  padding:10upx 0;
		  text-align: center;
	}
	.price-bet{
		 margin-top:20upx;
		 display:flex;
	}
	.price-box input{
		width:100%;
		height:40upx;
		line-height:40upx;
		border-radius:30upx;
		border:0;
		background:#efefef;
		text-align: center;
		padding:10upx 0;
		color:#999;
	}
	.bnt-box{
		padding-bottom:20upx;
	}
	.bnt-box button{
		width:50%;
		display:inline-block;
		padding:3upx 0;
		color:#fff;
		font-size:35upx;
	}
	.reset-bnt{
		background:#ffa630;
		border-radius:40upx 0 0 40upx;
	}
	.com-bnt{
		background:#ff2c3c;
		border-radius:0 40upx 40upx 0;
	}
	.line{
		color:#dedede;
		padding:0 15upx;
		vertical-align:middle;
	}
	.slot-content { 
		background-color: #FFFFFF;
		padding: 24rpx;
		
		.item-box {
			margin-bottom: 50rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.item {
				/*border: 1px solid $u-type-primary;
				color: $u-type-primary;*/
				background:#efefef;
				color:#666;
				padding: 12upx 30upx;
				border-radius: 100upx;
				margin-top: 30upx;
			}
			
			.active {
				/*color: #FFFFFF;
				background-color: $u-type-primary;*/
				color: #FFFFFF;
				background-color: $u-type-primary;
				/*border: 1px solid $u-type-primary;*/
				/*color: $u-type-primary;*/
			}
		}
	}
</style>
