<template>
	<view>
		<popup-layer ref="popupRef" :direction="'right'">
			<view style="width:750upx;height: 100%;">
				<citySelect @back_city="back_city"></citySelect>
			</view>
		</popup-layer>
	</view>
</template>

<script> 
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect.vue';
	import popupLayer from '@/components/popup-layer/popup-layer.vue';
	export default {
		components: {
			citySelect,
			popupLayer
		},
		computed: {},
		data() {
			return {
				
			}
		},
		onLoad(options) {
			this.$refs.popupRef.show();
		},
		methods: {
			back_city(e) {
				if (e !== 'no') {
					this.region = e.cityName;
					uni.setStorageSync("city",this.region);
					uni.switchTab({
						url:"/pages/index/index"
					})
					this.$refs.popupRef.close();
				} else {
					this.$refs.popupRef.close();
				}
			}
		}
	}
</script>

<style>

</style>
