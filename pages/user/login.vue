<template>
	<view class="page">
		<view class="login-box">
			<view class="title_des">欢迎使用小鲜收银系统</view>
			<view class="title_des_en">Welcome to the xiaoxian cashier system</view>
			<view class="form">
				<view class="form_title">用户登录</view>
				<u-form :model="form" ref="form" :rules="rule" label-width="50" style="margin: 0 auto;">
					<u-form-item prop="username" label=" " left-icon="account" style="background: white;padding: 5px 10px;">
						<u-input v-model="form.username" maxlength="20" trim  placeholder="请输入账号"
						 confirm-type="next" @confirm="focus = true" />
					</u-form-item>
					<u-form-item prop="password" label=" " left-icon="lock" style="background: white;padding: 5px 10px;margin-top: 20px;">
						<u-input v-model="form.password" maxlength="20" type="password" trim  placeholder="请输入密码" confirm-type="next"
						 @confirm="startLogin" />
					</u-form-item>
				</u-form>
				<view class="u-p-t-30">
					<u-button type="primary" @click="startLogin" :loading="loading" style="letter-spacing: 10px;font-weight: bold;">登 录</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//	import { login } from '@/api/system/login.js'
	export default {
		data() {
			return {
				form: {
					username: 'admin', //用户/电话
					password: '123456', //密码
				},
				focus: false,
				loading: false, //是否加载旋转
				menulist: [],
				url: '',
				rule: {
					username: [{
						required: true,
						message: '账号不能为空',
						trigger: ['change', 'blur'],
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: ['change', 'blur'],
					} ],
				}
			};
		},
		onLoad() {
			/* let token = this.$storage.getToken() || '';
			let exp = this.$storage.getLoginOut() || false;
			if (token || exp) {
				this.$u.toast('欢迎回来！')
				uni.switchTab({
					url: '../index/index'
				})
			} else {
				this.$storage.cleanUserInfo()
			} */
		},
		onReady() {
			this.$refs.form.setRules(this.rule);
		},
		destroyed() {
			uni.hideKeyboard();
		},
		methods: {
			goTo(url) {
				uni.navigateTo({
					url: url
				})
			},

			startLogin() {
			
				uni.hideKeyboard();
				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true;
						uni.navigateTo({
							url:'../index/index'
						})
					}
				})
				
			},
		}
	};
</script>

<style scoped>
	.page {
		background-image: url(/static/login_back.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.login-box {
		padding-top: 150px;
	}
	.title_des {
		font-size: 44px;
		font-weight: bold;
		color: #3F56BC;
		line-height: 44px;
		text-align: center;
		letter-spacing: 10px;
	}
	.title_des_en{
		font-size: 20px;
		font-weight: 400;
		color: #6984f9;
		line-height: 44px;
		text-align: center;
		letter-spacing: 4px;
	}
	.form{
		width: 800rpx;
		padding: 20px;
		background-color: #e8eff9;
		opacity: 0.8;
		border-radius: 10px;
		margin: 0 auto;
		box-sizing: border-box;
	}
	

	
	.form_title{
		font-size: 25px;
		font-weight: 600;
		text-align: center;
		padding-bottom: 20px;
	}
	.footer {
		font-size: 28rpx;
		color: #9db1c5;
		text-align: center;
		margin-top: 20px;
	}

	.forget {
		margin-top: 10px;
		text-align: right;
	}
</style>
