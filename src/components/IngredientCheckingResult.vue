<template>
  <div class="result-container">
    <div class="result-picture-box">
      <img class="result-profile-picture" :src="user.pictureUrl" />
    </div>
    <div class="result-body-padding">
      <div class="result-picture-padding"></div>
      <div class="result-name">{{ user.username }}</div>
      <div class="result-description">{{ user.description }}</div>
      <div class="result-split-line"></div>
      <div class="result-sign">{{ user.sign }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IngredientCheckingResult",
  props: ["user"],
};
</script>

<style scoped>
/*pc端*/
@media (max-width: 2000px) {
  .result-container {
    width: 200px;
    height: 210px;
    box-sizing: border-box;
    margin-top: 50px;
    margin-left: 50px;
    padding: 10px;
  }
  .result-picture-box {
    float: left;
    display: inline-block;
    position: relative;
    left: 40px;
    height: auto;
    z-index: 1;
  }
  .result-profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #d1d5db;
  }
  .result-body-padding {
    background-color: rgb(248, 248, 248);
    float: left;
    position: relative;
    top: -50px;
    height: 170px;
  }
  .result-picture-padding {
    height: 50px;
  }
  .result-name {
    font-size: 15px;
    text-align: center;
    font-weight: bold;
  }
  .result-description {
    text-align: center;
  }
  .result-split-line {
    float: contour;
    width: 70%;
    margin: 10px auto;
    border: 1px solid black;
  }
}
/*手机端*/
@media only screen and (max-width: 1000px) {
  .result-container {
    background-color: rgb(248, 248, 248);
    width: 40%;
    height: auto;
    box-sizing: border-box;
    margin: 10px 0px 10px 20px;
  }
  .result-picture-box {
    float: left;
    display: inline-block;
    position: relative;
    left: 30%;
    height: auto;
    width: auto;
    z-index: 1;
  }
  .result-profile-picture {
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: #d1d5db;
  }
}
</style>
