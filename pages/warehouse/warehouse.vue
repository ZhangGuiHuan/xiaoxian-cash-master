<template>
	<view>
		<my-top-tabbar :current="2"></my-top-tabbar>
		<view class="main-box u-flex u-col-top">
		<!-- 	<view class="left-box">
				<my-menu :current="current" :menu="menu" @change="handleClick"></my-menu>
			</view> -->
			<view class="rigth-box">
				<addProduct v-if="pageKey ==='addProduct'"></addProduct>
				<productList  v-if="pageKey ==='productList'"></productList>
			</view>
		</view>
	</view>
</template>

<script>
	import addProduct from './components/add-product.vue'
	import productList from './components/product-list.vue'
	export default {
		components: {
			productList,
			addProduct
		},
		data() {
			return {
				menu:[
					{name:'库存明细',pageKey:'productList'},
					{name:'商品录入',pageKey:'addProduct'},
				],
				current:0,
				pageKey:'productList'
			}
		},
		methods: {
			handleClick(current,data){
				this.current = current;
				this.pageKey = data.pageKey;
			}
		}
	}
</script>

<style scoped>
.left-box{
}
.rigth-box{
	flex: 1;
	margin: 10px;
	background: #FCFCFC;
	height: calc(100vh - 50px);
}

</style>
