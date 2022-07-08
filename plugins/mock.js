import { mock } from 'mockjs'

mock(/\/api\/auth\/login/, 'post', (data) => {
  console.log(data)
  return {
    res: 20000,
    msg: 'success',
    data: {
      token: {
        accessToken: 'sdgfdgsfdgsfdgsdfg',
        refreshToken: '1234569'
      }
    }
  }
})

mock(/\/api\/auth\/refresh/, 'post', (data) => {
  console.log(data)
  return {
    res: 20000,
    msg: 'success',
    data: {
      token: {
        accessToken: 'sdgfdgsfdgsfdgsdfg' + Math.random(),
        refreshToken: '1234569' + Math.random()
      }
    }
  }
})

mock(/\/api\/auth\/logout/, 'post', (data) => {
  return {
    res: 20000,
    msg: 'success'
  }
})

mock(/\/api\/auth\/user/, 'get', (data) => {
  console.log(data)
  return {
    res: 20000,
    msg: 'success',
    data: {
      info: {
        username: 'From User'
      }
    }
  }
})
