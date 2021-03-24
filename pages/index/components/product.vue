<template>
	<view class="product">
		<view class="search u-flex">
			<view class="u-p-r-20">
				零售商品
			</view>
			<view class="" style="width: 900rpx;">
				<u-search placeholder="输入商品名称，编码，或商品条形码查询"></u-search>
			</view>
		</view>
		
		<view class="u-p-20 u-flex u-flex-wrap u-row-center" style="min-height: calc(100vh - 50px - 200rpx);">
			<view v-if="productList.length === 0" class="u-m-t-50">暂无商品</view>
			<view class="product_item" v-for="item in productList" :key="item">
				<u-image width="250" height="250" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3174473013,3261457838&fm=26&gp=0.jpg"></u-image>
				<view class="title">
					<view class="u-line-3 u-font-12">商品名称 商品名称 商品名称</view>
					<view class="u-price u-text-right">2323</view>
				</view>
			</view>
		</view>
		<my-pagination v-show="count>0"  :page.sync="homepageItem"  :total="count" @change="getList"></my-pagination>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPopup:false,
				homepageItem:1,
				count:0,
				productList:[]
			}
		},
		mounted() {
			this.getList(1)
		},
		methods: {
			//商品列表
			getList(homepageItem){
				this.homepageItem = homepageItem;
				this.$u.get('/goods/goodsList',{homepageItem}).then(res=>{
					this.productList = res.tydGoods;
					this.count = res.count;
				}).catch(()=>{
					this.$u.toast('加载失败')
				})
			}
		}
	}
</script>

<style scoped>
	.search{
		padding: 10rpx;
		background-color: #E1E6FE;
		height: 100rpx;
		box-sizing: border-box;
	}
	.product{
		background: #ebf7ff;
		min-height: calc(100vh - 50px);
	}
	.product_item{
		width: 250rpx;
		height: 250rpx;
		position: relative;
		margin: 10rpx;
		background: #ffffff;
	}
	.title{
		background: rgb(0,0,0,1);
		opacity: 0.8;
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 5rpx;
		color: #FFFFFF;
		box-sizing: border-box;
	}
</style>
