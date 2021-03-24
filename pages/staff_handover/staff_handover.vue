<template>
	<view>
		<my-top-tabbar :current="3"></my-top-tabbar>
		<view class="main-box u-flex u-col-top">
			<view class="left-box">
				<my-menu :current="current" :menu="menu" @change="handleClick"></my-menu>
			</view>
			<view class="rigth-box">
				<staffList v-if="pageKey ==='staffList'"></staffList>
				<handover v-if="pageKey ==='handover'"></handover>
			</view>
		</view>
	</view>
</template>

<script>
	import staffList from './components/staff-list.vue'
	import handover from './components/handover.vue'
	export default {
		components: {
			staffList,
			handover
		},
		data() {
			return {
				menu:[
					{name:'员工管理',pageKey:'staffList'},
					{name:'交接班',pageKey:'handover'},
				],
				current:0,
				pageKey:'staffList'
			}
		},
		methods: {
			handleClick(current,data){
				this.current = current;
				this.pageKey = data.pageKey;
			}
		}
	}
</script>

<style scoped>
.left-box{
}
.rigth-box{
	flex: 1;
	margin: 10px;
	background: #FCFCFC;
	height: calc(100vh - 50px);
}

</style>
