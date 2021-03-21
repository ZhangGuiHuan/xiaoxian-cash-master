<template>
	<view class="member">
		<view class="search u-flex u-row-between">
			<view class="u-p-r-20">
				会员信息
			</view>
			<view class="" style="width: 900rpx;">
				<u-search placeholder="输入会员信息"></u-search>
			</view>
		</view>

		<view class="u-p-20">
			<u-form ref="form" label-width="200">
				<u-form-item label="会员名称 :">
					<text class="u-main-color">121212</text>
				</u-form-item>
				<u-form-item label="会员号码 :">
					<text class="u-main-color">121212</text>
				</u-form-item>
				<u-form-item label="累计消费 :">
					<text class="u-price">121212</text>
				</u-form-item>
				<u-form-item label="返 利 :">
					<text class="u-price">121212</text>
				</u-form-item>
			</u-form>
			<u-button size="medium">修改</u-button>
		</view>
		
		<u-popup v-model="showPopup" mode="center" width="900" closeable :mask-close-able="false">
			<view class="u-p-60">
				<view class="u-p-b-20">添加会员</view>
				<u-form ref="form" label-width="200">
					<u-form-item label="会员名称 :">
						<u-input border placeholder="会员名称"></u-input>
					</u-form-item>
					<u-form-item label="会员号码 :">
						<u-input border placeholder="会员号码"></u-input>
					</u-form-item>
					<u-form-item label="提示 :">
						<text>请核实会员号码，确保输入无误</text>
					</u-form-item>
				</u-form>
				<view class="u-p-t-60">
					<u-button type="primary">添加</u-button>
				</view>
			</view>
		</u-popup>
				
		<u-button class="addmember" type="primary" size="medium" @click="showPopup = true">添加会员</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPopup:false,
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.member{
		width: 100%;
	}
	.search {
		padding: 10rpx;
		background-color: #E1E6FE;
		height: 100rpx;
		box-sizing: border-box;
	}
	.addmember{
		position: absolute;
		bottom: 50rpx;
		right: 50rpx;
	}
</style>
