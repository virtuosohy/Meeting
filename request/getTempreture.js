const getTempretrue = (data) => {
 uni.request({
	 url:'t.weather.itboy.net/api/weather/city/101040100',
	 method: 'GET',
	 success: (res) => {
		 console.log(res.data)
	 }
 })
}

export default getTempretrue