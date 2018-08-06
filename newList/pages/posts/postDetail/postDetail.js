var postData = require("../../../data/localData.js");
var app = getApp();
Page({
  data:{
    musicTag:false
  },
  onLoad:function(options){
    var postId = options.id;
    var postDetail = postData.postList[postId];
    this.setData({
      postDetail:postDetail,
      postId:postId
    })

    //获取阅读状态
    var collectList = wx.getStorageSync('collectList');
    if(collectList){
      var collectTag = collectList[postId];
      this.setData({
        collectTag: collectTag
      })
      //根据全局的音乐播放状态更新，如果是当前播放ID
      if (app.globalData.g_currentMusicId==postId){
        this.setData({
          musicTag: app.globalData.g_musicTag
        })
      }
    }
    else{
      collectList = {};
      collectList[postId] = false;
      wx.setStorageSync('collectList',collectList);
    }
    
  },
  onCollectTap:function(event){
      var collectList = wx.getStorageSync('collectList');
      collectList[this.data.postId] = !collectList[this.data.postId];
      //更新本地缓存状态
      wx.setStorageSync('collectList',collectList);
      //更新data中数据绑定
      this.setData({
        collectTag: collectList[this.data.postId]
      })
      //弹框提示用户
      wx.showToast({
        title: collectList[this.data.postId]?"收藏成功":"收藏取消",
        duration:1000
      })
  },
  onShareTap:function(event){
      var itemList =[
        "朋友圈",
        "微博","QQ","微信好友"
      ];
      wx.showActionSheet({
         itemList:itemList,
         success:function(res){
           wx.showToast({
             title:itemList[res.tapIndex]
           })
         }
      })
  },
  onMusicTap:function(){
     var musicTag = this.data.musicTag;
     if(musicTag){
       wx.pauseBackgroundAudio();
       this.setData({
         musicTag:!musicTag
       })
     }else{
       wx.playBackgroundAudio({
         ...postData.postList[this.data.postId].music
       })
       this.setData({
         musicTag: !musicTag
       })  
     }
     
     var that = this;
     wx.onBackgroundAudioPlay(function(){
       that.setData({
         musicTag:true
       })
     })
     wx.onBackgroundAudioPause(function(){
       that.setData({
         musicTag:false
       })
     })
     wx.onBackgroundAudioStop(function () {
       that.setData({
         musicTag: false
       })
     })
  },
  onUnload:function(){
    //将当前局部的更新到全局中
    app.globalData.g_musicTag = this.data.musicTag;
    app.globalData.g_currentMusicId = this.data.postId;
  }
})