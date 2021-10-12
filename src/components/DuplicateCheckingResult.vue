<template>
  <div class="result-container">
    <header class="result-container-header">
      <div class="left">
        <img class="bilibili-img" src="../assets/icons/bilibili-fill.png" />
        <span class="username">{{ user.username }}</span>
      </div>
      <div class="right">
        <span class="checking-rate"
          >查重率:{{ user.duplicateCheckingRate }}%</span
        >
      </div>
    </header>
    <section>
      <span class="user-content">{{ user.content }}</span>
    </section>
    <footer class="result-container-footer">
      <div class="left">
        <img class="foot-img" src="../assets/icons/time.png" />
        <span>发表日期：{{ user.issuingDate }}</span>
      </div>
      <div class="right">
        <img class="foot-img" src="../assets/icons/link.png" />
        <a :href="user.link">
          <span class="view-details">查看详情</span>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "DuplicateCheckingResult",
  props: ["user"],
};
</script>

<style scoped>
/*手机端*/
@media only screen and (max-width: 1000px) {
  .result-container {
    background-color: rgb(248, 248, 248);
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    margin-top: 40px;
  }
  .result-container-header {
    display: flex;
    justify-content: space-between;
    line-height: 32px;
  }
  .result-container-header > .left {
    display: flex;
    align-items: center;
  }
  .result-container-header > .left > img {
    width: 25px;
    height: 25px;
  }
  .result-container-header > .left > .username {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    margin-left: 10px;
  }
  .result-container-header > .right > .checking-rate,
  .result-container-footer > .right .view-details {
    padding-right: 10px;
    color: #6b7280;
  }
  /*超出的内容隐藏*/
  .user-content {
    height: 130px;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: scroll;
    color: #6b7280;
  }
  .user-content::-webkit-scrollbar {
    display: none;
  }
  .result-container-footer img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .result-container-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #6b7280;
  }
  .result-container-footer > .left,
  .result-container-footer > .right {
    display: flex;
    align-items: center;
  }
  .result-container-footer > .right > a {
    text-decoration: none;
    color: #6b7280;
  }
}
/*pc端*/
@media (min-width: 1000px) {
  .result-container {
    background-color: rgb(248, 248, 248);
    width: 700px;
    height: 210px;
    box-sizing: border-box;
    margin-top: 30px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .result-container-header {
    display: flex;
    justify-content: space-between;
    line-height: 32px;
  }
  .bilibili-img {
    width: 25px;
    height: 25px;
  }
  .result-container-header > .left {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  .result-container-header > .left > .username {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    margin-left: 10px;
  }
  .result-container-header > .right > .checking-rate,
  .result-container-footer > .right .view-details {
    padding-right: 10px;
    color: #6b7280;
    font-size: 20px;
  }
  /*超出的内容隐藏*/
  .user-content {
    height: 100px;
    width: 100%;
    display: -webkit-box;
    overflow: scroll;
    /*-webkit-box-orient: vertical;*/
    /*-webkit-line-clamp: 4;*/
    /*overflow: hidden;*/
    color: #6b7280;
    font-size: 20px;
  }
  .user-content::-webkit-scrollbar {
    display: none;
  }
  .foot-img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .result-container-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #6b7280;
    font-size: 20px;
  }
  .result-container-footer .left,
  .result-container-footer .right {
    display: flex;
    align-items: center;
  }
  .result-container-footer > .right > a {
    text-decoration: none;
    color: #6b7280;
  }
}
</style>
