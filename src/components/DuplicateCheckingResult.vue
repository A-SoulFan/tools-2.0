<template>
    <div class="result-container">
       <header>
           <div class="left">
               <img src="../assets/icons/bilibili-fill.png">
               <span class="username">{{user.username}}</span>
           </div>
           <div class="right">
               <span class="checking-rate">查重率:{{user.duplicateCheckingRate}}%</span>
           </div>
       </header>
        <section>
            <span>{{user.content}}</span>
        </section>
        <footer>
            <div class="left">
                <img src="../assets/icons/time.png">
                <span>发表日期：{{user.issuingDate}}</span>
            </div>
            <div class="right">
                <img src="../assets/icons/link.png">
                <a href="#">
                    <span>查看详情</span>
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "DuplicateCheckingResult",
        props:['user']
    }
</script>

<style scoped>

    /*手机端*/
    /*竖屏*/
    @media only screen and (orientation: portrait) and (max-width: 500px) {
        .result-container{
            background-color: rgb(248,248,248);
            width: 100%;
            height: 200px;
            box-sizing: border-box;
            margin-top: 40px;
        }
        header{
            display: flex;
            justify-content: space-between;
            line-height: 32px;
        }
        header > .left > img{
            width: 25px;
            height: 25px;
        }
        header > .left{
            display: flex;
            align-items: center;
        }
        header > .left > .username{
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            margin-left: 10px;
        }
        header > .right > span, footer > .right >a > span {
            padding-right: 10px;
            color: #6B7280;
        }
        /*超出的内容隐藏*/
        section span{
            height: 125px;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
            color: #6B7280;

        }
        footer img{
            width: 20px;
            height: 20px;
        }
        footer {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            color: #6B7280;
        }
        footer > .left,footer > .right{
            display: flex;
        }
        footer > .right > a{
            text-decoration: none;
            color: #6B7280;
        }
    }

    /*横屏*/
    @media only screen and (orientation: landscape) and (min-width: 500px) and (max-height: 600px) {
        .result-container{
            background-color: rgb(248,248,248);
            width: 100%;
            height: 200px;
            box-sizing: border-box;
            margin-top: 40px;
        }
        header{
            display: flex;
            justify-content: space-between;
            line-height: 32px;
        }
        header > .left > img{
            width: 25px;
            height: 25px;
        }
        header > .left{
            display: flex;
            align-items: center;
        }
        header > .left > .username{
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            margin-left: 10px;
        }
        header > .right > span, footer > .right >a > span {
            padding-right: 10px;
            color: #6B7280;
        }
        /*超出的内容隐藏*/
        section span{
            height: 125px;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
            color: #6B7280;

        }
        footer img{
            width: 20px;
            height: 20px;
        }
        footer {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            color: #6B7280;
        }
        footer > .left,footer > .right{
            display: flex;
        }
        footer > .right > a{
            text-decoration: none;
            color: #6B7280;
        }
    }


    @media (min-width: 500px) and (min-height: 600px){
        .result-container{
            background-color: rgb(248,248,248);
            width: 48.5%;
            height: 200px;
            box-sizing: border-box;
            margin-top: 50px;
            margin-left: 15%;
        }
        header{
            display: flex;
            justify-content: space-between;
            line-height: 32px;
        }
        header > .left > img{
            width: 25px;
            height: 25px;
        }
        header > .left{
            display: flex;
            align-items: center;
        }
        header > .left > .username{
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            margin-left: 10px;
        }
        header > .right > span, footer > .right >a > span {
            padding-right: 10px;
            color: #6B7280;
        }
        /*超出的内容隐藏*/
        section span{
            height: 125px;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
            color: #6B7280;

        }
        footer img{
            width: 20px;
            height: 20px;
        }
        footer {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            color: #6B7280;
        }
        footer > .left,footer > .right{
            display: flex;
        }
        footer > .right > a{
            text-decoration: none;
            color: #6B7280;
        }
    }



</style>