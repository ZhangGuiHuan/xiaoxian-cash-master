<template>
	<view class="noData hideToShow">
		<view class="image">
			<image src="/static/notFound.png"></image>
		</view>
		<!-- 网络连接失败默认显示内容 -->
		<view class="content">
			<text class="title">{{ mainText }}</text>
			<text class="desc">{{ viceText }}</text>
			<!-- #ifdef MP -->
			<!-- <button class="btn" type="default" @tap="setting(true)">刷新试试</button> -->
			<!-- #endif -->
			<button class="btn" type="default" @tap="setting()">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainText: '该页面不存在',
				viceText: '请检查数据是否正确',
			};
		},
		methods: {
			setting(status) {
				uni.navigateBack({
					delta:1
				})
			}
		}
	};
</script>

<style lang="less" scoped>
	.noData {
		width: 100%;
		height: 100vh;
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: #eff2f7;
		.image {
			
		}

		.content {
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			letter-spacing: 1upx;

			.title {
				font-size: 36upx;
				color: #373a40;
			}

			.desc {
				font-size: 28upx;
				margin-top: 6upx;
				color: #8b8b8b;
			}

			.btn {
				width: 160upx;
				height: 65upx;
				color: #868d91;
				font-size: 24upx;
				margin-top: 34upx;
				border-radius: 36upx;
				border: 1upx solid #d4d4d4;
			}

			.btn::after {
				border: none;
			}
		}
	}
</style>
