<template>
  <div id="Index">
    <van-cell-group>
      <van-cell
        title="选择日期"
        icon="calender-o"
        :value="date"
        size="large"
        @click="showDateSelect=true"
      />
    </van-cell-group>
    <van-calendar
      v-model="showDateSelect"
      :min-date="new Date(2010, 0, 1)"
      :max-date="new Date()"
      color="#2867ce"
      :show-confirm="false"
      @confirm="onConfirm"
    />
    <div class="wrap">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="(item) in users" :key="JSON.stringify(item)" :title="item.name" />
      </van-sidebar>
      <div class="clock-in">
        <h2>{{selectUser.name}}</h2>
        <div class="clock-in-item">
          <div class="clock-icon">
            <svg class="icon" aria-hidden="true" @click="daka(1)">
              <use v-if="selectUser.clock_1 === 1" xlink:href="#icon-gou" />
              <use v-else xlink:href="#icon-daka" />
            </svg>
          </div>
          <p>上午打卡</p>
        </div>
        <div class="clock-in-item">
          <div class="clock-icon">
            <svg class="icon" aria-hidden="true" @click="daka(2)">
              <use v-if="selectUser.clock_2 === 1" xlink:href="#icon-gou" />
              <use v-else xlink:href="#icon-daka" />
            </svg>
          </div>
          <p>上午打卡</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Index",
  data() {
    return {
      name: "Index",
      activeKey: 0,
      selectUser: 0,
      selectUserIndex: 0,
      users: [],
      showDateSelect: false,
      date: this.getNowFormatDate()
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      let data = {};
      data.date = this.date;
      this.$axios.get("/getUser", { params: data }).then(({ data }) => {
        if (data.status === 1) {
          this.users = data.user;
          this.selectUser = data.user[this.activeKey];
        }
      });
    },
    onChange(index) {
      const { users } = this;
      this.selectUser = users[index];
      this.selectUserIndex = index;
      console.log(this.selectUser);
    },
    daka(clockType) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      let data = {};
      data.clockType = clockType;
      data.clockDate = this.date;
      data.userId = this.selectUser.id;
      this.$axios.get("/setUserClock", { params: data }).then(({ data }) => {
        if (data.status === 1) {
          this.getUser()
          Toast.success({
              message:'打卡成功',
              duration:1000
          });
        }else{
            Toast.fail({
              message:'打卡失败',
              duration:1000
          });
        }
      });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    onConfirm(date) {
      this.showDateSelect = false;
      this.date = this.formatDate(date);
      this.getUser();
      this.activeKey = 0
      console.log(this.date);
    },
    formatDate(date) {
      let month = date.getMonth() + 1;
      if (month < 10) month = "0" + month;

      let day = date.getDate();
      if (day < 10) day = "0" + day;

      if (date.getMonth() < 10) return `${date.getFullYear()}-${month}-${day}`;
    }
  }
};
</script>

<style scoped lang="less">
.van-sidebar-item--select::before {
  background-color: #2867ce;
}
.wrap {
  display: flex;
}
.clock-in {
  text-align: center;
  margin-top: 10%;
  width: calc(100% - 85px);
  .clock-in-item {
    color: #bfbfbf;
    margin: 40px 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .clock-icon {
      border: 2px dashed #bfbfbf;
      width: 120px;
      height: 120px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 45px;
    }
  }
  p {
    font-size: 14px;
    margin-top: 10px;
    display: block;
  }
}
</style>