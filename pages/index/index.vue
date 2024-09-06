<template>
	<view class="container">
	<view class="content">
		<image src="../../static/2.png" mode=""></image>
		<view class="HYinfo">
			<view class="YTBH">议题编号：{{YTrow[curYTIndex].YTBH}}</view>
			<view class="YTMC">当前议题：{{YTrow[curYTIndex].YTMC}}</view>
			
			<view class="HBDW">
					汇报单位：{{YTrow[curYTIndex].HBDW_DISPLAY}}
			</view>
			<view class="HBR">
				
					汇报人：{{YTrow[curYTIndex].HHRY}}
				
				
			</view>
		</view>
		<view class="content-right">
			<view class="content-right-header">
				<view class="tempretrue">
					38°
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
				<view class="content-main-info">
					<view class="content-main-info-name">1</view>
					<view class="content-main-info-ZT">1</view>
				</view>
				<view class="HBDW-HBR">
					<view class="HBDW">汇报单位：</view>
					<view class="HBR">汇报人：</view>
				</view>
				<view class="content-main-info" style="margin-top: 8rpx;" >
					<view class="content-main-info-name">1</view>
					<view class="content-main-info-ZT">1</view>
				</view>
				<view class="HBDW-HBR" style="margin-top: 10rpx;" >
					<view class="HBDW">汇报单位：</view>
					<view class="HBR">汇报人：</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch} from "vue";
import {getDate, getClock, getWeek} from "../../utils/TimeUtils.js";
import getHYinfo from "../../request/getHYinfo.js";
import getYTinfo from "../../request/getYTinfo.js";

import { HYinfoType, YTrowItem} from "../../types/OutSide.js";

const colock = ref(getClock())
const weekday = ref(getWeek())
const date = ref(getDate())
const HYinfo = ref<HYinfoType>({
	WID:"",
	HYMC:"",
	HYKSSJ:"",
	HYDD:"",
	ZCR:""
})

const YTrow = ref<YTrowItem[]>([{
	YTMC:"",
	HBDW_DISPLAY: "",
	ZT_DISPLAY: "",
	ZT:"",
	HHRY: "" //汇报人列表
}])
const curYTIndex = ref(0)



let timer = setInterval(() => {
	colock.value = getClock()
	date.value = getDate()
	weekday.value = getWeek()
},1000)

onUnmounted(() => {
	console.log("清除")
	clearInterval(timer)
})
	
	
// const state = reactive({
//   [`YTrow[${curYTIndex}].ZT_DISPLAY`]: '进行中',
// });
// 	const contentMainInfoZT = computed(() => {
// 	  return {
// 	    red: state.YTrow[curYTIndex].ZT_DISPLAY === '未开始',
// 	    yellow: state.YTrow[curYTIndex].ZT_DISPLAY === '进行中'
// 	  };
// 	});
</script>

<style scoped lang="scss">
	// .container{
	// 	height: 100vh;
	// 	width: 100vw;
	// 	background-color: #aaa;
	// }
	image{
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
		.HYinfo{
			position: absolute;
			left: 18rpx;
			bottom: 20rpx;
			width: 499rpx;
			height: 136rpx;
			.YTBH{
				color: #fff;
				width: 100%;
				font-size: 20rpx;
				font-weight: 400;
				margin-top: -125rpx;
				margin-left: 120rpx;
				
			}
			.YTMC{
				color: #fff;
				width: 100%;
				font-size: 30rpx;
				font-weight: 600;
				margin-top: 15rpx;
			}
			.HBDW{
				color: #fff;
				width: 100%;
				font-size: 15rpx;
				font-weight: 400;
				margin-top: 35rpx;
				margin-left: 140rpx;
				
			}
			.HBR{
				
				font-size: 15rpx;
				font-weight: 400;
				color: #fff;
				margin-top: 15rpx;
				margin-left: 160rpx;
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
					margin-left: 44rpx;
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
				.content-main-info{
					display: flex;
					align-items: center;
					
					margin-left: 46rpx;
					margin-top: 15rpx;
					.content-main-info-name{
						font-size: 20rpx;
					}
					.content-main-info-ZT{
						font-size: 10rpx;
						color: white;			}
				}
				.HBDW-HBR{
					margin-left: 46rpx;
					margin-top: 4rpx;
					font-size: 17rpx;
				}
			}
		}
	}

.red {
  color: red;
}

.yellow {
  color: yellow;
}
</style>
