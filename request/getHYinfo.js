
import { getDateParam } from "../utils/TimeUtils"

const getHYinfo = () => {
	return new Promise((resolve, reject) => {
		uni.request({
			// url: `http://ehall.cqupt.edu.cn/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqhyxxxx.do?RQ=${getDateParam()}`,
			url: `http://ehall.cqupt.edu.cn/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqhyxxxx.do?RQ=2024-07-23`,
			method: 'POST',
			data:{
				pageSize:"10",
				pageNumber:"1"
			},
			success(res) {
				// console.log("会议信息",res)
				if(res.statusCode === 200){
					if(res.data.code === '0'){
						// console.log(res.data)
					    resolve(res.data)
					}
				}
				reject("获取会议信息出错")
			},
			fail(err) {
				reject(err)
				console.log('获取会议详细信息错误')
			}
		})
	})
}

export default getHYinfo
