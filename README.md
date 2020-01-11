# jiuxian-awbb
团队协作开发

所遇问题：

王晓勇

1.fixed对比sticky做吸顶效果

2.cover-image与image组件的区别   



> lac

```
在配置腾讯地图，腾讯位置服务小程序插件key配置webserviceAPI只支持勾选域名白名单选项

servicewechat.com
```

- 别忘了在app.json配置

```
"permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于定位效果展示"
    }
  }
```

