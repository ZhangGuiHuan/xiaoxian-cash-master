<template>
	<view class="content">
		<view class="title">
			录入员工
		</view>
		<view class="u-p-50" style="max-width: 500px; margin: 0 auto;">
			<u-form ref="form" :model="form" label-width="200">
				<u-form-item label="工 号 :" prop="jobNumber">
					<u-input border placeholder="请输入工号" v-model="form.jobNumber"></u-input>
				</u-form-item>
				<u-form-item label="手机号码 :" prop="phone">
					<u-input border placeholder="请输入手机号码" v-model="form.phone"></u-input>
				</u-form-item>
				<u-form-item label="员工姓名 :" prop="realName">
					<u-input border placeholder="请输入员工姓名" v-model="form.realName"></u-input>
				</u-form-item>
				<u-form-item label="性 别 :" prop="sex">
					<u-radio-group v-model="form.sex">
						<u-radio name="男">男</u-radio>
						<u-radio name="女">女</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-button type="primary" :loading="loading" @click="handleAdd">添加</u-button>
			</u-form>
		</view>
		<u-modal v-model="showModel" :content="content"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModel: false,
				content: '',
				loading: false,
				form: {
					sex:'男',
					tydUuid :'1610021712960d032b109b36d4318'
				},
				rule: {
					jobNumber: [{
						required: true,
						message: '请输入工号',
						trigger: ['change', 'blur'],
					}],
					phone: [{
							required: true,
							message: '请输入手机号码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '请输入正确的手机号码',
							trigger: ['change', 'blur'],
						}
					],
					realName: [{
						required: true,
						message: '请输入员工姓名',
						trigger: ['change', 'blur'],
					}]
				}
			}
		},
		mounted() {
			this.$refs.form.setRules(this.rule);
		},
		methods: {
			//录入员工
			handleAdd() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true;
						this.$u.post('/staff/addStaff', this.form).then(res => {
							this.loading = false;
							this.content = res;
							this.showModel = true
							this.$refs.form.resetFields()
						}).catch(e => {
							this.$u.toast('录入失败')
							this.loading = false;
						});
					}
				})
			},
			// checkbox选择发生变化
			checkboxGroupChange(e) {
				console.log(e)
				this.form.type = e.toString();
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
