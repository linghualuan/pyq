var that;
Page({
  data: {
    textContent:''
  },
  onLoad: function (options) {
    that=this;
  },
  onShow: function () {

  },
  bindblur(e){
    that.setData({
      textContent:e.detail.value
    })
  },
  handleSubmit(){
    wx.request({
      url: 'http://localhost:8080/trend/getTrendList',
      method:'POST',
      // header: {
      //   'context-type': 'application/json',
      //   'authorization': wx.getStorageSync('token')
      // },
      data:{

      },
      success(res) {
        console.log(res)
      }
    })
  }
})