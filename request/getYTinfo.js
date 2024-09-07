const getYTinfo = (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: '/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqhyxxxx.do?RQ=2024-07-23&pageSize=10&pageNumber=1',
			method: 'POST',
			data: data,
			success(res) {
				console.log(res.data)
				resolve(res)
			},
			fail() {
				reject({

				console.log('获取会议详细信息错误')
			}
		})
	})
}

export default getYTinfo
