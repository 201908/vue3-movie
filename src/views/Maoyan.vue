<template>
  <div>
    <van-nav-bar title="猫眼实时票房"></van-nav-bar>
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
          @click="add(item.movieName)"
          hover-class="global-hover"
        >
          <h4 class="weui-media-box__title">{{item.movieName}}</h4>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">{{item.releaseInfo}}</li>
            <li class="weui-media-box__info__meta">{{item.sumBoxInfo}}</li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra blue-wrap">
              今日票房
              <span class="blue">{{item.boxInfo}}</span>万
            </li>
          </ul>
        </div>
      </div>
    </div>
    <view class="weui-loadmore weui-loadmore_line" v-show="loadmore">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无影片</view>
    </view>
  </div>
</template>

<script>
export default {
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
  },
  methods: {
    getData() {
      this.$http.get("/api/box/second.json").then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.loadmore = this.list.length > 0 ? false : true;
        // 搜索用到的
        this.searchList = this.list;
      });
    },
    add(name) {
      app.toSwitchParam = name;
      wx.switchTab({
        url: "/pages/add/main"
      });
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
        return item.movieName.match(value);
      });
    }
  }
};
</script>

<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.blue-wrap {
  border: 0;
  float: right;
}
.blue {
  color: #009eef;
}
.weui-media-box__info {
  color: #999;
}
</style>
