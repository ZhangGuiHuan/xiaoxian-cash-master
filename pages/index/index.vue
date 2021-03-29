<template>
	<view>
		<my-top-tabbar :current="0"></my-top-tabbar>
		<keyboard-listener @keyup="keyboardEvent"></keyboard-listener>
		<view class="main_box">
			<view class="left_box">
				<view class="left_field_box">
					<view class="top_box">
						<u-icon name="scan" size="38"></u-icon>
						<input class="code_input" :disabled="loading" placeholder="请使用扫描枪录入条码"
							placeholder-style="color:#c9cde2" v-model="barcode" @confirm="getInputCode" />
						<u-icon v-show="barcode != ''" name="close-circle" @click="barcode = ''"></u-icon>
					</view>
					<scroll-view scroll-y scroll-with-animation class="menu-scroll-view" show-scrollbar
						:scroll-top="scrollTop">
						<view class="u-tips-color tips-box" v-if="productList.length == 0">
							<image src="/static/notFound.png" mode="aspectFit"></image>
						</view>
						<view v-for="(item,index) in productList" :key="index" class="product-item">
							<view class="product_title u-flex u-col-top">
								<view class="u-line-2 u-flex-1">{{index+1}}# {{item.goodsName}}</view>
								<!-- 删除按钮 -->
								<u-icon name="close-circle" class="u-m-t-10" @click="deletePro(item,index)"></u-icon>
							</view>
							<view class="u-font-12 u-p-t-5">
								编号：{{item.code}}
							</view>
							<view class="u-flex">
								<view class="u-price u-flex-1">
									{{item.marketingPrice}}
								</view>
								<u-number-box v-model="item.number" :min="1" :max="999" color="#7084DD"
									@change="changeNumber"></u-number-box>
							</view>
						</view>

						<!-- 占位view -->
						<view style="height: 400rpx;"></view>

					</scroll-view>
					<view class="buttom_box">
						<view class="u-flex">
							<view class="u-flex-1 u-p-b-20 u-p-l-20">
								导 购 员 ：{{vuex_nick_name}}
							</view>

							<view class="u-p-r-20">
								应 收：<text class="u-price">{{totalAmount}}</text>
							</view>
						</view>
						<view class="u-flex u-p-b-20">
							<view class="u-flex-1 u-flex u-p-b-20">
								<view class="u-p-r-20 u-p-l-20">
									打印小票
								</view>
								<u-checkbox name="1" v-model="print"></u-checkbox>
							</view>
							<view class="u-p-r-20">
								实 收：<text class="u-price">{{totalAmount}}</text>
							</view>
						</view>
						<view class="u-flex u-row-between">
							<u-button ripple size="medium" type="primary" @click="payfun('member')">会 员</u-button>
							<u-button ripple size="medium" type="primary" @click="createOrder('scan')">扫 码</u-button>
							<u-button ripple size="medium" icon="money" type="warning" @click="createOrder">现 金
							</u-button>
						</view>
					</view>
				</view>
			</view>
			<view class="right_box">
				<product v-if="pagesKey ==='product'"></product>
				<member v-if="pagesKey ==='member'" @change="handleClick"></member>
				<addmember v-if="pagesKey ==='addmember'"></addmember>
			</view>
		</view>

		<u-modal v-model="showPopup" title="订单二维码" width="430px" @confirm="clearCode">
			<view class=" u-m-20 u-text-center">
				<tki-qrcode ref="qrcode" :val="qrcodeText" :size="400" :loadMake="true" />
				<text class="u-font-14 u-tips-color">请使用APP扫码完成支付</text>
			</view>
		</u-modal>

	</view>
</template>

<script>
	import keyboardListener from '@/components/keyboard-listener/keyboard-listener.vue';
	import product from './components/product.vue';
	import member from './components/member.vue';
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	var code = '';
	var lastTime, nextTime;
	var lastCode, nextCode;
	export default {
		components: {
			keyboardListener,
			product,
			member,
			tkiQrcode
		},
		data() {
			return {
				loading: false,
				showPopup: false,
				qrcodeText: '',
				barcode: '',
				focus: false,
				scrollTop: 0,
				pagesKey: 'product', //product:商品列表, member:会员
				productList: [],
				print: true,
				barcode1: ''
			}
		},
		computed: {
			// 购买商品总金额
			totalAmount() {
				let totalPrice = 0.00;
				for (var i = 0; i < this.productList.length; i++) {
					totalPrice += this.productList[i].number * this.productList[i].marketingPrice;
				}
				return totalPrice.toFixed(2)
			},
		},
		onLoad(data) {
			this.productList = uni.getStorageSync('productList') || [];
		},
		methods: {
			//手动输入
			getInputCode(data){
				//console.log(data)
				this.getCode(data.detail.value)
			},
			//查询商品
			getCode(barCode) {
				if (!barCode) return false;
				if (this.loading) {
					this.$u.toast('操作太频繁,请稍等')
					this.barcode = '';
					return false;
				} else {
					this.loading = true
				}
				//检查重复
				for (var i = 0; i < this.productList.length; i++) {
					if (barCode == this.productList[i].code) {
						this.productList[i].number++;
						this.$u.toast('商品已存在');
						this.loading = false;
						setTimeout(()=>{
							this.barcode = '';
						},1000)
						return;
					}
				}
				this.$u.get('/goods/findGoodsByCode', {
					code: barCode
				}).then(res => {
					this.loading = false;
					let list = this.productList;
					let productData = res;
					productData.number = 1;
					this.productList.push(productData)
					uni.setStorageSync('productList', this.productList)
					this.scrollTop += 200;
					this.barcode = '';
					code = '';
				}).catch(() => {
					this.loading = false;
					this.$u.toast('没有找到商品')
					setTimeout(()=>{
						this.barcode = '';
					},1000)
				})

			},
			changeNumber(data) {
				uni.setStorageSync('productList', this.productList)
			},
			payfun(key) {
				this.pagesKey = key
			},
			deletePro(item, index) {
				let list = this.productList;
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除： ' + item.goodsName + ' 吗',
					confirmText: '确定删除',
					confirmColor: '#FA3534',
					success: function(res) {
						if (res.confirm) {
							_this.productList.splice(index, 1)
							uni.setStorageSync('productList', _this.productList)
						}
					}
				});
			},
			//生成订单
			createOrder(payType) {
				if (this.productList.length == 0) {
					return false;
				}
				this.loading = true;
				let orderlist = {}
				for (var i = 0; i < this.productList.length; i++) {
					let key = this.productList[i].code;
					let number = this.productList[i].number;
					orderlist[key] = number;
				}
				orderlist = JSON.stringify(orderlist)
				this.$u.post('/order/addOrderInfo', {
					orderlist
				}).then(res => {
					this.loading = false;
					this.productList = []
					uni.removeStorageSync('productList')

					//扫码支付
					if (payType === 'scan') {
						let orderObj = {
							orderId: res.orderId
						}
						this.qrcodeText = JSON.stringify(orderObj)
						this.showPopup = true;
					} else {
						uni.showModal({
							content: '订单已生成！',
							showCancel: false
						})

					}
				}).catch(res => {
					this.loading = false;
					uni.showModal({
						content: res.data,
						showCancel: false
					})
				})
			},
			//清除二维码ww
			clearCode() {
				this.$refs.qrcode._clearCode();
				this.qrcodeText = '';
			},
			handleClick(pagesKey) {
				console.log(pagesKey)
				this.pagesKey = pagesKey;
			},
			//检测扫码枪输入还是手动输入
			keyboardEvent(keyEvent) {
				if(isNaN(keyEvent.key) && keyEvent.key !== 'Enter'){
					return false;
				}
				nextCode = keyEvent.key;
				nextTime = new Date().getTime();
				if (lastCode != null && lastTime != null && nextTime - lastTime   <= 300) {
					code += lastCode;
				} else if (lastCode != null &&	lastTime != null && nextTime - lastTime > 300) {
					code = '';
				}
				lastCode = nextCode;
				lastTime = nextTime;
				if(keyEvent.key === 'Enter' && code){
					console.log(this.barcode)
					this.barcode = code;
					this.getCode(code);
				}

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
		background: #E1E6FE;
		display: flex;
		font-weight: bold;
		padding-left: 20rpx;
		padding-right: 20rpx;
		width: 100%;
		box-sizing: border-box;
		align-items: center;
		color: #123671;
	}

	.code_input {
		margin: 0 20rpx;
		flex: 1;
		border: 1px #c9cde2 solid;
		padding: 10rpx;
		border-radius: 5rpx;
		background: rgb(248, 248, 248);
	}

	.code_input:focus {
		outline: none;
		border: 1px solid red;
	}

	.menu-scroll-view {
		height: calc(100vh - 350rpx - 50px);
		box-sizing: border-box;
	}

	.buttom_box {
		width: 699rpx;
		height: 250rpx;
		padding: 20rpx;
		background-color: #E1E6FE;
		box-sizing: border-box;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
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
		color: #37478c;
	}

	.tips-box {
		text-align: center;
		margin-top: 100rpx;
	}

	.tips-box image {
		width: 300rpx;
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
