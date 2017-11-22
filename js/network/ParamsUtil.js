import {Platform} from 'react-native'
export function Map(key, value) {
    this.key = key;
    this.value = value;
}
export default class ParamsUtil {
    static generateLoginUserParams(account, password) {
        let from_to = Platform.OS === 'ios' ? "1" : "2";
        let params=[];
        params.push(new Map('mobile',account));
        params.push(new Map('password',password));
        params.push(new Map('from_to',from_to));
        params=params.sort(function (item1,item2) {
            return item1.key>item2.key;
        });
        return params;
    }

}

