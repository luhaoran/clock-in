<template>
  <div id="statistics">
    <van-calendar
      :min-date="new Date(2010, 0, 1)"
      :max-date="new Date()"
      color="#2867ce"
      v-model="showDateSelect"
      type="range"
      @confirm="onConfirm"
    />
    <div class="list">
      <h3 style="padding:0 16px">出勤统计<van-tag type="warning" style="margin-left:10px">出勤半天计为1次</van-tag></h3>
      <van-cell-group>
        <van-cell
          title="选择日期区间"
          icon="calender-o"
          :value="endDate + ' - ' + startDate"
          size="large"
          @click="showDateSelect=true"
        />
      </van-cell-group>
      <!-- <div class="alert alert-warning">出勤半天算作为1次</div> -->
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item v-for="item in users" :key="JSON.stringify(item)" :title="item.name"  :name="item.name" :value="'共出勤'+item.count+'次'">
          <ul>
            <li v-for="(value,key2) in item.clocks" :key="JSON.stringify(value)">
              {{key2}}
              <span v-if="value.morning">上午</span>
              <span v-if="value.afternoon">下午</span>
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  data() {
    return {
      name: "Statistics",
      activeKey: 0,
      showDateSelect: false,
      startDate: "",
      endDate: "",
      activeNames: [],
      users:[]
    };
  },
  mounted() {
    this.startDate = this.getNowFormatDate();
    //获取上个月日期
    this.endDate = this.getLastMonthDate();

    this.getTongji()
  },
  methods: {
    getLastMonthDate() {
      var now = new Date();
      var year = now.getFullYear(); //getYear()+1900=getFullYear()
      var month = now.getMonth() + 1; //0-11表示1-12月
      var day = now.getDate();
      var dateObj = {};
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      }

      dateObj.now = year + "-" + month + "-" + day;

      if (parseInt(month) == 1) {
        //如果是1月份，则取上一年的12月份
        dateObj.last = parseInt(year) - 1 + "-12-" + day;
        return dateObj;
      }

      var preSize = new Date(year, parseInt(month) - 1, 0).getDate(); //上月总天数
      if (preSize < parseInt(day)) {
        //上月总天数<本月日期，比如3月的30日，在2月中没有30
        dateObj.last = year + "-" + month + "-01";
        return dateObj.last;
      }

      if (parseInt(month) <= 10) {
        dateObj.last = year + "-0" + (parseInt(month) - 1) + "-" + day;
        return dateObj.last;
      } else {
        dateObj.last = year + "-" + (parseInt(month) - 1) + "-" + day;
        return dateObj.last;
      }
    },
    formatDate(date) {
      let month = date.getMonth() + 1;
      if (month < 10) month = "0" + month;

      let day = date.getDate();
      if (day < 10) day = "0" + day;

      if (date.getMonth() < 10) return `${date.getFullYear()}-${month}-${day}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.showDateSelect = false;
      this.startDate = this.formatDate(start);
      this.endDate = this.formatDate(end);
    },
    getTongji(){
      const { startDate,endDate } = this
      const data = { startDate,endDate }
      this.$axios.get('/getTongji',{params:data}).then(({data})=>{
        if(data.status === 1){
          this.users = data.data
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.alert {
  font-size: 12px;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  margin: 1em 16px;
}
.alert-warning {
  background-color: #ff976aa6;
}
</style>