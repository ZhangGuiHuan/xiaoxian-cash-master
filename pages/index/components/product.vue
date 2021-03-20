<template>
	<view class="product">
		<view class="search u-flex">
			<view class="u-p-r-10">
				零售商品
			</view>
			<u-search placeholder="输入商品名称，编码，或商品条形码查询"></u-search>
		</view>
		
		<view class="u-p-20 u-flex u-flex-wrap">
			<view class="product_item" v-for="item in 30">
				<u-image width="120" height="120" src="/static/notFound.png"></u-image>
				<view class="title">
					<view class="">商品名称</view>
					<view class="u-price">2323</view>
				</view>
			</view>
		</view>
		<my-pagination :total="20"></my-pagination>
	</view>
</template>

<script>
</script>

<style scoped>
	.search{
		padding: 10rpx;
		background-color: #E1E6FE;
		height: 100rpx;
	}
	.product{
		
	}
	.product_item{
		width: 200rpx;
		height: 200rpx;
		position: relative;
	}
	.title{
		background: #FFFFFF;
		opacity: 0.8;
		position: absolute;
		bottom: 0;
	}
</style>
