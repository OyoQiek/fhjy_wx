// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    i:0,
    stat:1
  },
  loadMore(){
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name:"movielist",
      data:{
        start:this.data.i,
        count:5
      }
    }).then(res=>{
      var rows = JSON.parse(res.result);
      this.setData({ list: this.data.list.concat(rows.subjects) });
      console.log(this.data.list);
      this.data.i += 5;
      wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading()
      console.log(err)
    })
  },
  checkout(){
    if(this.data.stat==1){
      this.setData({stat:2})
      this.data.list=[]
    }else{
      this.setData({stat:1})
      this.data.list=[]
    }
  },
  toArea(){
    wx.navigateTo({
      url: '/pages/arealist/arealist',
    })
  },
  toDetail(e){
    wx.navigateTo({
      url: '/pages/moviedetail/moviedetail?id='+e.target.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})