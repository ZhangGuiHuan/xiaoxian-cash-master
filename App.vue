<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
				plus.screen.lockOrientation('landscape-primary'); //锁定方向
			//#endif
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<style>
	/*每个页面公共css */
</style>
