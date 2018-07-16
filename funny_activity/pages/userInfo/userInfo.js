// pages/userInfo/userInfo.js
Page({
  data: {
    items: [
    { name: '男', value: '1',checked: 'true'},
    { name: '女', value: '0'}
    ],
    careerArr:['老师','学生','律师','自由职业'],
    careerIndex:0,
    ageArr: ['10岁以下', '10-20岁', '20-30岁', '30-40岁','40-50岁','50岁以上'],
    ageIndex: 0
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindCareerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      careerIndex: e.detail.value,
      careerName: this.data.careerArr[e.detail.value]
    })
  },
  bindAgeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ageIndex: e.detail.value,
      ageName: this.data.ageArr[e.detail.value]
    })
  },
  formSubmit: function (e) {
    console.log('提交用户数据', e.detail.value)
    //将用户数据发送给后台，进行存储
    wx.request({
      url: '/me/update.php', //更新用户信息接口地址
      data: {
        nickname: e.detail.value.username,
        gender: e.detail.value.gender,
        age: e.detail.value.age,
        career: e.detail.value.career,
        area: e.detail.value.area
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})
