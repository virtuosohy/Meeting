<template>
	<view class="container">
	<view class="content">
		<image src="../../static/bcg.png" mode="" class="bg"></image>
	
	      <view class="title">校长办公会</view>
		<view class="HYinfo">
		
			<view class="YTBH">议题编号：ahshd</view>
			<view class="YTMC">当前议题：asdasdasdasdd</view>
			
			<view class="HBDW">
					汇报单位：dasdasda
			</view>
			<view class="HBR">
				
					汇报人：adhasdkashkdhaskh
				
			</view>
			
		</view>
		
		
		<view class="content-right">
			<view class="content-right-header">
				<view class="tempretrue">
				{{a.temperature}}
				</view>
				<view class="city">Chongqing</view>
				<view class="time">
					<view class="timecolock">
						{{colock}}
					</view>
					<view class="timebottom">
						{{weekday}}{{date}}
					</view>
				</view>
			</view>
			<view class="content-main">
				<view class="content-main-header" style="text-align: center; font-size: 23rpx;">
					会议议程
				</view>
				<view class="content-main-info1">
					
			     <view class="box left"><image src="../../static/bun.png" mode="" class="img1"></image></view>
					<view class="box right">
					<view class="content-main-info-name" >三个行卡花打时点阿萨</view>
					<view class="content-main-info-ZT">【进行中】</view>
					</view>
					
				</view>
				
			<view class="yellow"><image src="../../static/yn.png" mode="" class="yn" ></image></view>
					
				<view class="HBDW-HBR">
					<view class="HBDW">汇报单位：惠普软件工程学院软件工</view>
					<view class="HBR">汇报人：</view>
				</view>
			
				
				
				<view class="content-main-info2" style="margin-top: 30rpx;" >
					<view class="box left"><image src="../../static/bgn.png" mode="" class="img2"></image></view>
						<view class="box right">
						<view class="content-main-info-name" >落开着啊啊啊啊大大是的阿达啊啊啊车</view>
						<view class="content-main-info-ZT">【进行中】</view>
						</view>
					</view>
					
				
				<view class="HBDW-HBR" style="margin-top: 10rpx;" >
					<view class="HBDW">汇报单位：大世界很大空间很大黄金卡了哈</view>
					<view class="HBR">汇报人：</view>
				</view>
				<view class="rt">
					重庆邮电大学信息中心，蓝山工作室开发
				</view>
				</view>
				
		</view>
	</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, reactive, onMounted} from "vue";
import {getDate, getClock, getWeek} from "../../utils/TimeUtils.js";

import {weather } from "../../types/OutSide.js";
// interface weatherType {
// 	readonly id: number;
//     name: string;
//     data: string | ArrayBuffer;
// }

// interface DataType {
// 	list: weatherType[]
// }

// const data = reactive<DataType>({
// 	list:[]
// })

const a = ref({
	
})

const weather  = setInterval(getTempretrue,1000*60*30);



const colock = ref(getClock())
const weekday = ref(getWeek())
const date = ref(getDate())

function getTempretrue()  {
 uni.request({
	 url:'https://api.seniverse.com/v3/weather/now.json?key=Sf1hBVAVv6f_0GVjz&location=chongqing&language=zh-Hans&unit=c',
	 method: 'GET',
	 success: (res) => {
	
		
		 a.value = res.data.results[0].now
	 }
 })
}

let timer = setInterval(() => {
	colock.value = getClock()
	date.value = getDate()
	weekday.value = getWeek()
},1000)

onMounted(() => {
	
	getTempretrue()
})

onUnmounted(() => {
	console.log("清除")
	clearInterval(timer)
	clearInterval(weather )

})



	

</script>

<style scoped lang="scss">
	// .container{
	// 	height: 100vh;
	// 	width: 100vw;
	// 	background-color: #aaa;
	// }
	
		
		
		.bg{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -999;
	}
	

	.content{
		display: flex;
		width: 750rpx;
		height: 422rpx;
		background-size: cover;
		.title{
			position: absolute;
			color: #fff;
			width: 100%;
			font-size: 30rpx;
			font-weight: 550;
			left:260rpx;
			top:10rpx
			
		}
		.HYinfo{
			position: absolute;
			display: flex;
			
			left: 18rpx;
			bottom: 20rpx;
			width: 475rpx;
			height: 136rpx;
			justify-content:center;
           flex-direction: column;
			.YTBH{
				color: #fff;
				width: 100%;
				font-size: 20rpx;
				font-weight: 380;
				margin-top: -125rpx;
			    text-align: center;
			}
			.YTMC{
				color: #fff;
				width: 100%;
				font-size: 30rpx;
				font-weight: 500;
				margin-top: 15rpx;
				text-align: center;
			}
			.HBDW{
				color: #fff;
				width: 100%;
				font-size: 15rpx;
				font-weight: 380;
				margin-top: 35rpx;
				text-align: center;
				
			}
			.HBR{
				
				font-size: 15rpx;
				font-weight: 380;
				color: #fff;
				margin-top: 15rpx;
			 text-align: center;
			}
			
		}
		
		.content-right{
			width: 235rpx;
			height: 100vh;
			margin-left: 515rpx;
			color: #fff;
			right: 0;
			top: 0;
			.content-right-header{
				display: flex;
				position: relative;
				margin-top: 13rpx;
				height: 10%;
				.tempretrue{
					margin-left: 30rpx;
					font-size: 30rpx;
				}
				.city{
					position: absolute;
					font-weight: 500;
					font-size: 12rpx;
					left: 84rpx;
					top: 20rpx;
				}
				.time{
					position: absolute;
					display: flex;
					flex-direction: column;
					align-items: end;
					right: 14rpx;
					top: -3rpx;
					font-size: 20rpx;
					.timebottom{
						font-size: 11rpx;
					}
				}
			}
			
			.content-main{
				width: 100%;
				height: 80%;
				margin-top: 30rpx;
				
				.rt{
					position: absolute;
					color: #fff;
					font-size: 6rpx;
						top: 410rpx;
						 right: 6rpx;
					
				}
				
				.content-main-info1{
					margin-top: 10rpx;
					display: grid;
					grid-template-columns: 1fr 10fr;
					row-gap: 10px;
					margin-bottom: -8rpx;
					.img1{
						width:25rpx;
						height:25rpx;
						margin-left: 10rpx;
					}
					.box{
						 height: 100px;
						display: flex;
						position: relative;
						 align-items: center;
					}
					
					.content-main-info-name{
					font-size:12rpx;						
					                        }
					.content-main-info-ZT{
							font-size: 8rpx;
							white-space: nowrap;
						                 }
				                     } 
							  
					.yellow{
						
						height: 5%;
						.yn{
							height: 80%;
							width:  100%;
						}
					}	
						   
						   
			        .content-main-info2{
				    display: grid;
				   grid-template-columns: 1fr 10fr;
				   row-gap: 0px;
				   .img2{
					width:25rpx;
					height:25rpx;
					row-gap: 10px;
					margin-left: 10rpx;
				
				}
				.content-main-info-name{
						font-size:12rpx;						
					}
				.content-main-info-ZT{
						font-size: 8rpx;
						white-space: nowrap;
					}
			                          }	
															 
												 
				   .HBDW-HBR{
					margin-left: 38rpx;
					margin-top: 0rpx;
					font-size: 10rpx;
				}
			}
		}
	}

.box{
	 height: 100px;
	display: flex;
	position: relative;
	 align-items: center;
	 margin-bottom: 10px;
}




</style>


?1.右侧的文字大小 
?2.右侧议题名称不换行
 3.校长发布会的接口调用  位置