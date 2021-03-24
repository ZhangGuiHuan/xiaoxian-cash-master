<template>
	<view class="top_tabbar_box">
		<view class="top_tabbar">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view class="u-flex">
				<view class="logo-box">
					<image src="/static/logo.png"></image>
					<view style="letter-spacing: 10rpx;">小鲜收银台</view>
				</view>
				<view class="tabbar u-flex-1 u-m-r-10 u-flex">
					<view class="tabbar_item" :class="current === index || curRoute === item.url ? 'tabbar_active':''" v-for="(item,index) in list"
						:key="index" @click="handleClick(index)">
						{{item.name}}
					</view>
				</view>
				<view class="logout" @click="logout">
					<text>退出</text>
					<image style="width: 15px;height: 15px;" src="/static/tui.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUrl} from '../../utils/getUrl.js'
	export default {
		props:{
			current:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				showOut: false,
				curRoute:'',
				list: [{
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
			}
		},
		
		methods: {
			handleClick(data) {
				//this.current = data;
				//this.$u.vuex('vuex_tabbar_current',data)
				uni.navigateTo({
					url: this.list[data].url
				})
			},
			logout() {
				uni.showModal({
				    title: '提示',
				    content: '确定要退出登录吗',
				    success: function (res) {
				        if (res.confirm) {
				           uni.reLaunch({
				           	url: '/pages/user/login'
				           })
				        }
				    }
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top_tabbar_box{
		height: calc(var(--status-bar-height) + 50px);
	}
	.top_tabbar {
		background: #3F56BC;
		height: calc(var(--status-bar-height) + 50px);
		width: 100%;
		min-width: 800px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.logo-box {
		width: 500rpx;
		line-height: 50px;
		font-weight: bold;
		color: #c5e6ff;
		font-size: 22px;
		display: flex;
		align-items: center;
		padding-left: 20px;
	}

	.logo-box image {
		width: 28px;
		height: 28px;
		margin-right: 20px;
	}

	.logout {
		color: #FFFFFF;
		letter-spacing: 5px;
		padding-right: 10px;
	}

	.logout text,
	image {
		vertical-align: middle;
	}

	.tabbar {
		height: 50px;
		box-sizing: border-box;
		align-items: flex-end;
		padding-bottom: 1px;
	}

	.tabbar_item {
		width: 200rpx;
		height: 40px;
		background: #778EF6;
		border-radius: 8px 8px 0px 0px;
		text-align: center;
		line-height: 40px;
		color: #e7e7e7;
		font-size: 14px;
	}

	.tabbar_active {
		background: #232C58 !important;
		color: #ffffff;
		font-weight: 700;
		font-size: 16px;
	}
</style>
