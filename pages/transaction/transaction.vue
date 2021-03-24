<template>
	<view>
		<my-top-tabbar :current="1"></my-top-tabbar>
		<view class="main-box u-flex u-col-top">
			<view class="left-box">
				<my-menu :current="current" :menu="menu" @change="handleClick"></my-menu>
			</view>
			<view class="rigth-box">
				<sales-order v-if="pageKey ==='salesOrder'"></sales-order>
				<bank-flow  v-if="pageKey ==='bankFlow'"></bank-flow>
				<order-detail v-if="pageKey ==='orderDetail'"></order-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import salesOrder from './components/sales-order.vue'
	import orderDetail from './components/order-detail.vue'
	import bankFlow from './components/bank-flow.vue'
	export default {
		components: {
		  salesOrder,
		  orderDetail,
		  bankFlow
		},
		data() {
			return {
				menu:[
					{name:'销售订单查询',pageKey:'salesOrder'},
					{name:'收银流水查询',pageKey:'bankFlow'},
				],
				current:0,
				pageKey:'salesOrder'
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
