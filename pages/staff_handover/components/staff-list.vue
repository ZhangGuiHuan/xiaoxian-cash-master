<template>
	<view class="content">
		<view class="title">
			<view class="u-flex-1">员工列表</view>
			<u-button type="primary" size="mini" @click="addStaff">录入员工</u-button>
		</view>
		<view>
			<u-table>
				<u-tr>
					<u-th>序号</u-th>
					<u-th>商品名称</u-th>
					<u-th>货号</u-th>
					<u-th>入库成本</u-th>
					<!-- <u-th>在库状态</u-th> -->
					<u-th>存量</u-th>
					<u-th>订单时间</u-th>
					<u-th>操作</u-th>
				</u-tr>
				<u-tr v-for="(item,key) in productList" :key="key">
					<u-td>{{key+1}}</u-td>
					<u-td>{{item.goodsName}}</u-td>
					<u-td>{{item.code}}</u-td>
					<u-td>{{item.originalPrice}}</u-td>
					<!-- <u-td>--</u-td> -->
					<u-td>{{item.inventory}}</u-td>
					<u-td>{{item.addTime}}</u-td>
					<u-td>
						<view v-if="current === 0" class="u-type-primary-dark">下架</view>
						<view v-else class="u-type-primary-dark">查看</view>
					</u-td>
				</u-tr>
			</u-table>
			<my-pagination :page.sync="form.homepageItem" :pageSize="10" :total="count" @change="getList"></my-pagination>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				productList: [],
				count: 0,
				search:'',
				form: {
					tydUuid : ''
				}
			}
		},
		mounted() {
			this.getList(1)
		},
		methods: {
			change(data){
				this.current = data;
				this.getList(1)
			},
			//员工列表
			getList(homepageItem) {
				
				this.$u.post('/staff/staffList', {tydUuid:this.vuex_uuid}).then(res => {
					this.productList = res.tydGoods;
					this.count = res.count
				}).catch(() => {
					this.$u.toast('加载失败')
				})
				
			},
			addStaff(){
				this.$emit('addStaff')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.title {
			background: #E1E6FE;
			padding: 20rpx;
			display: flex;
		}

	}
</style>
