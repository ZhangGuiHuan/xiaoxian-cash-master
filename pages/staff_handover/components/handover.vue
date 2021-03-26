<template>
	<view class="content">
		<view class="title">
			销售报表
		</view>
		<view>
			<u-table>
				<u-tr>
					<u-th>序号</u-th>
					<u-th>商品名称</u-th>
					<u-th>货号</u-th>
					<u-th>售出时间</u-th>
					<u-th>数量</u-th>
					<u-th>收银员</u-th>
					<u-th>单价/件</u-th>
					<u-th>合计/元</u-th>
				</u-tr>
				<u-tr v-for="(item,key) in salesList" :key="key">
					<u-td>{{key+1}}</u-td>
					<u-td>{{item.item_title}}</u-td>
					<u-td>{{item.code}}</u-td>
					<u-td>{{item.create_time}}</u-td>
					<u-td>{{item.item_num}}</u-td>
					<u-td>--</u-td>
					<u-td>--</u-td>
					<u-td>--</u-td>
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
				showModel: false,
				count: 0,
				loading: false,
				salesList:[],
				form: {
					homepageItem :1,
					tydUuid :this.vuex_uuid
				},
			}
		},
		mounted() {
			this.form.tydUuid = this.vuex_uuid;
			this.getList(1)
		},
		methods: {
			//销售列表
			getList(page) {
				this.form.homepageItem = page
				this.$u.get('/staff/salesList', this.form).then(res => {
					this.salesList = res.orderProducts;
					this.count = res.count
				}).catch(e => {
					this.$u.toast('加载失败')
					this.loading = false;
				});
			},
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
