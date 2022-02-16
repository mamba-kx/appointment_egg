'use strict'

module.exports = app =>{
  app.validator.addRule('phone',(rule,value)=>{
    if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)){
      return true
    }
    return 'phone'
  })

  app.validator.addRule('idcard',(rule,value)=>{
    if(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value)){
      return true
    }
    return 'idcard'
  })
} 