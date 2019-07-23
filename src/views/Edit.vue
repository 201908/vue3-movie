<template>
  <div class="edit">
    <mt-header title="修改">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">影片</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="movie.title" />
        </div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <label class="weui-label">选择地点</label>
        </div>
        <div class="weui-cell__bd" @click="bindPickerChange">{{addressList[index].label}}</div>
        <span class="weui-cell__ft" @click="bindPickerChange"></span>
      </div>
      <div class="weui-cell disabled">
        <div class="weui-cell__hd">
          <label class="weui-label">创建时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="movie.createTime" disabled />
        </div>
      </div>
      <div class="weui-cell disabled">
        <div class="weui-cell__hd">
          <label class="weui-label">修改时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="movie.updateTime" disabled />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">评分</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-model="movie.grade" />
        </div>
      </div>
    </div>
    <div style="padding:15px;">
      <a
        href="javascript:;"
        @click="updateMovie"
        class="weui-btn weui-btn_block weui-btn_plain-primary"
      >保存</a>
      <a href="javascript:;" @click="deleteMovie" class="weui-btn weui-btn_block weui-btn_warn">删除</a>
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
  created() {
    this.fetchMovie(this.$route.params.id);
  },
  methods: {
    fetchMovie(id) {
      this.$http.get("/movie/" + id + ".json").then(response => {
        // console.log(response);
        this.movie = response.data;
        this.addressList.forEach(item => {
          if (item.label == response.data.address) {
            this.index = item.value;
          }
        });
      });
    },
    updateMovie() {
      if (!this.movie.title || !this.movie.address || !this.movie.grade) {
        // this.$weui.topTips("请添加对应的信息");
        this.$toast({
          message: "请添加对应的信息",
          position: "bottom",
          duration: 2000
        });
      } else {
        this.movie.address = this.addressList[this.index].label;
        const nowTime = this.$date.formatTime(new Date());
        this.movie.updateTime = nowTime;
        console.log(this.movie);
        this.$http
          .put("/movie/" + this.$route.params.id + ".json", this.movie)
          .then(res => {
            this.$weui.toast("保存成功", 2000);
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 2000);
          });
      }
    },
    deleteMovie() {
      let that = this;
      this.$weui.confirm(
        "确定删除吗",
        () => {
          this.$http
            .delete("/movie/" + this.$route.params.id + ".json", this.movie)
            .then(res => {
              this.$weui.toast("删除成功", 2000);
              setTimeout(() => {
                this.$router.push({ path: "/" });
              }, 2000);
            });
        },
        { title: "操作提示" }
      );
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
