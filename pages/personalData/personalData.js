var that;
Page({

  data: {
    userBasicInfo:[]
  },

  onLoad: function (options) {
    that=this;
    // that.getUserInfo();
  },

  onReady: function () {

  },

  onShow: function () {

  },
  getUserInfo(){
    wx.request({
      url: '',
      method:'POST',
      header: {
        'context-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        that.setData({
          userBasicInfo:res.data,
        })
      }
    })
  }
})