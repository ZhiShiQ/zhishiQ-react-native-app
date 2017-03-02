
# React Native App (zhishiQ)

zhishiQ 移动App，基于 React Native

## 使用

```bash
# 不能使用 cnpm，下载慢问题，请使用使用 npm register 代理 
# npm install --registry=https://registry.npm.taobao.org
npm install 
react-native run-ios
# android 之前需要打开 `android avd` 开启 android 虚拟机
react-native run-android 
# 开启开发服务器（hot reload，remote debugger ...）
# 无需单独开启，run-ios/android 默认开启
npm start
```

## 一些说明

- 脚本
    ```bash
    npm run component componentName
    npm run page pageName
    # eg.
    #   npm run component button # => Button 将在 app/components 创建
    #   npm run page main # => MainPage 将在 app/pages 创建
    ```
    
- 命名方式(文件命名)（以 hello world 为例）
    1. 路由 Key:  helloWorld（GOOD）
    2. Component:  HelloWorld（GOOD）
    3. Page:  HelloWorldPage（GOOD）
    4. action: hello_word
    5. reducer: hello_word


- 第三方库安装

    安装 rnpm
    ```bash
    npm install -g rnpm
    ```
    ```bash
    npm install xxx --save
    # 需要 link 原生代码的三方
    rnpm link xxx 
    # 如不能正确加载，请尝试重启 开发服务器或者（并且）重启虚拟机
    ```

## **一些原则**

- 尽量使用 ios 与 Android 兼容的（包括第三方）控件
- 如使用兼容不佳插件，需要注释说明，加上 `/* TODO: 兼容性 {explanation} */`，方便以后修改 
- 尽量拆分页面元素，形成一套完善的高复用可伸缩组件
- 静态数据无需在 reducer 中定义，直接定义在 page 中
- 动态数据需在 reducer 中定义

## 文件结构

```text
WorkApp/
├── __tests__/
├── android/
├── ios/
├── app/                # javascript 目录
│   ├── actions/        # actions，状态数据操作在这定义
│   ├── AppContainer.js # 路由控制+redux 连接容器
│   ├── components/     # 一系列自定义组件
│   ├── constant.js     # 常量定义，标识 action，连接 action 与 reducer
│   ├── helpers/        # 一些常用的通用方法
│   ├── index.js        # app 入口
│   ├── pages/          # 一般一个路由对应一个 page
│   └── reducers/       # 配合actions，状态操作在这书写
├── app.json
├── Example/            #  react-native-router-flux example
├── index.android.js    #  android 入口
├── index.ios.js        #  ios 入口
├── package.json
├── Readme.md
└── scripts/            #  一些脚本
```

## 三方依赖

- redux:  可维护状态管理
- react-native-router-flux:  路由控制
- immutable:  配合 redux，书写高性能 reducer
- react-native-vector-icons:  字体图标库
- react-native-modal-dropdown:  头部 dropdown (TitleDropdown)
- react-native-modalbox:  自定义 Modal (通用组件Modal)
- react-native-swipeable:  滑动块删除 (Swipeout)
- redux-multi:  同时调度多 action
- redux-thunk:  支持 dispatch function，异步调用
- autobind-decorator:  es6 自动 bind(this) 修饰器
- ...
