<template>
  <div class="add">
    <van-nav-bar title="添加到我的电影"></van-nav-bar>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">影片</label>
        </div>
        <div class="weui-cell__bd">
          <input placeholder="请输入影片" class="weui-input" v-model="movie.title" />
        </div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <label class="weui-label">选择地点</label>
        </div>
        <div class="weui-cell__bd" @click="bindPickerChange">{{addressList[index].label}}</div>
        <span class="weui-cell__ft" @click="bindPickerChange"></span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">评分</label>
        </div>
        <div class="weui-cell__bd">
<<<<<<< HEAD
          <input placeholder="请输入评分" class="weui-input" type="digit" v-model="movie.grade" />
=======
          <input class="weui-input" type="number" v-model="movie.grade" />
>>>>>>> ea586c0fd8d08f8272fbce71d0872bcbecf5408e
        </div>
      </div>
    </div>
    <div style="padding:15px;">
      <a href="javascript:;" @click="add" class="weui-btn weui-btn_block weui-btn_plain-primary">保存</a>
    </div>
  </div>
</template>

<script>
// import { Toast } from "mint-ui";
export default {
  name: "add",
  data() {
    return {
      movie: {
        title: "",
        grade: ""
      },
      addressList: [
        {
          label: "家里",
          value: 0
        },
        {
          label: "影院",
          value: 1
        }
      ],
      index: 0
    };
  },
  created() {},
  methods: {
    add() {
      if (!this.movie.title || !this.movie.grade) {
        // this.$weui.topTips("请添加对应的信息");
        this.$toast({
          message: "请添加对应的信息",
          position: "bottom",
          duration: 2000
        });
      } else {
        this.movie.address = this.addressList[this.index].label;
        const nowTime = this.$date.formatTime(new Date());
        this.movie.createTime = nowTime;
        this.movie.updateTime = nowTime;
        this.$http.post("/movie.json", this.movie).then(res => {
          // this.$weui.toast("保存成功", 2000);
          this.$toast({
            type: "success",
            message: "保存成功",
            duration: 2000
          });
          // setTimeout(() => {
          this.$router.push({ path: "/" });
          // }, 2000);
        });
      }
    },
    bindPickerChange() {
      this.$weui.picker(this.addressList, {
        className: "custom-classname",
        container: "body",
        defaultValue: [0],
        onChange: result => {
          // this.index = result[0].value;
        },
        onConfirm: result => {
          this.index = result[0].value;
        },
        id: "singleLinePicker"
      });
    }
  }
};
</script>

<style>
</style>
