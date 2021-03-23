<template>
	<view class="content">
		<view class="title">
			商品录入
		</view>
		<view class="u-p-50" style="max-width: 700px; margin: 0 auto;">
			<u-form ref="form" :model="form" label-width="200">
				<u-form-item label="条码编号 :" prop="code">
					<u-input focus border placeholder="请输入条码编号" v-model="form.code"></u-input>
				</u-form-item>
				<u-form-item label="商品名称 :" prop="goodsName">
					<u-input border placeholder="请输入商品名称" v-model="form.goodsName"></u-input>
				</u-form-item>
				<u-form-item label="录入数量 :" prop="inventory">
					<u-input border type="number" placeholder="请输入数量" v-model="form.inventory"></u-input>
				</u-form-item>
				<u-form-item label="采购价格 :" prop="originalPrice">
					<u-input border placeholder="请输入采购价格" v-model="form.originalPrice"></u-input>
				</u-form-item>
				<u-form-item label="保质期 :" prop="shelfLife">
					<u-input border placeholder="请输入保质期" v-model="form.shelfLife"></u-input>
				</u-form-item>
				<u-form-item label="零售价 :" prop="marketingPrice">
					<u-input border placeholder="请输入零售价" v-model="form.marketingPrice "></u-input>
				</u-form-item>
				<u-form-item label="类型 :" prop="type">
					<u-checkbox-group width="200rpx" size="24" @change="checkboxGroupChange">
						<u-checkbox label-size="24" v-model="item.checked" v-for="(item, index) in typeList"
							:key="index" :name="item.name">{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="商品图片 :" prop="imgUrl">
					<u-upload ref="uUpload" :auto-upload="false"></u-upload>
				</u-form-item>
				<u-button type="primary" :loading="loading" @click="handleAdd">添加</u-button>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				typeList: [{
					name: '日用品'
				}, {
					name: '食品类'
				}, {
					name: '新鲜类'
				}, {
					name: '其他'
				}],
				form: {
					code:'',
					goodsName:'',
					inventory:'',
					originalPrice:'',
					shelfLife:'',
					marketingPrice:'',
					type:'',
					imgUrl:''
				},
				rule: {
					code:[{
						required: true,
						message: '条码编号不能为空',
						trigger: ['change', 'blur'],
					}],
					goodsName: [{
						required: true,
						message: '请输入商品名称',
						trigger: ['change', 'blur'],
					}],
					inventory: [{
						required: true,
						message: '请输入数量',
						trigger: ['change', 'blur'],
					}],
					originalPrice: [{
							required: true,
							message: '请输入采购价格',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.amount(value);
							},
							message: '采购价格填写不正确',
							trigger: ['change', 'blur'],
						}
					],
					shelfLife: [{
						required: true,
						message: '请输入保质期',
						trigger: ['change', 'blur'],
					}],
					marketingPrice: [{
							required: true,
							message: '请输入零售价',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.amount(value);
							},
							message: '零售价填写不正确',
							trigger: ['change', 'blur'],
						}
					],
				}
			}
		},
		mounted() {
			this.$refs.form.setRules(this.rule);
		},
		methods: {
			handleAdd() {
				console.log(this.form)
				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true;
						this.$u.post('/goods/inventoryList',this.form).then(res => {
							this.loading = false;
							this.$u.toast('录入成功！')
						}).catch(e=>{
							this.$u.toast(e.data)
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
