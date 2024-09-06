const getHYinfo = (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: '/api/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqhyxxxx.do',
			method: 'POST',
			
			data: data,
			success(res) {
				resolve(res)
			},
			fail() {
				reject({
					"datas": {
						"hqhyxxxx": {
							"totalSize": 2,
							"pageNumber": 1,
							"pageSize": 10,
							"rows": [{
									"WID": "58c1afc115274701afb10e325a86a818",
									"BH": "2024072301",
									"HYMC": "20240723",
									"HYDD": "信息中心",
									"HYKSSJ": "2024-07-23 09:45:00",
									"HYSJKSSJ": null,
									"ZCR": "代劲",
									"SFYJTZ": "否",
									"CZSJ": null,
									"CZR": null
								},
								{
									"WID": "7045d142d1204b22860558105a4b433c",
									"BH": "2024072302",
									"HYMC": "测试编号是否正常",
									"HYDD": "信息中心会议室",
									"HYKSSJ": "2024-07-23 11:35:00",
									"HYSJKSSJ": null,
									"ZCR": "XXX",
									"SFYJTZ": "否",
									"CZSJ": null,
									"CZR": null
								}
							]
						}
					},
					"code": "0"
				})
				console.log('获取会议详细信息错误')
			}
		})
	})
}

export default getHYinfo