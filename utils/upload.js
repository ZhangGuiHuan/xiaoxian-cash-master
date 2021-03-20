//请求域名 必须是 https://
import {baseUrl} from './baseUrl.js';
//request (路径,请求方式,文本类型,是否开启loading)
import storage from './storage.js'
//上传类
export function uploadFile (options) {
	const Authorization = storage.getToken();
	const loginOut = storage.getLoginOut();
	const header = {};
	//带token, noToken:true 不用检验token
	if(Authorization && !options.noToken){
		//判断登录过期
		if(loginOut){
			header['Authorization'] = Authorization;
		}else if(tokenEffective){
			tokenEffective = false;//防止重复弹窗
			uni.showModal({
			    title: '提示',
			    content: '登录过期，请重新登录',
				showCancel:false,
			    success: function (res) {
					storage.cleanUserInfo()
					uni.redirectTo({
						url:'/pages/user/login'
					})
			    }
			});
			return new Promise((resolve, reject) => {reject()})
		}else{
			storage.cleanUserInfo()
		}
	};
	uni.showLoading({
		title:'请求中'
	})
	return new Promise((resolve, reject) => {
	 uni.uploadFile({
			url: baseUrl + options.url,
			files: options.files,
			//#ifdef H5
			file: options.file,
			//#endif
			//#ifdef APP-VUE
			filePath: options.file,
			//#endif
			name: 'file',
			formData: options.formData,
			header: header,
			success: (res) => {
				uni.hideLoading();
				let data = JSON.parse(res.data)
				if(data.code === 200){
					resolve(data)
				}else{
					reject(data)
				}
			},
			fail: (err) => {
				uni.hideLoading();
				console.log(err)
				uni.showToast({
					title: '获取失败',
					icon: "none"
				})
				reject(err)
			}
		})
	})
}