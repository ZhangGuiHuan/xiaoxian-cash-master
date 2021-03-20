<template>
	<view class="menu-box">
		<view :class="current === index?'menu-item-active':'menu-item'" 
		v-for="(item,index) in menu" :key="index" @click="handleClick(index,item)">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		name:'my-menu',
		props:{
			menu: {
				type: Array,
				default: []
			},
			current: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
			}
		},
		methods: {
			handleClick(current,item){
				this.$emit('change',current,item)
			}
		}
	}
</script>

<style scoped>
.menu-box{
	width: 300rpx;
	margin-right: 10rpx;
	background-color: #FAFAFA;
}
.menu-item{
	height: 60px;
	line-height: 60px;
	background: #FAFAFA;
	color: ##333333;
	text-align: center;
	cursor: pointer;
}
.menu-item-active{
	height: 50px;
	line-height: 50px;
	background: #B1BEFD;
	color: #3F56BC;
	text-align: center;
	cursor: pointer;
	border-right: 5px #007AFF solid;
	box-sizing: border-box;
	font-weight: bold;
}
</style>
