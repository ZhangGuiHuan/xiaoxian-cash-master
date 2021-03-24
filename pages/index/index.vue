<template>
	<view>
		<my-top-tabbar :current="0"></my-top-tabbar>
		<view class="main_box">
			<view class="left_box">
				<!-- <input auto-focus :focus="focus" v-model="input" @confirm="getCode"
					style="position: absolute;top: -100px;" /> -->
				<!-- <keyboard-listener @keyup="getKeyCode"></keyboard-listener> -->
				<view class="left_field_box">
					<view class="u-p-l-20 u-p-r-20 top_box">
						<u-icon name="scan"></u-icon>
						<text>{{barcode ? barcode :'请使用扫描枪录入条码'}}</text>
					</view>
					<scroll-view scroll-y scroll-with-animation class="menu-scroll-view" show-scrollbar
						:scroll-top="scrollTop">
						<view v-for="(item,index) in vuex_settlement_productList" :key="index" class="product-item">
							<view class="product_title u-flex u-col-top">
								<view class="u-line-2 u-flex-1">{{item.goodsName}}</view>
								<!-- 删除按钮 -->
								<u-icon name="close-circle" class="u-m-t-10" @click="deletePro(item,index)"></u-icon>
							</view>
							<view class="u-price u-p-t-5 u-p-t-5">
								{{item.marketingPrice}}
							</view>
							<view class="u-flex">
								<view class="u-font-12 u-line-1 u-flex-1">
									编号：{{item.code}}
								</view>
								<u-number-box v-model="item.number" :min="1" color="#7084DD" @change="changeNumber"></u-number-box>
							</view>
						</view>
						<!-- 占位view -->
						<view style="height: 300rpx;"></view>
		
					</scroll-view>
					<view class="buttom_box">
						<view class="u-flex u-p-b-20">
							<view class="u-flex-1">
								导购员：A
							</view>
							<view class="">
								打印小票 
							</view>
						</view>
		
						<view class="u-flex">
							<view class="u-flex-1">
								应 收：1212
							</view>
							<view class="">
								实收：232
							</view>
						</view>
						<view class="u-flex u-p-20">
							<u-button style="width: 100rpx;" size="medium" type="primary" @click="payfun('member')">会员
							</u-button>
							<u-button style="width: 100rpx;" size="medium" type="primary">现金</u-button>
							<u-button style="width: 100rpx;" size="medium" type="primary">扫码</u-button>
						</view>
					</view>
				</view>
			</view>
			<view class="right_box">
				<product v-if="pagesKey ==='product'"></product>
				<member v-if="pagesKey ==='member'"></member>
				<addmember v-if="pagesKey ==='addmember'"></addmember>
			</view>
		</view>
	</view>
</template>

<script>
	import keyboardListener from '@/components/keyboard-listener/keyboard-listener.vue'
	import product from './components/product.vue'
	import member from './components/member.vue'
	// #ifdef  APP-PLUS
		const scan = uni.requireNativePlugin('felix-scan-module');
	//#endif
	export default {
		components: {
			keyboardListener,
			product,
			member,
		},
		data() {
			return {
				barcode: '',
				list: [],
				focus: false,
				scrollTop: 0,
				pagesKey: 'product' //product:商品列表, member:会员
			}
		},
		mounted(data) {
			//this.focus = true
			//this.pagesKey = data.pagesKey || 'product';
			// #ifdef  APP-PLUS
			if(scan){
				//var main = plus.android.runtimeMainActivity();
				uni.showModal({
				    title: '提示',
				    content: '收银机需要开启辅助功能,请前往开启',
				    success: function (res) {
				        if (res.confirm) {
				           console.log("scan:ok");
				           //定义监听
				           var globalEvent = uni.requireNativePlugin('globalEvent');
				           //监听插件回调事件
				           globalEvent.addEventListener('onUsbBarcode', this.onUsbBarcode);
				           console.log("scan addEventListener:ok");
				           //初始化插件
				           scan.initUsb();
				           console.log("scan init:ok");
				        }
				    }
				});
			}else{
				this.$u.toast('扫描枪插件加载失败')
			}
			//#endif
		},
		methods: {
			//查询商品
			getCode(data) {
				if(this.loading){
					this.$u.toast('操作太频繁,请稍等')
					return false;
				}else{
					this.loading = true
				}
				this.$u.get('/goods/findGoodsByCode', {code:data}).then(res => {
					let list = this.vuex_settlement_productList || [];
					let productData = res;
					productData.number = 1;
					list.push(productData)
					this.$u.vuex('vuex_settlement_productList', list);
					this.barcode = '';
					this.scrollTop += 200;
					this.loading = false;
				}).catch(() => {
					this.loading = false;
					this.$u.toast('查询失败')
				})
			},
			changeNumber(data){
				//console.log(data)
			},
			payfun(key) {
				this.pagesKey = key
				
			},
			deletePro(item, index) {
				let list = this.vuex_settlement_productList || [];
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除： ' + item.name + ' 吗',
					confirmText: '确定删除',
					confirmColor: '#FA3534',
					success: function(res) {
						if (res.confirm) {
							list.splice(index, 1)
							this.$u.vuex('vuex_settlement_productList', list);
						}
					}
				});
			},
			getKeyCode(data) {
				console.log('getKeyCode', data.key)
				//this.getCode(data.key)
			},
			//扫码回调 "barcode":"100008961578"
			onUsbBarcode(e) {
				this.barcode = e.barcode;
				console.log('onBarcode:' + JSON.stringify(e));
				this.getCode(e.barcode)
			}

		}
	}
</script>

<style scoped>
	.main_box {
		display: flex;
		width: 100%;
		box-sizing: border-box;

	}

	.left_box {
		width: 700rpx;
		height: 100%;
		background-color: #FAFAFA;

	}

	.left_field_box {
		position: fixed;
		width: 700rpx;
		top: calc(var(--status-bar-height) + 50px);
		left: 0;
		z-index: 999;
		border-right: 1rpx #a8bedd solid;
		background-color: #FAFAFA;
	}

	.right_box {
		flex: 1;
		box-sizing: border-box;
	}

	.top_box {
		height: 100rpx;
		line-height: 100rpx;
		background: #DEDEDE;
	}

	.menu-scroll-view {
		height: calc(100vh - 350rpx - 50px);
		box-sizing: border-box;
	}

	.buttom_box {
		height: 250rpx;
		padding: 20rpx;
		background-color: #DEDEDE;
		box-sizing: border-box;
		overflow: hidden;
	}

	.product-item {
		height: 200rpx;
		border-bottom: 1px #7084DD solid;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		animation: change .5s;
		overflow: hidden;
	}

	.product_title {
		min-height: 70rpx;
	}

	@keyframes change {
		0% {
			background-color: #ffffff)
		}

		100% {
			background-color: #c4e3ff;
		}
	}
</style>
