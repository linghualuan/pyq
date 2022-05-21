var that;
Page({

  data: {
    userBasicInfo:[],

  },

  onLoad: function (options) {
    that=this;
  },
  onShow: function () {

  },
  // 获取微信用户基本信息
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
  },
  myTrend(){
    
  }
})