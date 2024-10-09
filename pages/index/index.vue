<template>
  <view class="container">
    <view class="content">
      <image src="../../static/bcg.png" mode="" class="bg"></image>

      <view class="title">{{HYinfo.HYMC}}</view>
      <view class="HYinfo">

        <view class="YTBH">{{YTrow[curYTIndex]?.YTBH  ? `议题编号：${YTrow[curYTIndex].YTBH}`:''}}</view>
        <view class="YTMC">{{YTrow[curYTIndex]?.YTMC ? `汇报单位：${YTrow[curYTIndex].YTMC }`:''}}</view>

        <view class="HBDW">
          {{YTrow[curYTIndex].HBDW_DISPLAY ? `汇报单位：${YTrow[curYTIndex].HBDW_DISPLAY}`:''}}
        </view>
        <view class="HBR">
          {{YTrow[curYTIndex]?.HHRY ? `汇报人：${YTrow[curYTIndex]?.HHRY}`: ''}}
        </view>

      </view>


      <view class="content-right">
        <view class="content-right-header">
          <view class="tempretrue">
            {{ a.temperature ? `${a.temperature}°` : "" }}
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
            <view class="box left"><image :src="
                  YTrow[curYTIndex]?.ZT == 3
                    ? '../../static/bun.png'
                    : '../../static/bgn.png'" mode="" class="img1" ></image></view>
            <view class="box right">
              <view class="content-main-info-name">{{YTrow[curYTIndex]?.YTMC}}</view>
              <view :class="getClassByIndex(YTrow[curYTIndex].ZT)">{{YTrow[curYTIndex].ZT_DISPLAY ? `【${YTrow[curYTIndex]?.ZT_DISPLAY}】`: ''}}</view>
            </view>


            <view class="yellow"><image src="../../static/yn.png" class="yn"  v-show="YTrow[curYTIndex]?.ZT == 3"></image></view>


            <view class="HBDW">{{YTrow[curYTIndex].HBDW_DISPLAY ? `汇报单位：${YTrow[curYTIndex].HBDW_DISPLAY}`:''}}</view>
            <view class="HBR">{{YTrow[curYTIndex]?.HHRY ? `汇报人：${YTrow[curYTIndex]?.HHRY}`: ''}}</view>
          </view>



          <view class="content-main-info2" style="margin-top: 15rpx;" >
            <view class="box left"><image :src="
                  YTrow[curYTIndex + 1]?.ZT == 3
                    ? '../../static/bun.png'
                    : '../../static/bgn.png' " mode="" class="img2"  ></image></view>
            <view class="box right">
              <view class="content-main-info-name" >{{YTrow[curYTIndex+1]?.YTMC}}</view>
              <view :class="getClassByIndex(YTrow[curYTIndex].ZT)">{{YTrow[curYTIndex+1]?.ZT_DISPLAY ? `【${YTrow[curYTIndex]?.ZT_DISPLAY}】`: ''}}</view>
            </view>

            <view class="yellow"><image src="../../static/yn.png" class="yn"   v-show="YTrow[curYTIndex + 1]?.ZT == 3"></image></view>


            <view class="HBDW">{{YTrow[curYTIndex+1]?.HBDW_DISPLAY ? `汇报单位：${YTrow[curYTIndex].HBDW_DISPLAY}`:''}}</view>
            <view class="HBR">{{YTrow[curYTIndex+1]?.HHRY ? `汇报人：${YTrow[curYTIndex]?.HHRY}`: ''}}</view>
          </view>
          <view class="rt">
            重庆邮电大学信息化办<br>
            蓝山工作室开发<br>
            技术支持：62461295
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onUnmounted, reactive, onMounted} from "vue";
import {getDate, getClock, getWeek} from "../../utils/TimeUtils.js";
import getHYinfo from "../../request/getHYinfo.js";
import getYTinfo from "../../request/getYTinfo.js";
import { HYinfoType, YTrowItem} from "../../types/OutSide.js";

const a = ref({

})

const weather  = setInterval(getTempretrue,1000*60*30);

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
  HHRY: "" ,//汇报人列表
  YTBH:""
}])


function getTempretrue()  {
  uni.request({
    url:'https://api.seniverse.com/v3/weather/now.json?key=Sf1hBVAVv6f_0GVjz&location=chongqing&language=zh-Hans&unit=c',
    method: 'GET',
    success: (res) => {


      a.value = res.data.results[0].now
    }
  })
}


const curYTIndex = ref(0)
const isPolling = ref(true)
let rollStep = 1

Array.prototype.findLastIndex = function(callback:Function) {
  // 从数组的最后一个元素开始反向查找
  for (let i = this.length - 1; i >= 0; i--) {
    // 如果找到符合条件的元素，返回其索引
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  // 如果没有找到符合条件的元素，返回 -1
  return -1;
};


const getClassByIndex = (index: number | string) => {
  return `content-main-info-ZT ZT-${index}`;
};

//用于议题的滚动
const rollYT = () => {
  curYTIndex.value += rollStep
}

const updateYTinfo = () => {
  getYTinfo().then((res) => {
    // console.log("hhhhhhh",res.datas.hqytxxxx.rows.filter((item: { HYID: string; }) => item.HYID === HYinfo.value.WID))
    YTrow.value = res.datas.hqytxxxx.rows.filter((item: { HYID: string; }) => item.HYID === HYinfo.value.WID)
    // 1:未开始 2:等候中 3:进行中 4:已结束 5:即将结束
    curYTIndex.value = Math.max(YTrow.value.findIndex(item => item.ZT == '3'),Math.max(YTrow.value.findLastIndex((item) => item.ZT == '4'),0)); //要么正在进行中的，要么是最后一个已结束的，要么是第零个
    curYTIndex.value = Math.max(0,Math.min(curYTIndex.value,YTrow.value.length-3)) //最大为倒数第三个，但是也不能小于0
    if(YTrow.value.length > 2){
      setTimeout(() => {
        console.log("roll")
        rollYT()
      },7500)
    }
  }).catch(err => {
    console.log(err)
  })
}

const startPolling = () => {
  if(!isPolling.value) return;
  console.log("polling")
  setTimeout(() => {
    getHYinfo().then((res) => {
      const {HYMC,HYKSSJ,HYDD,ZCR,WID} = res.datas.hqhyxxxx.rows[0]
      HYinfo.value.HYMC = HYMC
      HYinfo.value.HYDD = HYDD
      HYinfo.value.HYKSSJ = HYKSSJ
      HYinfo.value.ZCR = ZCR
      HYinfo.value.WID = WID
      updateYTinfo()
      startPolling()
    }).catch(err => {
      console.log(err)
    })
  },15000)
}

const stopPolling = () => {
  isPolling.value = false
}

onMounted(() => {

  getTempretrue()
})

onMounted(() => {
  getHYinfo().then((res) => {
    const {HYMC,HYKSSJ,HYDD,ZCR,WID} = res.datas.hqhyxxxx.rows[0]
    HYinfo.value.HYMC = HYMC
    HYinfo.value.HYDD = HYDD
    HYinfo.value.HYKSSJ = HYKSSJ
    HYinfo.value.ZCR = ZCR
    HYinfo.value.WID = WID
    updateYTinfo()
    startPolling()
  }).catch(err => {
    console.log(err)
  })
})

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

.ZT-1 {
  color: coral;
}
.ZT-2 {
  color: burlywood;
}
.ZT-3 {
  color: bisque;
}
.ZT-4 {
  color: darkcyan;
}
.ZT-5 {
  color: cornsilk;
}

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
    font-size: 20rpx;
    font-weight: 550;
    left:260rpx;
    top:16rpx

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
      display: flex;
      flex-direction: column;
      .rt{
        order: 1;
        position: absolute;
        color: #fff;
        font-size: 8rpx;
        top: 350rpx;
        right: 80rpx;

      }

      .content-main-info1{
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr; /* 四行 */
        grid-template-columns: 1fr 10fr; /* 两列 */
        margin-top: 20rpx;
        .img1{
          width:25rpx;
          height:25rpx;
          margin-left: 10rpx;
        }


        .content-main-info-name  {
          font-size:12rpx;
        }
        .content-main-info-ZT  {
          font-size: 8rpx;
          white-space: nowrap;
        }
      }
      .yn{
        width:250rpx;
        height:25rpx;
        margin-left: -30rpx;
      }

      .yellow,
      .HBDW,
      .HBR{
        grid-column: 1 / -1;
        margin-left: 38rpx;
        font-size: 10rpx;
        margin-top: -7rpx;
      }


      .content-main-info2{
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr; /* 四行 */
        grid-template-columns: 1fr 10fr; /* 两列 */
        margin-top: 20rpx;
        .img2{
          width:25rpx;
          height:25rpx;
          margin-left: 10rpx;
        }


        .content-main-info-name  {
          font-size:12rpx;
        }
        .content-main-info-ZT  {
          font-size: 8rpx;
          white-space: nowrap;
        }
      }
      .yn{
        width:250rpx;
        height:25rpx;
        margin-left: -30rpx;
      }

      .yellow,
      .HBDW,
      .HBR{
        grid-column: 1 / -1;
        margin-left: 38rpx;
        font-size: 10rpx;
        margin-top: -7rpx;
      }



    }
  }
}

.box{
  height: 60px;
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 10px;
}




</style>
