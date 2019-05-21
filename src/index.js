Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    description: {
      type: String,
      value: ''
    },
    isShowDescription: {
      type: Boolean,
      value: false
    },
    bgColor: {
      type: String,
      value: '#FFFFFF'
    },
    textTitleColor: {
      type: String,
      value: '#000000'
    },
    textDescriptionColor: {
      type: String,
      value: '#777777'
    },
    delta: {
      type: Number,
      value: 1
    },
    isShowBtnBack: {
      type: Boolean,
      value: false
    },
    customBtnBack: {
      type: Boolean,
      value: false
    },
    customBtnBackTxt: {
      type: String,
      value: '' /* 返回 */
    },
    customBtnBackIcon: {
      type: String,
      value: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAllBMVEX///8AAAAPDw/ExMTi4uLm5ubh4eHq6uri4uLn5+ezs7P4+Pj8/Pzs7OwJCQkVFRXT09Pq6uro6Oji4uLh4eHg4ODk5OTh4eHh4eHu7u7t7e3x8fHz8/P29vbi4uLi4uLh4eHm5ubm5ubx8fHh4eHi4uLi4uLh4eHi4uLi4uLh4eHi4uLp6ekkJCQaGhoxMTGfn58AAAAvugVLAAAAMXRSTlOMAPKc69Tyyl/OoZ+WDfbul8gWk/764d/Wvryyq6SdjTseCo/0w8KysVdWThfk69uoUZURFQAAAglJREFUWMOtl+uWmjAUhfdoEkKRzhBURBQRvF9myvu/XDO2XbFyJsSm+zfft1gLkrMPXsioY5lNGA+DJAlCziZZebzQT1KCWG4FzyPcJcq52MrYSaBWghcgUnCxuvQK4nSTjPBFRolIY7tAssDglCJg0iKoD9MlerKcHuqvBOtZCIeEszUtqNgcTpmzihKcxws4ZiFkVyDHEZwTjc+PgkoY3slQ/S1YswWeyoKt7wX1bI4nM5/Vd4K99fs1b+TXPBiBnNr4b4P2mqKbqfwjiNnSxn9v2/ZK/ZMs/i1Igx5ep0E3QfpLoDajXv5KnixxuQlWQS//+gYqyepTEIuRC0+/QqwFkrvwdLjUgl3xzzyK7QuUcOPpiAtO3IMHP6LMPXjkJbLIg0eUYeLDQ+PMi9c49+I1HnrxGu8ehGbgzms8wWOG7S0/4JKEEDSvN8Fg6CYgzvJw4G4IEMLLEILDy8DB4GVgmMDHoPEs8jFE2edx9jDkJU4cHgZ+hBLwMAhFXaruhmJLXuvuBi7JwUIb6MFiRpvd8G4ZbWa42gwN9QIbRYx32vABcrybgmE1vLcfDV0wiIpDxuBUxaFLFh26ZPnXPP+iqVONn6u6onos2+fnyrbs1n0p3Ov++Oy7cPzflcek3rssXfvaf+2zL55G0cU3aey3+irH5XtHLd+7/uXbRJ0e1/+Top/8CSACQoCSTXv9AAAAAElFTkSuQmCC' /* https://qzonestyle.gtimg.cn/aoi/sola/20190219165741_d4SlWu1331.png */
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached() {
      const self = this
      wx.getSystemInfo({
        success(res) {
          self.initNavigation(res)
          console.log('[getSystemInfo success]', res)
        },
        fail(res) {
          self.initNavigation()
          console.log('[getSystemInfo fail]', res)
        }
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initNavigation(res) {
      const platform = res.platform
      const statusBarHeight = res.statusBarHeight
      const navigationBarHeight = (platform === 'android') ? 48 : 44

      // 判断是否需要显示描述？
      let isShowDescription = false || this.data.isShowDescription
      const desLen = this.data.description.length

      if (desLen > 0) {
        isShowDescription = true
      } else {
        isShowDescription = false
      }

      // 判断是否需要显示返回按钮？首页不显示
      let isShowBtnBack = this.data.isShowBtnBack
      const pages = getCurrentPages()
      if (pages.length > 1) {
        isShowBtnBack = true
      } else {
        isShowBtnBack = false
      }

      // 处理按钮图片
      let customBtnBackIcon = this.data.customBtnBackIcon
      customBtnBackIcon = customBtnBackIcon.replace(/\s/g, '')
      console.log('[ customBtnBackIcon url ] ', customBtnBackIcon)

      // 处理标题截断添加 ...
      const strTitle = this.data.title
      let newStrTitle = ''
      const len = this.strlen(this.data.title)

      // 16个字符 or 8个中文字
      if (len >= 16) {
        newStrTitle = strTitle.slice(0, 8) + '...'
      } else {
        newStrTitle = strTitle
      }

      // 处理背景色
      let bgColor = this.data.bgColor
      bgColor = bgColor ? bgColor.replace(/\s/g, '') : ''

      let textTitleColor = this.data.textTitleColor
      textTitleColor = textTitleColor ? textTitleColor.replace(/\s/g, '') : ''

      let textDescriptionColor = this.data.textDescriptionColor
      textDescriptionColor = textDescriptionColor ? textDescriptionColor.replace(/\s/g, '') : ''

      this.setData({
        platform: res.platform,
        statusBarHeight,
        navigationBarHeight,
        isShowDescription,
        isShowBtnBack,
        title: newStrTitle,
        bgColor,
        textTitleColor,
        textDescriptionColor,
        customBtnBackIcon
      })

      const navigationHeight = statusBarHeight + navigationBarHeight
      this.triggerEvent('getNavigationHeight', {height: navigationHeight})
    },

    onClickBtnBack() {
      if (this.data.customBtnBack) {
        this.triggerEvent('customBtnBack')
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    },

    strlen(str) {
      let len = 0
      for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i)
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          len++
        } else {
          len += 2
        }
      }
      return len
    },
  }
})
