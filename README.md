# ASF-Tools2.0

## 介绍
ASOULFAN小工具前端仓库

## 环境需求

全局安装 `pnpm`

```
npm i -g pnpm
```

## 开发

1. 安装所有 node_modules

```
pnpm i
```

3. 将 `.env.example` 文件重命名为`.env.local`, 并按需修改其中配置

4. 启动开发服务器

```
pnpm dev
```

5. lint（with fix）

```
pnpm lint
```


`VS Code` 用户请使用 `Vue Language Features (Volar)`插件, 并禁用所有其他 `vue` 相关插件如 `vetur`等.


## 部署

1. 将 `.env.example` 文件重命名为`.env`, 并按需修改其中配置（如果在容器中打包，也可以直接将文件中列出的选项配置成环境变量，作用相同）

2. 打包

```
pnpm build
```

3. 可以预览当前打包的版本

```
pnpm preview
```

## Commit提交规范

### Header Header 部分只有 1 行，格式为 < type > : < subject >。

#### type 用于说明提交的类型： 

1. feat：增加**新页面**
2. style：只修改了**样式**，即不影响业务逻辑功能等
3. update :  更新修改代码逻辑，例如优化性能、 需求变更、修复bug等
4. doc :  更新文档相关

#### subject 用于说明提交内容：

1. 简要概括即可
2. 使用中文

#### subject 示例

update: XX页面更新某功能 （具体文字描述无硬性要求，简要概括即可）
