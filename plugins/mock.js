import { mock } from 'mockjs';

mock(RegExp('/api/auth/login'), 'post', (data) => {
    console.log(data);
    return {
        code: 20000,
        message: 'success',
        data: {
            token: {
                accessToken: 'abcdefg',
                refreshToken: '1234569'
            }
        }
    }

});