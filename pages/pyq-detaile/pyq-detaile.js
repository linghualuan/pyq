var that;
Page({

  data: {
    trendId:'',
    detailList:[]
  },

  onLoad: function (options) {
    that=this;
    that.setData({
      trendId:options.trendId
    })
    console.log(that.data.trendId);
    that.getDetailList();
  },

  onReady: function () {

  },

  onShow: function () {

  },
  getDetailList() {
    wx.request({
      url: 'http://localhost:8080/trend/getTrendList',
      method:'POST',
      // header: {
      //   'context-type': 'application/json',
      //   'authorization': wx.getStorageSync('token')
      // },
      data:{
        trendId:that.data.trendId
      },
      success(res) {
        console.log(res)
        that.setData({
          detailList:res.data.data
        })
      }
    })
  },
})