<template>
	<view class="login-box">
		<view class="main1">
			<view class="title_des u-text-center">E R P 系 统 - 忘记密码</view>
			<view class="item">
				<u-icon name="account" color="#2979ff" size="28"></u-icon>
				<u-input v-model="form.username" class="main-input" placeholder="用户名" confirm-type="next" />
			</view>
			<view class="item">
				<u-icon name="account-fill" color="#2979ff" size="28"></u-icon>
				<u-input v-model="form.password" class="main-input" placeholder="员工姓名" confirm-type="next" />
			</view>
		</view>
		<view class="login_btn_box">
			<u-button shape="" type="primary" @click="startLogin" :disabled="form.username == '' || form.password == '' || loading">重置密码</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					username:'',//用户/电话
					password:''//密码
				},
				loading: false //是否加载旋转
			};
		},
		destroyed() {
			uni.hideKeyboard();
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			toLogin() {
				uni.showLoading({
					title:"登 录 中"
				});
				this.loading = true;
				
			},
			getUserInfo() {
				
			},
		
			startLogin() {
				if (this.form.username.length == 0) {
					uni.showToast({
						title:'请输入账号',
						icon:'none'
					});
					return;
				}
				if (this.form.password.length < 1) {
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					});
					return;
				}
				this.toLogin();
			},
		}
	};
</script>

<style lang="scss">
	.login-box{
		padding: 20rpx;
		max-width: 450px;
		margin: 20rpx auto;
		.main1{
			.title_des {
				font-weight: bold;
				color: #3F536E;
				font-size: 32px;
				margin-bottom: 32px;
			}
			.title_des2 {
				color: $uni-color-primary;
				font-size: 22rpx;
			}
		}
	}

	.login_btn_box{
		margin: 10px auto;
	}
	.item {
		line-height: 40px;
		display: flex;
		border-bottom: 1px solid #eeeeee;
		align-items: center;
		margin: 20px 10px;
	}


	.main-input {
		flex: 1;
		margin-left: 20rpx;
		font-size: 28rpx;
	}
</style>
