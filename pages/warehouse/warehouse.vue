<template>
	<view class="main-box u-flex u-col-top">
		<view class="left-box">
			<my-menu :current="current" :menu="menu" @change="handleClick"></my-menu>
		</view>
		<view class="rigth-box">
			<addProduct v-if="pageKey ==='addProduct'"></addProduct>
			<!-- <bank-flow  v-if="pageKey ==='bankFlow'"></bank-flow>
			<order-detail v-if="pageKey ==='orderDetail'"></order-detail> -->
		</view>
	</view>
</template>

<script>
	import addProduct from './components/add-product.vue'
	/* import orderDetail from './components/order-detail.vue'
	import bankFlow from './components/bank-flow.vue' */
	export default {
		components: {
			addProduct
		},
		data() {
			return {
				menu:[
					{name:'商品录入',pageKey:'addProduct'},
					{name:'库存明细',pageKey:'bankFlow'},
				],
				current:0,
				pageKey:'addProduct'
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
