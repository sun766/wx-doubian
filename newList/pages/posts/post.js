var localData = require('../../data/localData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 模拟从后台获取数据实现数据绑定
   
    // 将获取的数据更新到data中
    this.setData({postList:localData.postList});
  },

  onTap:function(event){
     var postId = event.currentTarget.dataset.postid;
     wx.navigateTo({
       url:'./postDetail/postDetail?id='+ postId
     })
  }
})