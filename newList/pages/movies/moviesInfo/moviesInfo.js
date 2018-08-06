var util = require("../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     movieInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id;
      var url = app.globalData.g_movieBase+'/v2/movie/subject/'+id;
      util.getData(url,this.onProcessData);
     
  },
  onProcessData:function(data){
     //判断数据是否为空
     var movie={
       id:data.id,
       movieImg:data.images.large?data.images.large:'',
       title:data.title?data.title:'',
       summary:data.summary?data.summary:'',
       year:data.year,
       genres:data.genres.join('、'),
       rating: data.rating,
       countries:data.countries[0],
       likes:data.wish_count,
       comments:data.comments_count,
       directors:data.directors[0]?data.directors[0].name:'',
       casts:util.actorName(data.casts),
       summary: data.summary?data.summary:'无剧情简介',
       actorInfo:util.actorList(data.casts)
     }
     this.setData({
       movie:movie
     })
  },
  onPreviewTap:function(event){
    var src= event.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls: [src]
    })
  }
})