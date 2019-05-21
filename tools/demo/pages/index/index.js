Page({
  data: {
    navigationHeight: 64
  },
  getNavigationHeight(e) {
    console.log('[getNavigationHeight e]', e);
    const navigationHeight = e.detail.height || this.data.navigationHeight;
    this.setData({
      navigationHeight
    });
  }
})
