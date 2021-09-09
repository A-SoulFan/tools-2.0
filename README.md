# ASF-Tools2.0


### 编写代码前，请阅读以下内容


#### 介绍
A-soul Fans 工具页2.0前端代码
#### 项目安装

```
npm install
```

#### 启动
```
npm run serve  热启动 -默认浏览器打开
```

#### 项目打包
```
npm run build
```
#### VScode插件
##### 必备
1. Vuter                    vue代码补全
2. EsLint                   代码规范
3. Prettier                 代码格式化
4. 代码保存时检测
```
  vscode中，在文件->首选项->设置-> settings.json加入下面设置，能在保存时eslint
  "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "eslint.autoFixOnSave": true,
    }
```
##### 其他
1. Path intellisense        文件路径智能识别
2. Git  History             git可视化

####


#### 开发规范

##### 命名规范
```
1.文件名使用大驼峰式命名 即类如  RandomVideo.vue
2.变量命名使用小驼峰命名 即类如	firstVideo
3.class类名使用"-"连接 类如  video-box-footer
```
##### 注意事项
```
1.  禁止使用行内样式
2.  禁止使用如同 <br/>等html元素对页面解决视觉设计问题
3.  禁止使用eval()

4.  禁止使用嵌套的三元表达式，对于较复杂的判断，请使用if else语句
5.  禁止使用ID选择器编写CSS，书写样式时，请使用class选择器
6. 	禁止class类名与HTML同名，如class="body"

7.  尽量避免使用Var对变量进行命名，请使用const与let
8.  请使用 === 严格等于，避免使用 ==
9.  在使用&& || 时，请使用（）对符号两端的条件进行包裹

10. 待补充...
```


#### Commit提交规范

##### Header Header 部分只有 1 行，格式为 < type > : < subject >。

###### type 用于说明提交的类型： 

1. feat：增加**新**功能
2. style：只修改了**样式**，即不影响业务逻辑功能等
3. update :  更新修改原有代码逻辑，例如优化性能、 需求变更、修复bug等
4. doc :  更新文档相关

###### subject 用于说明提交内容：

1. 简要概括即可
2. 使用中文

###### subject 示例

feat: XX页面新增某功能 （具体文字描述无硬性要求，简要概括即可）

#### 文件夹结构

```
│  .browserslistrc		
│  .eslintrc.js
│  .gitignore
│  .npmrc
│  package.json
│  README.md		
│  tsconfig.json	
│  
├─public		
│      A-Cao.ico
│      index.html
│      
└─src
    │  App.vue			
    │  main.ts
    │  shims-vue.d.ts	
    │  
    ├─assets			静态文件
    ├─components		公用组件
    ├─hooks				公用函数
    ├─views				页面
    └─router			路由
            index.ts

```

