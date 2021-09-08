<template>
    <div class="container">
        <div class="cover"></div>
        <div class="icons">
            <img class="asf-icon" src="../assets/icons/ASF_black.png">
            <!--pc端-->
            <ul class="pc-navigation">
                <li><a href="#">用户讨论</a></li>
                <li><a href="#">内容整理</a></li>
                <li><a href="#">实用工具</a></li>
                <li><a href="#">新人指南</a></li>
            </ul>
            <!--pc端-->
            <a href="#"><img class="more-options" src="../assets/icons/moreOptions.png"></a>

            <!--pc端-->
            <div class="pc-icon-right">
                <a href="#"><img src="../assets/icons/search.png"></a>
                <a href="#"><img src="../assets/icons/user.png"></a>
            </div>
            <!--pc端-->
        </div>
        <!--<h2>枝网查重</h2>-->
        <span>枝网查重</span>
        <div class="introduction">
            <span>帮你快速识别原创小作文</span>
            <div class="more-details">
                <span>{{foldBtnContent}}</span>
                <a href="#" @click="onUnfoldBtnClick()"><img :class="[foldBtnState?'is-rotated':'recover-rotated']"
                                                             src="../assets/icons/arrowDown.png"></a>
            </div>
        </div>
        <!--详情内容-->
        <div class="details" v-show="foldBtnState">
            <div class="content-range">
                <span>比对库内容范围:</span>
                <span>B站动态,视频评论区（仅限A-Soul的六个官方账号）</span>
            </div>
            <div class="time-range">
                <span>比对库时间范围:</span>
                <span>2020/11/23 21:18:26 至 2021/08/27 11:58:39</span>
            </div>
            <div class="reference">
                <span>参考文献:</span>
                <span>[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学</span>
            </div>
        </div>


        <!--输入框以及查重条-->
        <div class="input-box">
            <div class="input-zone">
                <textarea placeholder="在这里输入小作文哦~" @input="hasContent" :maxlength="maxLength"></textarea>
                <span class="total-word-num">总字数:{{contentLength}}/{{maxLength}}</span>
                <!--pc-详情内容-->
                <div class="pc-details">
                    <p>功能介绍</p>
                    <div class="content-range">
                        <span>比对库内容范围:</span>
                        <span>B站动态,视频评论区（仅限A-Soul的六个官方账号）</span>
                    </div>
                    <div class="time-range">
                        <span>比对库时间范围:</span>
                        <span>2020/11/23 21:18:26 至 2021/08/27 11:58:39</span>
                    </div>
                    <div class="reference">
                        <span>参考文献:</span>
                        <span>[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学</span>
                    </div>
                    <div class="foot-nav">
                        <div class="left">
                            <img src="../assets/icons/github-outline.png">
                            <a href="#"><span>查重接口开源仓库</span></a>
                        </div>
                        <div class="right">
                            <img src="../assets/icons/bilibili-fill.png">
                            <a href="#"><span>查重接口反馈</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copy-percentage">
                <img src="../assets/icons/box.png">
                <div class="progress-bar-box">
                    <div class="txt-part">
                        <span>总复制比</span>
                        <span>{{totalDuplicateCheckingRate}}%</span>
                    </div>
                    <!--查重占比条-->
                    <div class="progress-bar">
                        <span class="bottom-bar">
                            <span class="top-bar" :style="lineProgress()"></span>
                        </span>
                    </div>
                </div>
            </div>
            <a href="#"><span :class="['btn-search',{active:isActive}]" @click="search(),onInputBtnContent()">{{btnContent}}</span></a>
            <a href="#"><span :class="['pc-btn-search',{'pc-active':isActive}]" @click="search(),onInputBtnContent()">{{btnContent}}</span></a>
        </div>

        <!--查重结果-->
        <DuplicateCheckingResult v-for="user in userList" :user="user" v-if="isSearched"></DuplicateCheckingResult>
        <!--<DuplicateCheckingResult></DuplicateCheckingResult>-->
    </div>
</template>

<script>
    import DuplicateCheckingResult from "../components/DuplicateCheckingResult";

    export default {
        name: "DuplicateChecking",
        components: {DuplicateCheckingResult},
        data() {
            return {
                maxLength: 1000,
                foldBtnContent: '详情',
                btnContent: '查询结果',
                foldBtnState: false,//展开按钮的状态
                // btnContentCopy:'复制报告',
                isActive: false,//按钮是否是激活态
                contentLength: 0,//textarea中的字数
                isSearched: false,//是否有进行过查询
                totalDuplicateCheckingRate: 0,//总复制比
                userList: [
                    {
                        username: '沃克贰叁',
                        duplicateCheckingRate: 70,
                        issuingDate: '2021年2月31日',
                        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                    },
                    {
                        username: '秦心',
                        duplicateCheckingRate: 60,
                        issuingDate: '2021年3月31日',
                        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容\n' +
                            '                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                    }
                ]
            }
        },
        methods: {
            hasContent(e) {
                this.isActive = e.target.value !== '' //如果不为空，isActive就是true
                this.contentLength = e.target.value.length

                //text内容不为空并且已经进行过搜索，那么只要输入东西就算改变内容
                if (e.target.value !== '' && this.isSearched === true) {
                    this.btnContent = '查询结果';
                }
            },
            search() {
                if (this.contentLength != 0) {
                    this.isSearched = true;//只要点击搜索并且内容不为空
                    this.totalDuplicateCheckingRate = this.maxDuplicate();//设定重复率，值为data数组中重复率最大的一个
                }
            },
            lineProgress() {
                return `width:${this.totalDuplicateCheckingRate}%`
            },
            maxDuplicate() {
                let max = 0;
                this.userList.map(value => {
                    if (max < value.duplicateCheckingRate) {
                        max = value.duplicateCheckingRate
                    }
                })
                return max;
            },
            onInputBtnContent(e) {
                if (this.isSearched === true) {
                    //如果进行过搜索
                    this.btnContent = '复制报告'
                }
            },
            onUnfoldBtnClick() {
                this.foldBtnState = !this.foldBtnState;//状态翻转
                if (this.foldBtnState === true) {
                    this.foldBtnContent = '收起' //设置内容变为收起
                } else {
                    this.foldBtnContent = '详情' //设置内容变为收起
                }

            }

        },

    }
</script>

<style scoped>
    @font-face {
        font-family: OPPOSans;
        src: url("../assets/Font-OPPOSans/OPPOSans-M.ttf");
    }
    /*手机端*/
    /*竖屏*/
    @media only screen and (orientation: portrait) and (max-width: 500px) {
        .container {
            /*padding: 0 10px;*/
            width: 100%;
            font-family: 'OPPOSans';
        }

        .container  > span {
            font-size: 30px;
            font-weight: 400;
            padding: 0;
            /*font-family: 'OPPOSans';*/
        }

        .icons {
            height: 50px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding-right: 10px;
        }

        .icons img {
            display: inline-block;

        }

        .icons > .asf-icon {
            width: 50px;
            height: 50px;
        }

        .icons > a > .more-options, .icons > a {
            width: 25px;
            height: 25px;
        }

        .introduction {
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .introduction > span {
            font-weight: 400;
            font-style: normal;
        }

        .introduction .more-details {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        /*翻转展开图标*/
        .is-rotated {
            transform: rotate(180deg);
            transition: linear .2s;
        }

        .recover-rotated {
            transform: rotate(0);
            transition: linear .2s;
        }

        .introduction .more-details > span {
            color: #8a8a8a;
            padding-right: 5px;
            /*font-weight: normal;*/
        }

        .introduction .more-details > a > img {
            width: 25px;
            height: 25px;
        }


        .input-box {
            margin-top: 0;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            width: 100%;
            position: relative;
        }

        .input-box > .input-zone {
            width: 100%;
        }

        .input-box textarea {
            outline: none;
            border: 1px solid rgb(229, 229, 229);
            height: 250px;
            width: 100%;
            text-indent: 1em;
            font-size: 14px;
            /*禁用改变textarea大小*/
            resize: none;
            font-family: 'OPPOSans';
        }

        .input-box textarea::placeholder {
            color: #D1D5DB;
            font-family: 'OPPOSans';
        }

        .input-box > a {
            /*75*/
            padding-left: calc(100% - 282px);
        }

        .input-box .btn-search {
            display: inline-block;
            border: 1px solid rgb(229, 229, 229);
            height: 36px;
            width: 100px;
            text-align: center;
            line-height: 36px;
            background-color: rgb(156, 163, 175);
            color: white;

        }

        .input-box .active {
            display: inline-block;
            border: 1px solid rgb(229, 229, 229);
            height: 36px;
            width: 100px;
            text-align: center;
            line-height: 36px;
            background-color: rgb(75, 85, 99);
            color: white;
        }

        /*显示输入的字数*/
        .input-zone {
            position: relative;
        }

        .input-zone .total-word-num {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #8a8a8a;
            font-size: 12px;
        }

        /*查重条*/
        .copy-percentage {
            display: flex;
        }

        .txt-part {
            text-align: center;
            display: flex;
            justify-content: space-between;
            width: 150px;
            height: 20px;
            line-height: 20px;
        }

        .copy-percentage > img {
            width: 25px;
            height: 25px;
            padding-right: 5px;
        }

        .progress-bar-box {
            height: 50px;
        }

        .progress-bar {
            height: 5px;
            width: 150px;
        }

        .progress-bar > .bottom-bar {
            display: inline-block;
            height: 5px;
            width: 150px;
            background-color: rgb(229, 229, 229);
            position: relative;
        }

        .progress-bar > .bottom-bar > .top-bar {
            display: inline-block;
            height: 5px;
            /*width: 70%;*/
            background-color: rgb(75, 85, 99);
            position: absolute;
            left: 0;
        }

        /*详情的展开内容*/
        .container .details {
            background-color: #F8F8F8;
            padding: 10px;
        }

        .container .details > div {
            margin: 20px 0;
        }

        .container .details span {
            display: -webkit-box;
            max-height: 42px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
        }
        /*pc端隐藏元素*/
        .container .pc-navigation{
            display: none;
        }
        .pc-icon-right{
            display: none;
        }
        .pc-details{
            display: none;
        }
        .pc-btn-search{
            display: none;
        }
    }

    /*横屏*/
    @media only screen and (orientation: landscape) and (min-width: 500px) and (max-height: 600px) {
        .container {
            /*padding: 0 10px;*/
            width: 100%;
            font-family: 'OPPOSans';
        }

        .container  > span {
            font-size: 30px;
            font-weight: 400;
            padding: 0;
            /*font-family: 'OPPOSans';*/
        }

        .icons {
            height: 50px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding-right: 10px;
        }

        .icons img {
            display: inline-block;

        }

        .icons > .asf-icon {
            width: 50px;
            height: 50px;
        }

        .icons > a > .more-options, .icons > a {
            width: 25px;
            height: 25px;
        }

        .introduction {
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .introduction > span {
            font-weight: 400;
            font-style: normal;
        }

        .introduction .more-details {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        /*翻转展开图标*/
        .is-rotated {
            transform: rotate(180deg);
            transition: linear .2s;
        }

        .recover-rotated {
            transform: rotate(0);
            transition: linear .2s;
        }

        .introduction .more-details > span {
            color: #8a8a8a;
            padding-right: 5px;
            /*font-weight: normal;*/
        }

        .introduction .more-details > a > img {
            width: 25px;
            height: 25px;
        }


        .input-box {
            margin-top: 0;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            width: 100%;
            position: relative;
        }

        .input-box > .input-zone {
            width: 100%;
        }

        .input-box textarea {
            outline: none;
            border: 1px solid rgb(229, 229, 229);
            height: 250px;
            width: 100%;
            text-indent: 1em;
            font-size: 14px;
            /*禁用改变textarea大小*/
            resize: none;
            font-family: 'OPPOSans';
        }

        .input-box textarea::placeholder {
            color: #D1D5DB;
            font-family: 'OPPOSans';
        }

        .input-box > a {
            /*75*/
            padding-left: calc(100% - 282px);
        }

        .input-box .btn-search {
            display: inline-block;
            border: 1px solid rgb(229, 229, 229);
            height: 36px;
            width: 100px;
            text-align: center;
            line-height: 36px;
            background-color: rgb(156, 163, 175);
            color: white;

        }

        .input-box .active {
            display: inline-block;
            border: 1px solid rgb(229, 229, 229);
            height: 36px;
            width: 100px;
            text-align: center;
            line-height: 36px;
            background-color: rgb(75, 85, 99);
            color: white;
        }

        /*显示输入的字数*/
        .input-zone {
            position: relative;
        }

        .input-zone .total-word-num {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #8a8a8a;
            font-size: 12px;
        }

        /*查重条*/
        .copy-percentage {
            display: flex;
        }

        .txt-part {
            text-align: center;
            display: flex;
            justify-content: space-between;
            width: 150px;
            height: 20px;
            line-height: 20px;
        }

        .copy-percentage > img {
            width: 25px;
            height: 25px;
            padding-right: 5px;
        }

        .progress-bar-box {
            height: 50px;
        }

        .progress-bar {
            height: 5px;
            width: 150px;
        }

        .progress-bar > .bottom-bar {
            display: inline-block;
            height: 5px;
            width: 150px;
            background-color: rgb(229, 229, 229);
            position: relative;
        }

        .progress-bar > .bottom-bar > .top-bar {
            display: inline-block;
            height: 5px;
            /*width: 70%;*/
            background-color: rgb(75, 85, 99);
            position: absolute;
            left: 0;
        }

        /*详情的展开内容*/
        .container .details {
            background-color: #F8F8F8;
            padding: 10px;
        }

        .container .details > div {
            margin: 20px 0;
        }

        .container .details span {
            display: -webkit-box;
            max-height: 42px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
        }
        /*pc端隐藏元素*/
        .container .pc-navigation{
            display: none;
        }
        .pc-icon-right{
            display: none;
        }
        .pc-details{
            display: none;
        }
        .pc-btn-search{
            display: none;
        }
    }

    /*pc端*/
    @media (min-width: 500px) and (min-height: 600px){
        .container{
            width: 1600px;
            /*margin: 0 auto;*/
            font-family: 'OPPOSans';
        }
        .container .cover{
            width: 100%;
            background-color: rgb(248,248,248);
            height: 100px;
            position: absolute;

        }
        .container > .icons{
            background-color: rgb(248,248,248);
            height: 100px;
            width: 1300px;
            margin: 0 auto;
            /*display: flex;*/
            /*justify-content: space-between;*/
            position: relative;
        }
        .pc-navigation{
            width: 50%;
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            position: absolute;
            left: 35%;
        }
        .pc-navigation li{
            text-align: center;
            /*margin-right: 35px;*/
        }
        .pc-navigation li > a{
            text-decoration: none;
            color: #9CA3AF;
            font-size: 16px;
            font-weight: 400;
            line-height: 100px;
            justify-content: center;
            padding: 30px;
        }
        .pc-navigation li:hover{
            background-color: rgb(229,229,229);
        }
        .container > .icons > a > img{
            /*隐藏more-details图标*/
            display: none;
        }
        .container > .icons > .asf-icon{
            width: 126px;
            height: 100px;
            position: absolute;
            left: 5%;
        }
        .container > .icons > .pc-icon-right{
            position: absolute;
            right: 0;
            top: calc(50% - 15px);
        }
        .container > .icons > .pc-icon-right > a > img{
            height: 30px;
            width: 30px;
            padding-left: 50px;
        }
        .container  > span{
            font-size: 48px;
            padding-left: 15%;
            display: block;
            padding-top: 60px;
        }
        .introduction .more-details{
            display: none;
        }
        .introduction > span{
            padding-left: 15%;
            padding-top: 9px;
            display: block;
        }
        .input-box{
            position: relative;
        }
        .input-box > .input-zone{
            margin-top: 25px;
            width: 1300px;
            padding-left: 15%;
            position: relative;
        }
        .input-box > .input-zone > textarea{
            width: 750px;
            height: 330px;
            border: 2px solid #D1D5DB;
            resize: none;
            outline: none;
            padding: 10px;
            font-family: 'OPPOSans';
            font-size: 18px;
        }
        .input-box > .input-zone > textarea::placeholder{
            color: #D1D5DB;
            font-family: 'OPPOSans';

        }
        .input-box > .input-zone > span{
            position: absolute;
            left: 16%;
            bottom: 10px;
            color: #D1D5DB;
        }
        /*隐藏*/
        .copy-percentage{
            display: none;
        }
        /*隐藏*/
        .btn-search{
            display: none;
        }
        .pc-btn-search{
            display: inline-block;
            border: 1px solid rgb(229, 229, 229);
            height: 36px;
            width: 100px;
            text-align: center;
            line-height: 36px;
            background-color: rgb(156, 163, 175);
            color: white;
            position: absolute;
            left: calc(63.5% - 102px);
        }
        /*隐藏手机端details*/
        .details{
            display: none;
        }
        .pc-details{
            display: inline-block;
            height: 100%;
            width: 450px;
            background-color: #F8F8F8;
            padding: 10px;
            float: right;
            margin-right: 50px;
            box-sizing: border-box;
            margin-bottom: 20px;
        }


        .pc-details > div {
            margin: 20px 0;
        }

        .pc-details span {
            display: -webkit-box;
            max-height: 42px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
            /*width: 300px;*/
        }

        .pc-details p{
            font-weight: 400;
            font-size: 24px;
        }
        .pc-details > .foot-nav img{
            width: 30px;
            height: 30px;
        }
        .pc-details > .foot-nav{
            display: flex;
            justify-content: space-between;
            font-size: 20px;
        }
        .pc-details > .foot-nav a{
            text-decoration: none;
            color: #374151;
        }
        .pc-details > .foot-nav > .left{
            display: flex;

        }
        .pc-details > .foot-nav > .left > img{
            margin-right: 10px;
        }
        .pc-details > .foot-nav > .right{
            display: flex;
        }
        .pc-details > .foot-nav > .right > img{
            margin-right: 10px;
        }
        .input-box .pc-active {
            display: inline-block;
            border: 1px solid rgb(229, 229, 229);
            height: 36px;
            width: 100px;
            text-align: center;
            line-height: 36px;
            background-color: rgb(75, 85, 99);
            color: white;
        }
    }

</style>