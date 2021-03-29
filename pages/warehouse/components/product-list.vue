<template>
	<view class="content">
		<view class="title">
			<u-subsection style="width: 400rpx;margin-right: 20rpx;" active-color="#7da0ff" 
			:list="[{name:'在库'},{name:'出库'}]" :current="current" @change="change"></u-subsection>
			<u-search 
				placeholder="输入品名，货号，条码查询" 
				v-model="search"
				@search="getSearch" 
				shape="squre"
				:action-style="{background:'#3F56BC',color:'white',padding:'10rpx',width:'100rpx'}"
				>
			</u-search>
		</view>
		<view class="u-p-b-10 u-p-t-10">
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
			<my-pagination :page.sync="form.homepageItem" :pageSize="20" :total="count" @change="getList"></my-pagination>
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
					homepageItem: 1
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
			getSearch(){
			},
			//出库列表
			getList(homepageItem) {
				this.form.homepageItem = homepageItem;
				if(this.current === 0){
					this.$u.get('/goods/inventoryList', this.form).then(res => {
						this.productList = res.tydGoods;
						this.count = res.count
					}).catch(() => {
						this.$u.toast('加载失败')
					})
				}else{
					this.$u.get('/goods/outInventoryList', this.form).then(res => {
						this.productList = res.tydGoods;
						this.count = res.count
					}).catch(() => {
						this.$u.toast('加载失败')
					})
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.title {
			background: #E1E6FE;
			padding: 10rpx;
			display: flex;
		}

	}
</style>
