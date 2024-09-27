function getChineseIndex(index: number|string) {  
    const chineseUnits = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];  
    const chineseDigits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];  

    if (index < 0) {  
        return '索引不能为负数';  
    }  

    if (index < 10) {  
        return chineseDigits[index];  
    }  

    let result = '';  
    let unitIndex = 0;  

    while (index > 0) {  
        const digit = index % 10;  
        if (digit > 0) {  
            result = chineseDigits[digit] + chineseUnits[unitIndex] + result;  
        } else if (result && result[0] !== '零') {  
            result = '零' + result; // 添加零  
        }  
        index = Math.floor(index / 10);  
        unitIndex++;  
    }  

    return result || '';  
} 

export default getChineseIndex