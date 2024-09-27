	export function getClock() {  
        const now = new Date();  
        const hours = String(now.getHours()).padStart(2, '0');  
        const minutes = String(now.getMinutes()).padStart(2, '0');  
        return `${hours}:${minutes}`;  
    }  
    
    export function getWeek() {  
        const now = new Date();  
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];  
        return `周${weekDays[now.getDay()]}`;  
    }  
    
    export function getDate() {  
        const now = new Date();  
        const month = now.getMonth() + 1; // 月份从0开始  
        const day = now.getDate();  
        return `${month}月${day}日`;  
    }    
	
	export function getDateParam() {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1; // 月份从0开始
		const day = now.getDate();
		return `${year}-${month < 10? `0${month}`: month}-${day < 10? `0${day}`: day}`
	}