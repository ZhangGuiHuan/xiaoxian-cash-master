<template>
	<view class="content">
		<view class="title">
			销售订单
		</view>
		<view class="u-p-b-10 u-p-t-10 u-flex">
			<my-select :list="list" :initValue="'订单号'" :style_Container="{width:'120px'}":clearable="false"/>
			<u-input  style="width: 120px;" placeholder="订单号" border></u-input>
			<my-select :list="salesList" :initValue="'销售'" :style_Container="{width:'120px'}" :clearable="false"/>
			<my-select :list="order" :initValue="'已完成'" :style_Container="{width:'120px'}" :clearable="false"/>
			<u-input placeholder="选择时间" type="select" @click="showPicker = true" border></u-input>
			<u-button type="primary">查询</u-button>
		</view>
		<u-calendar :closeable="false" v-model="showPicker" mode="range"  @change="change"></u-calendar>
		
		<view class="">
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
					<u-tr>
						<u-td>1</u-td>
						<u-td>23232323</u-td>
						<u-td>22</u-td>
						<u-td>浙江大学</u-td>
						<u-td>二年级</u-td>
						<u-td>22</u-td>
						<u-td>二年级</u-td>
						<u-td>22</u-td>
						<u-td>浙江大学</u-td>
						<u-td>22</u-td>
					</u-tr>
					<u-tr>
						<u-td>2</u-td>
						<u-td>2323211113232323</u-td>
						<u-td>22</u-td>
						<u-td>浙江大学</u-td>
						<u-td>二年级</u-td>
						<u-td>22</u-td>
						<u-td>二年级</u-td>
						<u-td>22</u-td>
						<u-td>浙江大学</u-td>
						<u-td>22</u-td>
					</u-tr>
				</u-table>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['订单号', '商品条码', '会员手机'],
				salesList:['销售','退款'],
				order:['已完成','退款'],
				showPicker:false,
			}
		},
		methods: {
			change(data){
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
