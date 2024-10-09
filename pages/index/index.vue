<template>
  <view class="container">
    <view class="content">
      <image src="../../static/bg2.png" mode=""></image>
      <view class="HYinfo">
        <view class="HYMC">{{ HYinfo.HYMC }}</view>
        <view class="HYDD-HYSJ">
          <view class="HYDD">
            {{ HYinfo.HYDD }}
          </view>
          <view style="margin-top: 2rpx">
            {{ HYinfo.HYKSSJ }}
          </view>
        </view>
        <view class="bottom">
          <view class="name">
            {{ HYinfo.ZCR ? `主持人：` : `` }}{{ HYinfo.ZCR }}
          </view>
          <view class="ZW"> </view>
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
              {{ colock }}
            </view>
            <view class="timebottom"> {{ weekday }} {{ date }} </view>
          </view>
        </view>
        <view class="content-main">
          <view
            class="content-main-header"
            style="text-align: center; font-size: 23rpx"
          >
            会议议程
          </view>
          <view class="content-main-info1">
            <view class="box left"
              ><image
                :src="
                  YTrow[curYTIndex].ZT == 3
                    ? '../../static/bun.png'
                    : '../../static/bgn.png'
                "
                mode=""
                class="img1"
              ></image
            ></view>
            <view class="box right">
              <view class="content-main-info-name">{{
                getChineseIndex(YTrow[curYTIndex]?.PX) === ""
                  ? ""
                  : `议题${getChineseIndex(YTrow[curYTIndex]?.PX)}`
              }}</view>
              <view :class="getClassByIndex(YTrow[curYTIndex].ZT)">{{
                YTrow[curYTIndex].ZT_DISPLAY
                  ? `【${YTrow[curYTIndex]?.ZT_DISPLAY}】`
                  : ""
              }}</view>
              <image
                v-show="YTrow[curYTIndex].ZT == 3"
                src="../../static/yn.png"
                style="height: 56rpx; position: absolute; top: 4rpx"
              ></image>
            </view>
          </view>
          <view class="HBDW-HBR">
            <view class="HBDW">{{
              YTrow[curYTIndex].HBDW_DISPLAY
                ? `汇报单位：${YTrow[curYTIndex].HBDW_DISPLAY}`
                : ""
            }}</view>
            <view class="HBR">{{
              YTrow[curYTIndex]?.HHRY
                ? `汇报人：${YTrow[curYTIndex]?.HHRY}`
                : ""
            }}</view>
          </view>
          <view
            class="content-main-info2"
            style="margin-top: 7rpx"
            v-show="YTrow[curYTIndex + 1]"
          >
            <view class="box left"
              ><image
                :src="
                  YTrow[curYTIndex + 1]?.ZT == 3
                    ? '../../static/bun.png'
                    : '../../static/bgn.png'
                "
                mode=""
                class="img2"
              ></image
            ></view>
            <view class="box right">
              <view class="content-main-info-name"
                >议题{{ getChineseIndex(YTrow[curYTIndex + 1]?.PX) }}</view
              >
              <view :class="getClassByIndex(YTrow[curYTIndex + 1]?.ZT)"
                >【{{ YTrow[curYTIndex + 1]?.ZT_DISPLAY }}】</view
              >
              <image
                src="../../static/yn.png"
                style="height: 56rpx; position: absolute; top: -2rpx"
                v-show="YTrow[curYTIndex + 1]?.ZT == 3"
              ></image>
            </view>
          </view>

          <view
            class="HBDW-HBR"
            style="margin-top: 10rpx"
            v-show="YTrow[curYTIndex + 1]"
          >
            <view class="HBDW"
              >汇报单位：{{ YTrow[curYTIndex + 1]?.HBDW_DISPLAY }}</view
            >
            <view class="HBR">汇报人：{{ YTrow[curYTIndex + 1]?.HHRY }}</view>
          </view>
          <view class="rt"> 重庆邮电大学信息化办 <br>
		                      蓝山工作室开发 <br>
							  技术支持：62461295
							  </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, onMounted } from "vue";
import { getDate, getClock, getWeek } from "../../utils/TimeUtils.js";
import getHYinfo from "../../request/getHYinfo.js";
import getYTinfo from "../../request/getYTinfo.js";
import { HYinfoType, YTrowItem } from "../../types/OutSide.js";
import getChineseIndex from "../../utils/GetChineseIndex.js";

const a = ref({});

const weather = setInterval(getTempretrue, 1000 * 60 * 30);

function getTempretrue() {
  uni.request({
    url: "https://api.seniverse.com/v3/weather/now.json?key=Sf1hBVAVv6f_0GVjz&location=chongqing&language=zh-Hans&unit=c",
    method: "GET",
    success: (res) => {
      a.value = res.data.results[0].now;
    },
  });
}

const colock = ref(getClock());
const weekday = ref(getWeek());
const date = ref(getDate());
const HYinfo = ref<HYinfoType>({
  WID: "",
  HYMC: "",
  HYKSSJ: "",
  HYDD: "",
  ZCR: "",
});

const YTrow = ref<YTrowItem[]>([
  {
    YTMC: "",
    HBDW_DISPLAY: "",
    ZT_DISPLAY: "",
    ZT: "",
    HHRY: "", //汇报人列表
  },
]);
const curYTIndex = ref(0);
const isPolling = ref(true);
let rollStep = 1;
const timeReg = /(\d{1,2}):(\d{2}):(\d{2})/;

Array.prototype.findLastIndex = function (callback: Function) {
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
  curYTIndex.value += rollStep;
};

const updateYTinfo = () => {
  getYTinfo()
    .then((res) => {
      // console.log("hhhhhhh",res.datas.hqytxxxx.rows.filter((item: { HYID: string; }) => item.HYID === HYinfo.value.WID))
      YTrow.value = res.datas.hqytxxxx.rows.filter(
        (item: { HYID: string }) => item.HYID === HYinfo.value.WID
      );
      // 1:未开始 2:等候中 3:进行中 4:已结束 5:即将结束
      curYTIndex.value = Math.max(
        YTrow.value.findIndex((item) => item.ZT == "3"),
        Math.max(
          YTrow.value.findLastIndex((item) => item.ZT == "4"),
          0
        )
      ); //要么正在进行中的，要么是最后一个已结束的，要么是第零个
      curYTIndex.value = Math.max(
        0,
        Math.min(curYTIndex.value, YTrow.value.length - 3)
      ); //最大为倒数第三个，但是也不能小于0
      if (YTrow.value.lenth > 2) {
        setTimeout(() => {
          console.log("roll");
          rollYT();
        }, 7500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const startPolling = () => {
  if (!isPolling.value) return;
  console.log("polling");
  setTimeout(() => {
    getHYinfo()
      .then((res) => {
        const { HYMC, HYKSSJ, HYDD, ZCR, WID } = res.datas.hqhyxxxx.rows[0];
        const matchTime = HYKSSJ.match(timeReg);
        HYinfo.value.HYMC = HYMC;
        HYinfo.value.HYDD = HYDD;
        HYinfo.value.HYKSSJ = `${matchTime[1]}:${matchTime[2]}:${matchTime[3]}`;
        HYinfo.value.ZCR = ZCR;
        HYinfo.value.WID = WID;
        updateYTinfo();
        startPolling();
      })
      .catch((err) => {
        console.log(err);
      });
  }, 15000);
};

const stopPolling = () => {
  isPolling.value = false;
};

onMounted(() => {
  getHYinfo()
    .then((res) => {
      const { HYMC, HYKSSJ, HYDD, ZCR, WID } = res.datas.hqhyxxxx.rows[0];
      const matchTime = HYKSSJ.match(timeReg);
      HYinfo.value.HYMC = HYMC;
      HYinfo.value.HYDD = HYDD;
      HYinfo.value.HYKSSJ = `${matchTime[1]}:${matchTime[2]}:${matchTime[3]}`;
      HYinfo.value.ZCR = ZCR;
      HYinfo.value.WID = WID;
      updateYTinfo();
      startPolling();
    })
    .catch((err) => {
      console.log(err);
    });
});

onMounted(() => {
  getTempretrue();
});

let timer = setInterval(() => {
  colock.value = getClock();
  date.value = getDate();
  weekday.value = getWeek();
}, 1000);

onUnmounted(() => {
  console.log("清除");
  stopPolling();
  clearInterval(timer);
  clearInterval(weather);
});
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

image {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -999;
}
.content {
  display: flex;
  width: 750rpx;
  height: 422rpx;
  background-size: cover;
  .HYinfo {
    position: absolute;
    left: 18rpx;
    bottom: 20rpx;
    width: 499rpx;
    height: 136rpx;
    .HYMC {
      color: #fff;
      width: 100%;
      font-size: 40rpx;
      font-weight: 600;
    }
    .HYDD-HYSJ {
      color: #fff;
      width: 100%;
      font-size: 20rpx;
      font-weight: 400;
      margin-top: 20rpx;
      /* border: 1px solid red; */
      display: flex;
      .HYDD {
        margin-right: 20rpx;
      }
    }
    .bottom {
      display: flex;
      font-size: 20rpx;
      font-weight: 400;
      color: #fff;
      margin-top: 15rpx;
      .name {
        margin-right: 20rpx;
      }
    }
  }

  .content-right {
    width: 235rpx;
    height: 100vh;
    margin-left: 515rpx;
    color: #fff;
    right: 0;
    top: 0;
    .content-right-header {
      display: flex;
      position: relative;
      margin-top: 13rpx;
      height: 10%;
      .tempretrue {
        margin-left: 44rpx;
        font-size: 30rpx;
      }
      .city {
        position: absolute;
        font-weight: 500;
        font-size: 12rpx;
        left: 84rpx;
        top: 20rpx;
      }
      .time {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: end;
        right: 14rpx;
        top: -3rpx;
        font-size: 20rpx;
        .timebottom {
          font-size: 11rpx;
        }
      }
    }

    .content-main {
      width: 100%;
      height: 80%;
      margin-top: 30rpx;

      .rt {
        position: absolute;
        color: #fff;
        font-size: 8rpx;
        top: 350rpx;
        right: 80rpx;
      }

      .content-main-info1 {
        margin-top: 10rpx;
        display: grid;
        grid-template-columns: 1fr 10fr;
        row-gap: 10px;
        margin-bottom: -8rpx;
        .img1 {
          width: 25rpx;
          height: 25rpx;
          margin-left: 8rpx;
        }
        .box {
          height: 100px;
          display: flex;
          position: relative;
          align-items: center;
        }

        .content-main-info-name {
          font-size: 12rpx;
          margin-left: 25rpx;
        }
        .content-main-info-ZT {
          font-size: 8rpx;
          white-space: nowrap;
        }
      }

      .content-main-info2 {
        display: grid;
        grid-template-columns: 1fr 10fr;
        row-gap: 0px;
        .img2 {
          width: 25rpx;
          height: 25rpx;
          row-gap: 10px;
          margin-left: 8rpx;
        }
        .content-main-info-name {
          font-size: 12rpx;
          margin-left: 25rpx;
        }
        .content-main-info-ZT {
          font-size: 8rpx;
          white-space: nowrap;
        }
      }

      .HBDW-HBR {
        margin-left: 46rpx;
        margin-top: 4rpx;
        font-size: 12rpx;
      }
    }
  }
}

.box {
  height: 60px;
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 10px;
}
</style>
