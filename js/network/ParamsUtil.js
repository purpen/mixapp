import {Platform} from 'react-native'
export function Map(key, value) {
    this.key = key;
    this.value = value;
}
export default class ParamsUtil {

    static sortParams(params) {
        params = params.sort(function (item1, item2) {
            return item1.key > item2.key;
        });
        return params;
    }

    static generateLoginUserParams(account, password) {
        let from_to = Platform.OS === 'ios' ? "1" : "2";
        let params=[];
        params.push(new Map('mobile',account));
        params.push(new Map('password',password));
        params.push(new Map('from_to',from_to));
        return this.sortParams(params);
    }

    static generateRegisterUserParams(account,checkCode,password) {
        let from_to = Platform.OS === 'ios' ? "1" : "2";
        let params=[];
        params.push(new Map('mobile',account));
        params.push(new Map('verify_code',checkCode));
        params.push(new Map('password',password));
        params.push(new Map('from_to',from_to));
        return this.sortParams(params);
    }

    static generateRegisterCheckCodeParams(phone) {
        let params=[];
        params.push(new Map('mobile',phone));
        params.push(new Map('type','1'));
        return this.sortParams(params);
    }

    static generateProductInfoParams(id) {
        let params=[];
        params.push(new Map('id',id));
        return this.sortParams(params);
    }


    static generateShopCartParams() {
        let params=[];
        return this.sortParams(params)
    }
}

