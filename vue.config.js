module.exports = {
	   "devServer": {
		   host:'10.20.145.101',
	     "proxy": {  
	       "/api": {  
	         "target": "http://ehall.cqupt.edu.cn",  
	         "changeOrigin": true,  
	         "pathRewrite": {  
	           "^/api": ""  
	         }  
	       }  
	     }  
	   }   
}	