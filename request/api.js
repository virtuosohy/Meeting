


//api.js
import axios from 'axios';

const xingxi = axios.create({
  baseURL: 'api/publicapp/sys/xbxzbghytjdcx/modules/pcdjk/hqytxxxx.do',
  timeout: 1000,
});
	
export default xingxi  ;


// pages/index/index.vue
<template>

</template>

<script>
import api from '../api';

export default {
  
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString(); 
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

     const params = new URLSearchParams({
            date: dateStr,
            abc: 'someValue', // 后面的其他参数
          }).toString(); 
    
          api.get(`?${params}`)
            .then(response => {
              this.data = response.data;
            })
            .catch(error => {
              console.log("错误");
            });
  },
};
</script>