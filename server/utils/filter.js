const keywords = require('../data')

module.exports =  filterKeywords = function(message) {
  //遍历敏感词数组  
  for (let i = 0; i < keywords.length; i++) {
    //全局替换  
    var reg = keywords[i]
    //判断内容中是否包括敏感词  
    if (message.mess.indexOf(keywords[i]) !== -1) {
      message.mess = message.mess.replace('妈的', "**")
      return message
    }
  }
}  