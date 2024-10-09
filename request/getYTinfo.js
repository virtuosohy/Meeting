import { getDateParam } from "../utils/TimeUtils"

const getYTinfo = () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `http://ehall.cqupt.edu.cn/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqytxxxx.do?RQ=${getDateParam()}`,
			// url: `http://ehall.cqupt.edu.cn/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqytxxxx.do?RQ=2024-07-23`,
			// url: `http://ehall.cqupt.edu.cn/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqytxxxx.do?RQ=2024-09-03`,
			method: 'POST',
			data:{
				pageSize:"10",
				pageNumber:"1"
			},
			// data: data,
			success(res) {
				// console.log("议题信息",res)
				if(res.statusCode === 200){
					if(res.data.code === '0'){
					    resolve(res.data)
					}
				}
				reject("获取议题信息出错")
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default getYTinfo