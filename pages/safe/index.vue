<template>
	<view class="container">
		<view class="login-container">
	      <view class="form-group">
	        <input name="password" ref="inputRef" type="password" placeholder="请输入密码" v-model="password" >
	      </view>
	      <button @click="handleIn">进入</button>
	  </view>
	  </view>	 
</template>

<script setup>
	import {ref} from "vue"
	const password = ref()
	
	const handleIn = () => {
		if(password.value != "CYXB") return;
		uni.redirectTo({
			url:"/pages/index/index"
		})
	}
	
</script>

<style>
	.container{
		min-width: 100vw;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login-container {
	  background-color: #fff;
	  padding: 80rpx;
	  border-radius: 16rpx;
	  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	  width: 300rpx; /* 固定宽度 */
	  text-align: center;
	  max-height: calc(300rpx * 1.618); /* 使用黄金比例计算最大高度 */
	  overflow: hidden; /* 隐藏溢出的部分 */
	}
		
	.login-container h2 {
	  color: #333;
	}
		
	.login-form {
	  margin-top: 40rpx;
	}
		
	.form-group {
	  margin-bottom: 30rpx;
	}
	input {
	  width: 100%;
	  height: 40rpx;
	  border: 2rpx solid #ccc;
	  border-radius: 8rpx;
	 font-size: 20rpx;
	}
		
	button {
	  background-color: #4caf50;
	  font-size: 12rpx;
	  color: #fff;
	  padding: 10rpx 15rpx;
	  border: none;
	  border-radius: 4rpx;
	  cursor: pointer;
	}
		
	button:hover {
	  background-color: #45a049;
	}
</style>