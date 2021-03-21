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
						<!-- 删除按钮 -->
						<u-icon name="close-circle" class="u-m-t-10" @click="deletePro(item,index)"></u-icon>
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
					<u-button style="width: 100rpx;" size="medium" type="primary" @click="payfun('member')">会员</u-button>
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
	export default {
		components: {
		  keyboardListener,
		  product,
		  member,
		},
		data() {
			return {
				input:'',
				list:[],
				focus:false,
				scrollTop:200,
				pagesKey:'product'//product:商品列表, member:会员
			}
		},
		onLoad(data) {
			this.focus = true
			this.pagesKey = data.pagesKey || 'product';
			uni.hideKeyboard();
		},
		methods: {
			getCode(data){
				uni.showToast({
					title:'扫描成功：'+data.detail.value,
				})
				this.list.push({
					name:'芝士焗龙虾5斤装',
					price:9999,
					num:1,
					ordersn:data.detail.value
				})
				this.input = ''
				this.scrollTop += 200
			},
			payfun(key){
				uni.navigateTo({
					url:'/pages/index/index?pagesKey='+key
				})
			},
			deletePro(item,index){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除： '+item.name+ ' 吗',
					confirmText:'确定删除',
					confirmColor:'#FA3534',
				    success: function (res) {
				        if (res.confirm) {
				           _this.list.splice(index,1)
				        }
				    }
				});
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
		border-right: 1px #7084DD solid;
	}
	.right_box{
		flex: 1;
		box-sizing: border-box;
	}
	.top_box{
		height: 100rpx;
		background: #DEDEDE;
		box-sizing: border-box;
	}
	.menu-scroll-view{
		height: calc(100vh - 350rpx - 50px);
		box-sizing: border-box;
	}
	.buttom_box{
		height: 250rpx;
		padding: 20rpx;
		background-color: #DEDEDE;
		box-sizing: border-box;
		overflow: hidden;
	}
	.product-item{
		height: 200rpx;
		border-bottom: 1px #7084DD solid;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		animation: change .5s;	
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
