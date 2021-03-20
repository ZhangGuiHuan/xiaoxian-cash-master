<template>
	<view class="clear">
		<view class="onion">
			<view>共{{total}}条</view>
			<view class="onion-pre onion-rank" @click="handlePre(page===1)" :class="[page===1?'disabled':'']" style="padding: 0 5px;">
				<u-icon name="arrow-left"></u-icon> 上一页
			</view> 
			
			<view class="onion-first onion-rank" :class="[page===1?'active':'']" @click="handleCurrent(1)">1</view>
			<view class="onion-pre-ellipsis onion-rank" v-if="showPreEllipsis">...</view>
		
			<template v-for="item in pageMid">
				<view class="onion-mid onion-rank" :class="[page===item?'active':'']" :key="item" @click="handleCurrent(item)">{{item}}</view>
			</template>
		
			<view class="onion-next-ellipsis onion-rank" v-if="showNextEllipsis">...</view>
			<view class="onion-last onion-rank" v-if="pageCount>1" :class="[page===pageCount?'active':'']" @click="handleCurrent(pageCount)">{{pageCount}}</view>
		
			<view class="onion-next onion-rank" @click="handleNext(page===pageCount)" :class="[page===pageCount?'disabled':'']" style="padding: 0 5px;">
				下一页 <u-icon name="arrow-right"></u-icon> 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'OnionPagination',
		props: {
			page: {
				type: Number,
				default: 1
			},
			pageSize: {
				type: Number,
				default: 10
			},
			total: {
				type: Number,
				default: 100
			},
			showSize: {
				type: Number,
				default: 3
			}
		},
		data() {
			return {
				showPreEllipsis: false,
				showNextEllipsis: false
			};
		},
		computed: {
			pageCount() {
				let pageCountNumber = Math.ceil(this.total / this.pageSize);
				return pageCountNumber
			},
			pageMid() {
				const total = this.total; //总数
				const pageSize = this.pageSize; //页数
				const pageCount = this.pageCount; //页码
				const page = this.page; //当前页
				const showSize = this.showSize; //额外展示页码

				let showPreEllipsis = false; //前省略
				let showNextEllipsis = false; //后省略

				let offset = Math.floor(showSize / 2); //居中偏移量

				// 为真的情况
				if (pageCount > showSize) {
					if (page - offset > 1) {
						showPreEllipsis = true;
					}
					if (page + offset < pageCount) {
						showNextEllipsis = true;
					}
				}

				this.showPreEllipsis = showPreEllipsis;
				this.showNextEllipsis = showNextEllipsis;

				let pageMid = [];

				if (showPreEllipsis && showNextEllipsis) {
					for (let i = page - offset; i <= page + offset; i++) {
						pageMid.push(i);
					}
				} else if (!showPreEllipsis && showNextEllipsis) {
					for (let i = 2; i < 2 + showSize; i++) {
						pageMid.push(i);
					}
				} else if (showPreEllipsis && !showNextEllipsis) {
					let startPage = pageCount - (showSize - 1);
					for (let i = startPage; i < pageCount; i++) {
						pageMid.push(i);
					}
				} else {
					for (let i = 2; i < pageCount; i++) {
						pageMid.push(i);
					}
				}
				return pageMid
			}
		},
		methods: {
			handleCurrent(val) {
				this.$emit('update:page', val);
				this.$emit('change', val);
			},
			handlePre(disabled) {
				if(!disabled){
					this.handleCurrent(this.page - 1);
				}
			},
			handleNext(disabled) {
				if(!disabled){
					this.handleCurrent(this.page + 1);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.onion {
		display: flex;
		margin-top: 10px;
		font-size: 26rpx;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: #4c4c4c;
		&-rank {
			text-align: center;
			background-color: #f5f6f8;
			margin-left: 10px;
			cursor: pointer;
			min-width: 40px;
			line-height: 40px;
			height: 40px;
			border-radius: 3px;

			&.active {
				color: #fff;
				border-color: #007AFF;
				font-weight: 800;
				background-color: #007AFF;
			}

			&.disabled {
				cursor: not-allowed;
				color: #b5b5b5;
			}
			&:hover{
				color: #fff;
				border-color: #007AFF;
				background-color: #007AFF;
			}
		}

		&-pre-ellipsis,
		&-next-ellipsis {
			cursor: not-allowed;
		}
	}
	
</style>
