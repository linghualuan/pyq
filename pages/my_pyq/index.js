var that;
Page({
  data: {
    circleList: [], // 朋友圈内容列表
    images:[]
  },

  onLoad: function (options) {
    that = this;
    that.getList()
  },
  onShow: function () {

  },
  // 获取朋友圈内容信息
  getList() {
    wx.request({
      url: 'http://localhost:8080/trend/getTrendList',
      method:'POST',
      header: {
        'context-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      data:{

      },
      success(res) {
        console.log(res)
        that.setData({
          circleList:res.data.data,
        })
      }
    })
  },
  // 长按选择是否删除动态
  bindlongpress(){
    console.log('出发长按事件');
  },
  // 点击查看图片
  previewImage(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      // 当前显示图片的http链接
      // current: that.data.images[index],
      current: that.data.circleList[0].imgUrl[index],
      // urls: that.data.images, // 需要预览的图片http链接列表
      urls:that.data.circleList[0].imgUrl
    })
  },
  // 点赞
  clickLove(e){
    console.log(e);
    //获取该条朋友圈的唯一 trendId
    const trendId = e.currentTarget.dataset.index
    wx.request({
      url: 'http://localhost:8080/trendSupport/addSupport',
      method:'POST',
      header: {
        'context-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      data:{
        trendId
      },
      success(res) {
        console.log(res)
      }
    })
  },
})