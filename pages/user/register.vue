<template>
	<view class="page">
		<view class="title">注册</view>
		<u-form :model="form" :rules="rules" ref="form" label-width="160" :errorType="errorType">
			<u-form-item label-width="125" label="单位代码" prop="collegeCode" required>
				<view class="u-flex">
					<u-icon @click="getTips" class="u-m-r-10" name="info-circle-fill" color="#2b85e4" size="28"></u-icon>
					<u-input class="u-flex-1" type="select" :select-open="showPicker" v-model="form.collegeCode" placeholder="请选择单位代码"
					 @click="showPicker = true"></u-input>
				</view>
			</u-form-item>
			<u-form-item label="真实姓名" prop="usersRealname" required>
				<u-input v-model="form.usersRealname" placeholder="请输入真实姓名"></u-input>
			</u-form-item>

			<u-form-item label="电子邮箱" prop="email" required>
				<u-input :passwordIcon="false" v-model="form.email" placeholder="请输入电子邮箱"></u-input>
			</u-form-item>
			<u-form-item label="用户名" prop="username" required>
				<u-input v-model="form.username" placeholder="请输入用户名"></u-input>
			</u-form-item>
			<u-form-item label="密码" prop="password" required>
				<u-input type="password" :passwordIcon="false" v-model="form.password" placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item label="确认密码" prop="confirm" required>
				<u-input type="password" :passwordIcon="false" v-model="form.confirm" placeholder="请确认密码"></u-input>
			</u-form-item>
			<u-form-item label="手机号码" prop="usersMobile" required>
				<u-input v-model="form.usersMobile" placeholder="请输入手机号码"></u-input>
			</u-form-item>
			<u-form-item label="短信验证码" prop="code" required>
				<view class="u-flex">
					<u-input class="u-m-r-10 u-flex-1" v-model="form.code" placeholder="请输入验证码"></u-input>
					<u-button type="primary" size="mini" @click="getCode">{{codeText}}</u-button>
				</view>
			</u-form-item>
			<u-form-item label="备注" prop="userremarks">
				<u-input placeholder="填写备注" v-model="form.userremarks" />
			</u-form-item>
		</u-form>
		<view class="protocol" @click="onJumpPage('./protocol')">
			注册代表您已同意
			<text>《用户协议》</text>
		</view>

		<view class="btn_box">
			<button @click="onSubmit" :loading="loading" :disabled="loading">注册</button>
		</view>

		<u-modal v-model="showModal">
			<view class="slot-content u-m-20 u-font-14">
				<view>1. 单位代码可以向您所在的单位索取。</view>
				<view>2.如果您是独立用户，请与我们联系，联系电话：020-89059833</view>
			</view>
		</u-modal>
		<u-picker :range="collegeCode" mode="selector" v-model="showPicker" range-key="code" @confirm="handleConfirm"></u-picker>
	</view>
</template>
<script>
	import {
		registeredJump,
		sendRegisterSMS,
		registerPost,
		accountSole,
		usersMobileSole,
		emailSole
	} from '@/api/system/login.js';
	export default {
		data() {
			return {
				loading: false,
				form: {
					userCollegeId: null,
					collegeCode: null,
					username: null,
					usersRealname: null,
					usersMobile: null,
					password: null,
					confirm: null, //确认密码
					code: null, //验证码
					email: null,
					userremarks: null
				},
				errorType: ['message', 'border-bottom', 'toast'],
				rules: {
					collegeCode: [{
						required: true,
						message: '请选择单位代码',
						trigger: 'change'
					}],
					usersRealname: [{
						required: true,
						message: '请输入真实姓名',
						trigger: 'blur',
					}],
					usersMobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur',
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: 'blur',
						},
						{
							asyncValidator: (rule, value, callback) => {
								usersMobileSole({
									usersMobile: value
								}).then(res => {
									// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
									if (res.code === 200) {
										callback();
									} else {
										callback(new Error('该手机号码已使用'));
									}
								}).catch(() => {
									callback(new Error('该手机号码已使用'));
								})
							},
						}
					],
					username: [
						// 必填规则
						{
							required: true,
							message: '请输入用户名',
							trigger: ['blur', 'change'],
						},
						// 正则判断
						{
							pattern: /^[a-zA-Z]+[\d\w]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '由字母数字下划线组成且开头必须为字母',
							trigger: ['blur', 'change'],
						},
						// 6-8个字符之间的判断
						{
							min: 4,
							max: 16,
							message: '4-16个字符，可使用字母、数字、下划线',
							trigger: ['blur', 'change'],
						},
						{
							asyncValidator: (rule, value, callback) => {
								accountSole({
									username: value
								}).then(res => {
									// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
									if (res.code === 200) {
										callback();
									} else {
										callback(new Error('该用户名已使用'));
									}
								}).catch(() => {
									callback(new Error('该用户名已使用'));
								})
							},
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					confirm: [{
							required: true,
							message: '请重新输入密码',
							trigger: 'blur',
						},
						{
							validator: (rule, value, callback) => {
								return value === this.form.password;
							},
							message: '两次输入的密码不相等',
							trigger: 'blur',
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur',
						},
						{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// this.$u.test.mobile()就是返回true或者false的
							if (!value) {
								return true;
							} else {
								return this.$u.test.email(value);
							}
						},
						message: '邮箱不正确',
						trigger: 'blur',
					},
					{
						asyncValidator: (rule, value, callback) => {
							emailSole({
								email: value
							}).then(res => {
								// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
								if (res.code === 200) {
									callback();
								} else {
									callback(new Error('该邮箱已使用'));
								}
							}).catch(() => {
								callback(new Error('该邮箱已使用'));
							})
						},
					}
					],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur',
					}]
				},
				// 推荐码
				recommendCode: "",
				//验证码
				codeText: '获取验证码',
				//验证码已发
				readonly: false,
				collegeCode: [],
				showModal: false,
				showPicker: false //选择弹出
			};
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.form.setRules(this.rules);
		},
		//第一次加载
		onLoad(e) {
			registeredJump().then(res => {
				this.collegeCode = res.data;
			})
		},
		//页面显示
		onShow() {},
		//方法
		methods: {
			getTips() {
				this.showModal = true;
			},
			handleConfirm(data) {
				this.form.userCollegeId = this.collegeCode[data[0]].collegeId;
				this.form.collegeCode = this.collegeCode[data[0]].code;
				this.showPicker = false;
			},
			onJumpPage(url) {
				uni.navigateTo({
					url: '../my/assist?assistId=3'
				});
			},
			//获取验证码
			getCode() {
				if (this.readonly) {
					uni.showToast({
						title: '验证码已发送',
						icon: 'none'
					});
					return;
				}
				if (!this.$u.test.mobile(this.form.usersMobile)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return;
				}
				sendRegisterSMS({
					phone: this.form.usersMobile
				}).then(res => {
					uni.showToast({
						title: res.data,
						icon: 'success'
					})
					this.getCodeState();
				})
			},
			//验证码按钮文字状态
			getCodeState() {
				const _this = this;
				this.readonly = true;
				this.codeText = '60S后重新获取';
				var s = 60;
				let clear = setInterval(() => {
					s--;
					_this.codeText = s + 'S后重新获取';
					if (s <= 0) {
						clearInterval(clear);
						_this.codeText = '获取验证码';
						_this.readonly = false;
					}
				}, 1000);
			},
			onSubmit() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true;
						registerPost(this.form).then(res => {
							if (res.code === 200) {
								this.$refs.form.resetFields()
								uni.showModal({
									title: '提示',
									content: '提交成功，请等待账号审核。',
									showCancel: false,
									success: res => {
										uni.redirectTo({
											url:'../user/login'
										})
									}
								});	
								this.loading = false;
								this.form.userCollegeId = null
								this.form.collegeCode = null
								this.form.username = null
								this.form.usersRealname = null
								this.form.usersMobile = null
								this.form.password = null
								this.form.confirm = null //确认密码
								this.form.code = null //验证码
								this.form.email = null
								this.form.userremarks = null
							}
						}).catch(() => {
							this.loading = false;
						})
					}
				});
			}
		}

	};
</script>
<style lang="scss" scoped>
	.page {
		background-color: #FFF;
		padding: 20rpx;
		min-height: 100vh;

		.title {
			padding: 20rpx 0;
			font-size: 60upx;
			color: #333333;
		}

		.input_box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			padding-top: 20upx;
			border-bottom: 1upx solid #eeeeee;
			font-size: 22rpx;

			text {
				width: 165rpx;
			}

			.must_star::after {
				content: '*';
				color: red;
			}

			input {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 22rpx;
				margin-left: 20rpx;
			}

			button {
				font-size: 22rpx;
				color: #007AFF;

				&:active {
					background-color: transparent;
				}
			}
		}

		.btn_box {
			margin-top: 70upx;
			height: 400rpx;

			button {
				height: 86upx;
				border-radius: 43upx;
				font-size: 36upx;
				color: #ffffff;
				background-color: $uni-color-primary;
			}
		}

		.protocol {
			font-size: 24upx;
			color: #999999;
			text-align: center;
			margin-top: 20upx;

			text {
				color: #007AFF;
			}
		}
	}
</style>
