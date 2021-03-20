<template>
	<view class="main_box">
		<view class="left_box">
			<input auto-focus :focus="focus" v-model="input" @confirm="getCode" style="position: absolute;top: -100px;"/>
			<!-- <keyboard-listener @keyup="getCode"></keyboard-listener> -->
			<view class="u-flex u-p-20 top_box">
				<view class="u-p-r-20" style="color: #3F56BC;">
					客单号
				</view>
				<view class="u-flex-1">
					9999999999
				</view>
				<view class="">已选：0</view>
			</view>
			<scroll-view scroll-y scroll-with-animation class="menu-scroll-view" show-scrollbar 
			:scroll-top="scrollTop">
				<view v-for="(item,index) in list" :key="index" class="product-item">
					<view class="product_title u-flex u-col-top">
						<view class="u-line-2 u-flex-1">{{item.name}}</view>
						<u-icon name="close-circle" class="u-m-t-10"></u-icon>
					</view>
					<view class="u-price u-p-t-10 u-p-b-10">
						{{item.price}}
					</view>
					<view class="u-flex">
						<view class="u-font-14 u-line-1 u-flex-1">
							商品编号：{{item.ordersn}}
						</view>
						<u-number-box v-model="item.num" color="#7084DD"></u-number-box>
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
						应  收：1212
					</view>
					<view class="">
						实收：232
					</view>
				</view>
				<view class="u-flex u-p-20">
					<u-button style="width: 100rpx;" size="medium" type="primary">会员</u-button>
					<u-button style="width: 100rpx;" size="medium" type="primary">现金</u-button>
					<u-button style="width: 100rpx;" size="medium" type="primary">扫码</u-button>
				</view>
			</view>
		</view>
		<view class="right_box">
			<product v-if="pagesKey ==='product'"></product>
			<member v-if="pagesKey ==='member'"></member>
			<addmember v-if="pagesKey ==='addmember'"></addmember>
		</view>
	</view>
</template>

<script>
	import keyboardListener from '@/components/keyboard-listener/keyboard-listener.vue'
	import product from './components/product.vue'
	import member from './components/member.vue'
	import addmember from './components/addmember.vue'
	export default {
		components: {
		  keyboardListener,
		  product,
		  member,
		  addmember
		},
		data() {
			return {
				input:'',
				list:[],
				focus:false,
				scrollTop:200,
				pagesKey:'product'//product:商品列表, member:会员, addmember:添加会员
			}
		},
		onLoad(data) {
			this.focus = true
			this.pagesKey = data.pagesKey || 'product'
			uni.hideKeyboard();
		},
		methods: {
			getCode(data){
				uni.showToast({
					title:'扫描成功：'+data.detail.value,
				})
				this.scrollTop += 200
				this.list.push({
					name:'芝士焗龙虾5斤装',
					price:9999,
					num:1,
					ordersn:data.detail.value
				})
				this.input = ''
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
	
	.left_box{
		width: 400px;
		height: 100%;
		background-color: #FAFAFA;
	}
	.right_box{
		flex: 1;
		
	}
	.top_box{
		height: 100rpx;
		background: #DEDEDE;
	}
	.menu-scroll-view{
		height: calc(100vh - 300rpx - 50px);
		box-sizing: border-box;
	}
	.buttom_box{
		height: 200rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	.product-item{
		height: 200rpx;
		border-bottom: 1px #7084DD solid;
		padding: 20rpx;
		box-sizing: border-box;
		animation: change 1s linear;	
	}
	@keyframes change {	
			0% {
				background-color: #beffff)
			}
			100% {background-color: #c4e3ff;}	
		}
</style>
