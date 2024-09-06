const getYTinfo = (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: '/api/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqhyxxxx.do?RQ=2024-07-23&pageSize=10&pageNumber=1',
			method: 'POST',
			data: data,
			success(res) {
				console.log(res.data)
				resolve(res)
			},
			fail() {
				reject({
					"datas": {
						"hqytxxxx": {
							"totalSize": 4,
							"pageNumber": 1,
							"pageSize": 10,
							"rows": [{
									"WID": "3f8ec9eee7d0461bb7ab18a449fc8f12",
									"HYID": "58c1afc115274701afb10e325a86a818",
									"HYMC": "20240723",
									"HYKSSJ": "2024-07-23 09:45:00",
									"HYSJKSSJ": null,
									"HYDD": "信息中心",
									"ZCR": "代劲",
									"HBDW": "10200",
									"YTMC": "1",
									"PX": "1",
									"YJKSSJ": null,
									"YJSC": "15",
									"ZT": "1",
									"HHRY": "张泸尹",
									"HHRYLIST": "张泸尹",
									"YTBH": null,
									"SJKSSJ": null,
									"SJJSSJ": null,
									"HBDW_DISPLAY": "党办/校办",
									"ZT_DISPLAY": "未开始"
								},
								{
									"WID": "354393ca8af6405e81edd55e81fab958",
									"HYID": "58c1afc115274701afb10e325a86a818",
									"HYMC": "20240723",
									"HYKSSJ": "2024-07-23 09:45:00",
									"HYSJKSSJ": null,
									"HYDD": "信息中心",
									"ZCR": "代劲",
									"HBDW": "10300",
									"YTMC": "2",
									"PX": "2",
									"YJKSSJ": null,
									"YJSC": "16",
									"ZT": "1",
									"HHRY": "钟熙",
									"HHRYLIST": "钟熙",
									"YTBH": null,
									"SJKSSJ": null,
									"SJJSSJ": null,
									"HBDW_DISPLAY": "组织部",
									"ZT_DISPLAY": "未开始"
								},
								{
									"WID": "dabdce8ee184457ca218b1cd333943e6",
									"HYID": "7045d142d1204b22860558105a4b433c",
									"HYMC": "测试编号是否正常",
									"HYKSSJ": "2024-07-23 11:35:00",
									"HYSJKSSJ": null,
									"HYDD": "信息中心会议室",
									"ZCR": "XXX",
									"HBDW": "10300",
									"YTMC": "1",
									"PX": "1",
									"YJKSSJ": null,
									"YJSC": "15",
									"ZT": "1",
									"HHRY": null,
									"HHRYLIST": null,
									"YTBH": "2024072301",
									"SJKSSJ": null,
									"SJJSSJ": null,
									"HBDW_DISPLAY": "组织部",
									"ZT_DISPLAY": "未开始"
								},
								{
									"WID": "89b4b3cb893a4339be6f59adfaaab9fa",
									"HYID": "7045d142d1204b22860558105a4b433c",
									"HYMC": "测试编号是否正常",
									"HYKSSJ": "2024-07-23 11:35:00",
									"HYSJKSSJ": null,
									"HYDD": "信息中心会议室",
									"ZCR": "XXX",
									"HBDW": "10500",
									"YTMC": "2",
									"PX": "2",
									"YJKSSJ": null,
									"YJSC": "15",
									"ZT": "1",
									"HHRY": null,
									"HHRYLIST": null,
									"YTBH": "2024072302",
									"SJKSSJ": null,
									"SJJSSJ": null,
									"HBDW_DISPLAY": "纪检监察室",
									"ZT_DISPLAY": "未开始"
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

export default getYTinfo