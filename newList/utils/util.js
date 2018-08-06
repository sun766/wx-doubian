const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getData(url, process){
  wx.request({
    url: url,
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      process(res.data);
    }
  })
}

function actorName(list){
   var name="";
   for(var i=0;i<list.length;i++){
     name+= list[i].name+'/';
   }
   return name.substr(0,name.length-1);
}

function actorList(list){
   var arrayInfo=[];
   var obj={};
   for(var i=0;i<list.length;i++){
     obj.img=list[i].avatars?list[i].avatars.large:'/images/news/vr.png';
     obj.name=list[i].name;
     arrayInfo[i]=obj;
     obj={};
   }
   return arrayInfo;
}

module.exports = {
  formatTime: formatTime,
  getData:getData,
  actorName:actorName,
  actorList:actorList
}
