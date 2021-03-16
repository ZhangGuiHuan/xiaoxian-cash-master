//token名称
const TokenKey = 'ERP_Token';

//登录过期时间戳
const loginOut = 'ERP_Exp';

//用户名
const userName = 'userName';
//角色
const setroleName = 'roleName';
export default {
	//get
	getToken: function() {
		return uni.getStorageSync(TokenKey);
	},
	//set
	setToken: function(token) {
		return uni.setStorageSync(TokenKey, token);
	},
	//remove
	removeToken: function() {
		return uni.removeStorageSync(TokenKey);
	},
	setRoleName: function(roleName) {
		return uni.setStorageSync(setroleName, roleName);
	},
	getRoleName: function() {
		return uni.getStorageSync(setroleName);
	},
	//保存userid
	setUserId:function(id) {
		return uni.setStorageSync('userId', id);
	},
	getUserId: function() {
		return uni.getStorageSync('userId');
	},
	//添加登录过期时间戳
	setLoginOut: function(value) {
		return uni.setStorageSync(loginOut, value);
	},
	//判断登录是否过期
	getLoginOut: function() {
		const timestamp = new Date().getTime();
		const loginOuttime = uni.getStorageSync(loginOut)
		return loginOuttime > timestamp;
		//false 为过期
	},
	//设置用户名
	setUserName: function(value) {
		return uni.setStorageSync(userName, value)
	},
	getUserName: function(value) {
		return uni.getStorageSync(userName, value)
	},
	//清除用户登录信息
	cleanUserInfo: function(value) {
		uni.removeStorageSync(TokenKey);
		uni.removeStorageSync(loginOut);
		uni.removeStorageSync(userName);
		uni.removeStorageSync(setroleName);
		uni.removeStorageSync('newMenulist');
	},
}
/* 



*/
