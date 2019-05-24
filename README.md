# nb-navigation

小程序自定义导航栏组件


## 如何使用

1. 安装 **nb-navigation**

```
npm install --save nb-navigation
```

2. 需要在 **app.json** 中设置，声明支持自定义导航栏

```
{
  "window": {
    "navigationStyle": "custom"
  }
}
```

3. 在需要使用 **nb-navigation** 的页面，找到当前页面 ***.json** 文件中添加 **nb-navigation** 自定义组件配置

```
{
  "usingComponents": {
    "nb-navigation": "nb-navigation"
  }
}
```

4. 在 ***.wxml** 文件里，使用 **nb-navigation**

```
<nb-navigation title="自定义标题"></nb-navigation>
```


