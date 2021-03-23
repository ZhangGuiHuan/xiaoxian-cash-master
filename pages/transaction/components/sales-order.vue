<template>
	<view class="content">
		<view class="title">
			销售订单
		</view>
		<view class="u-p-b-10 u-p-t-10 u-flex">
			<my-select :list="list" :initValue="'订单号'" :style_Container="{width:'120px'}" :clearable="false" />
			<u-input style="width: 120px;" placeholder="订单号" border></u-input>
			<my-select :list="salesList" :initValue="'销售'" :style_Container="{width:'120px'}" :clearable="false" />
			<my-select :list="order" :initValue="'已完成'" :style_Container="{width:'120px'}" :clearable="false" />
			<u-input placeholder="选择时间" type="select" @click="showPicker = true" border></u-input>
			<u-button type="primary">查询</u-button>
		</view>
		<u-calendar :closeable="false" v-model="showPicker" mode="range" @change="change"></u-calendar>

		<view>
			<u-table>
				<u-tr>
					<u-th>序号</u-th>
					<u-th>订单号</u-th>
					<u-th>交易类型</u-th>
					<u-th>收款方式</u-th>
					<u-th>订单金额</u-th>
					<u-th>订单实收</u-th>
					<u-th>订单时间</u-th>
					<u-th>导购员</u-th>
					<u-th>会员手机号</u-th>
					<u-th>操作</u-th>
				</u-tr>
				<u-tr v-for="(item,key) in orderProducts" :key="key">
					<u-td>{{key+1}}</u-td>
					<u-td>{{item.orderId}}</u-td>
					<u-td>{{item.order_type}}</u-td>
					<u-td>{{item.order_type}}</u-td>
					<u-td>{{item.product_total_money}}</u-td>
					<u-td>{{item.pay_money}}</u-td>
					<u-td>{{item.order_time}}</u-td>
					<u-td>{{item.salesman}}</u-td>
					<u-td>{{item.pay_order_num}}</u-td>
					<u-td>
						<view class="u-type-primary-dark">撤销</view>
					</u-td>
				</u-tr>
			</u-table>
			<my-pagination :page.sync="form.homepageItem" :pageSize="20" :total="count" @change="getList"></my-pagination>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['订单号', '商品条码', '会员手机'],
				salesList: ['销售', '退款'],
				order: ['已完成', '退款'],
				showPicker: false,
				orderProducts: [],
				count: 0,
				form: {
					date: '',
					state: '',
					end: '',
					order_status: '',
					parameter1: '',
					homepageItem: 1
				}
			}
		},
		mounted() {
			this.getList(1)
		},
		methods: {
			//列表
			getList(homepageItem) {
				this.form.homepageItem = homepageItem;
				this.$u.get('/order/orderList', this.form).then(res => {
					this.orderProducts = res.orderProducts;
					this.count = res.count
				}).catch(() => {
					this.$u.toast('加载失败')
				})
			},
			change(data) {
				console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.title {
			background: #E1E6FE;
			padding: 10px;
		}

	}
</style>
