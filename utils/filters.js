//采购,状态
export function purchaseStatus(key) {
	const obj = {
		1:'待审批',
		2:'已通过',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//流程流转情况状态
export function auditStatus(key) {
	const obj = {
		1:'等待上级审批',
		2:'待审批',
		3:'已通过',
		4:'不通过'
	}
  return obj[key] || '未定义'
}
//生产通知 状态
export function produNoticeStatus(key) {
	const obj = {
		1:'待审批',
		2:'已通过',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}

//是否
export function yesno(key) {
	const obj = {
		1:'是',
		2:'否'
	}
  return obj[key] || '未定义'
}

//退料原因
export function causeRemarks(key) {
	const obj = {
		1:'良品(生产余料)',
		2:'不良品(来料不良)',
		3:'不良品(生产损坏)',
		4:'其它'
	}
  return obj[key] || '未定义'
}
//退料状态 1.待检验 2.已通过 3.不通过
export function repay(key) {
	const obj = {
		1:'待检验',
		2:'已通过',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//转料状态 1.待收料 2.已收料 3.不通过 4.已撤销
export function transport(key) {
	const obj = {
		1:'待收料',
		2:'已收料',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//医用口罩过程生产记录 1.待复核 2.已复核 3.不通过 4.已撤销
export function maskStatus(key) {
	const obj = {
		1:'待复核',
		2:'已复核',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//原材料请验单列表 状态 1.待检验 2.检验中 3.已检验 4.已撤销
export function materialStatus(key) {
	const obj = {
		1:'待检验',
		2:'检验中',
		3:'已检验',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//原材料请验单列表 1.待审核 2.已审核 3.不通过 4.已撤销
export function accStatus(key) {
	const obj = {
		1:'待审核',
		2:'已审核',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//生产退料状态 1.待检验确认 2.待收料 3.已收料 4.已撤销
export function repayStatus(key) {
	const obj = {
		1:'待检验确认',
		2:'待收料',
		3:'已收料',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}

//微生物报告 状态 1.待校核 2.已校核 3.不通过 4.已撤销
export function micrStatus(key) {
	const obj = {
		1:'待校核',
		2:'已校核',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//车间清场
export function cleanStatus(key) {
	const obj = {
		1:'是',
		2:'否',
		3:'不检查',
	}
  return obj[key] || '未定义'
}
//采购退货状态状态 ,销售订单,销售退货: 1.待审批 2.已通过 3.不通过 4.已撤销
export function returnStatus(key) {
	const obj = {
		1:'待审批',
		2:'已通过',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}
//回款类型 1.交通费用 2.通讯费用 3.餐饮住宿 4.赠送礼品 5.物资采购 6.其他费用
export function returnIncome(key) {
	const obj = {
		1:'交通费用',
		2:'通讯费用',
		3:'餐饮住宿',
		4:'赠送礼品',
		5:'物资采购',
		6:'其他费用'
	}
  return obj[key] || '未定义'
}
//	回款方式 1.现金 2.对公账户 3.支付宝 4.微信 5.其它
export function revenueWay(key) {
	const obj = {
		1:'现金',
		2:'对公账户',
		3:'支付宝',
		4:'微信',
		5:'其它'
	}
  return obj[key] || '未定义'
}

//状态 1.待审批 2.已通过 3.不通过 4.已撤销
export function incomeStatus(key) {
	const obj = {
		1:'待审批',
		2:'已通过',
		3:'不通过',
		4:'已撤销'
	}
  return obj[key] || '未定义'
}