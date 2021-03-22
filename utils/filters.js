// 
export function purchaseStatus(key) {
	const obj = {
		1:'待审批',
		2:'已通过',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
