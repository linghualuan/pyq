var that;
Page({
  data: {
    topicName:'',
    detailTopic:[]
  },
  onLoad: function (options) {
    that=this;
    that.setData({
      topicName:options.topic
    })
    that.getDetailTopic();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  // 获取话题详情
  getDetailTopic(){
    wx.request({
      url: 'http://localhost:8080/trend/getTrendList',
      method:'POST',
      // header: {
      //   'context-type': 'application/json',
      //   'authorization': wx.getStorageSync('token')
      // },
      data:{
        trendLabel:that.data.topicName
      },
      success(res) {
        console.log(res)
        that.setData({
          detailTopic:res.data.data,
        })
      }
    })
  }
})