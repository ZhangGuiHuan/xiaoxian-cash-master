<template>
	<view>
		<my-top-tabbar :current="3"></my-top-tabbar>
		<view class="main-box u-flex u-col-top">
			<view class="left-box">
				<my-menu :current="current" :menu="menu" @change="handleClick"></my-menu>
			</view>
			<view class="rigth-box">
				<staffList v-if="pageKey ==='staffList'" @addStaff="addStaff" ></staffList>
				<handover v-if="pageKey ==='handover'"></handover>
				<addStaff v-if="pageKey ==='addStaff'"></addStaff>
			</view>
		</view>
	</view>
</template>

<script>
	import staffList from './components/staff-list.vue'
	import handover from './components/handover.vue'
	import addStaff from './components/add-staff.vue'
	export default {
		components: {
			staffList,
			handover,
			addStaff
		},
		data() {
			return {
				current:0,
				menu:[
					{name:'员工管理',pageKey:'staffList'},
					{name:'交接班',pageKey:'handover'}
				],
				pageKey:'staffList'
			}
		},
		methods: {
			handleClick(current,data){
				this.current = current;
				this.pageKey = data.pageKey;
			},
			addStaff(){
				this.pageKey = 'addStaff';
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
