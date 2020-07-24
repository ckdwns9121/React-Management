## 고객관리 시스템

#### Development environment

 - React
 - Material UI
 - mysql
 - Node

#### Features

- Signin,Signup Logout
- Add,Delete Update

#### 노드 환경설정
 
  - nodemon 설치
  ```
  $npm install -g nodemon
  ```

  - http-proxy-middleware 설치
  ```
  $yarn add http-proxy-middleware
  ```

  - proxy 설정 - setupProxy.js 생성

  ```react
    const proxy = require("http-proxy-middleware");

        module.exports = function(app){
          app.use(proxy("/api", {target :"http://localhost:5000"}));
    };
  ```

  - 로컬에서 개발환경 셋팅
  ```
  $yarn add concurrently
  ```

  - 루트폴더에 package.json 파일 수정
  ```
      "scripts": {
        "client": "cd client && yarn start",
        "server": "nodemon ./server/server.js",
        "dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
    },
  ``` 

  - react 서버와 node 서버 같이 실행하기
  ```
  $yarn dev
  ```


