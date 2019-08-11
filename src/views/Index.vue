<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :data="tabbarData" />
  </div>
</template>

<script>
// import tabs from "../components/tabs";
// export default {
//   name: "index",
//   components: {
//     tabs
//   }
// };
import TabBar from "../components/TabBar";
export default {
  name: "index",
  data() {
    return {
      tabbarData: [
        // { title: "首页", icon: "/img/maoyan.png", path: "/maoyan" },
        { title: "我的电影", icon: "/img/home.png", path: "/home" },
        {
          title: "新增",
          icon: "/img/add.png",
          path: "/add"
        },
        {
          title: "小程序",
          icon: "/img/tabs-miniprogram.png",
          path: "/miniprogram"
        }
      ]
    };
  },
  components: {
    TabBar
  }
};
</script>

<style scoped>
.index {
  padding-bottom: 45px;
}
</style>
