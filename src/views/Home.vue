<template>
  <div class="home">
    <!-- <my-component></my-component> -->
    <van-nav-bar title="我看过的电影"></van-nav-bar>
    <div class="weui-search-bar" :class="{'weui-search-bar_focusing':inputShowed}" id="search_bar">
      <form class="weui-search-bar__form" action="javascript:return true">
        <div class="weui-search-bar__box">
          <!-- <icon class="weui-icon-search_in-box" type="search" size="14"></icon> -->
          <i class="weui-icon-search"></i>
          <input
            type="search"
            class="weui-search-bar__input"
            id="search_input"
            placeholder="搜索"
            v-model="inputVal"
            :focus="inputShowed"
            @keyup.enter="confirmSearch"
          />
          <input type="text" style="display:none" />
          <a
            class="weui-icon-clear"
            id="search_clear"
            v-if="inputVal.length > 0"
            @click="clearInput"
          >
            <!-- <icon type="clear" size="14"></icon> -->
          </a>
        </div>
        <label
          for="search_input"
          class="weui-search-bar__label"
          :hidden="inputShowed"
          @click="showInput"
        >
          <!-- <icon class="weui-icon-search" type="search" size="14"></icon> -->
          <i class="weui-icon-search"></i>
          <span class="weui-search-bar__text">搜索</span>
        </label>
      </form>
      <a v-if="!inputVal" class="weui-search-bar__cancel-btn" @click="hideInput">取消</a>
      <a v-else class="weui-search-bar__cancel-btn" @click="confirmSearch">搜索</a>
    </div>
    <div class="weui-panel" style="margin-top:0;">
      <div class="weui-panel__bd">
        <div
          class="weui-media-box weui-media-box_text"
          v-for="(item,index) in list"
          :key="index"
          @click="$router.push('/edit/' + item.id)"
        >
          <h4 class="weui-media-box__title">{{item.title}}</h4>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">{{item.address}}</li>
            <li class="weui-media-box__info__meta">{{item.createTime}}</li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{item.grade}}分</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="loadmore">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无影片</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      list: [],
      searchList: [],
      inputShowed: false,
      inputVal: "",
      loadmore: false
    };
  },
  created() {
    this.getData();
    console.log(this.GLOBAL.userSite);
    this.changeData();
    // this.$weui.alert("alert");
  },
  methods: {
    getData() {
      // console.log(this.$store.getters.openId)
      this.$http
        .get("/movie.json")
        .then(res => {
          return res.data;
        })
        .then(res => {
          var blogsArray = [];
          for (let key in res) {
            res[key].id = key;
            blogsArray.push(res[key]);
          }
          this.list = blogsArray.reverse();
          this.loadmore = this.list.length > 0 ? false : true;
          // 搜索用到的
          this.searchList = this.list;
        });
    },
    edit(e) {
      console.log(e);
    },
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = "";
      this.inputShowed = false;
      this.confirmSearch();
    },
    clearInput() {
      this.inputVal = "";
      this.confirmSearch();
    },
    confirmSearch() {
      this.list = this.filterBy(this.searchList, this.inputVal);
      this.loadmore = this.list.length > 0 ? false : true;
    },
    filterBy(list, value) {
      return list.filter(item => {
        return item.title.match(value);
      });
    }
  }
};
</script>

<style scoped>
</style>

