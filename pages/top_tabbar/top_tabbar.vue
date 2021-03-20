<template>
	<view class="u-flex page">
		<view class="logo-box">
			<image src="/static/logo.png"></image>
			<view style="letter-spacing: 10rpx;">小鲜收银台</view>
		</view>
		<view class="tabbar u-flex-1 u-m-r-10 u-flex">
			<view class="tabbar_item" :class="current === index ? 'tabbar_active':''" v-for="(item,index) in list" :key="index" @click="handleClick(index)">
				{{item.name}}
			</view>
		</view>
		<view class="logout" @click="showOut = true">
			<text>退出</text>
			<image style="width: 20px;height: 20px;" src="/static/tui.png"></image>
		</view>
		<u-modal v-model="showOut" content="确定要退出登录吗" show-cancel-button @confirm="logout()"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOut:false,
				list: [
					{
						name: '收银机',
						url: '/pages/index/index'
					},
					{
						name: '交易查询',
						url: '/pages/transaction/transaction'
					},
					
					{
						name: '库存管理',
						url: '/pages/warehouse/warehouse'
					},
					{
						name: '员工交接',
						url: '/pages/staff_handover/staff_handover'
					}
				],
				current: 0
			}
		},
		methods: {
			handleClick(data) {
				this.current = data;
				uni.navigateTo({
					url: this.list[data].url
				})
			},
			logout(){
				uni.reLaunch({
					url:'/pages/user/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: #3F56BC;
		height: 100%;
	}

	.logo-box {
		width: 250px;
		line-height: 50px;
		font-weight: bold;
		color: #c5e6ff;
		font-size: 25px;
		display: flex;
		align-items: center;
		padding-left: 20px;
	}

	.logo-box image {
		width: 32px;
		height: 32px;
		margin-right: 20px;
	}

	.logout {
		color: #FFFFFF;
		letter-spacing: 5px;
	}

	.logout text,
	image {
		vertical-align: middle;
	}
	.tabbar{
		height: 50px;
		box-sizing: border-box;
		align-items: flex-end;
		padding-bottom: 1px;
	}
	.tabbar_item{
		width: 150px;
		height: 40px;
		background: #778EF6;
		border-radius: 8px 8px 0px 0px;
		text-align: center;
		line-height: 40px;
		color: #e7e7e7;
		font-size: 14px;
	}
	.tabbar_active{
		background: #232C58 !important;
		color: #ffffff;
		font-weight: 700;
		font-size: 16px;
	}
</style>
