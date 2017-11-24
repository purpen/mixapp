import DeviceInfo from 'react-native-device-info'
import {Platform} from 'react-native'
import MD5Util from './MD5Util'
import {Map} from "./ParamsUtil";

export default class HttpUtil{
    static getData(method:string,url:string,params:Array){
        return new Promise(function (resolve,reject) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let body=HttpUtil.requestBodyString(params)
            let request = new Request(url, {method: method, headers: headers, body: body});
            fetch(request)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (!responseJson){
                        reject(new Error('server\'s response is null'));
                    }
                    resolve(responseJson);
                }).catch((error) => {
                    reject(error);
            })
        });
    }


     static requestBodyString(params) {
         let finalParams = [];
         finalParams.push(new Map("app_type", Platform.OS === 'ios' ? "1" : "2"));
         finalParams.push(new Map("client_id", "1415289600"));
         finalParams.push(new Map("uuid", Platform.OS === 'ios' ? DeviceInfo.getUniqueID() : DeviceInfo.getSerialNumber()));
         finalParams.push(new Map("channel", "10"));
         finalParams.push(new Map("time", new Date().getTime().toString()));
         finalParams.push(new Map("sign",this.getSignedString(params)));
         for (let item of params) finalParams.push(item);
         return this.jointString(finalParams);
     }

    static jointString(arr:Array) {
        let str='';
        let len = arr.length;
        let key, value;
        for (let i = 0; i < len; i++) {
            key = arr[i].key;
            value = arr[i].value;
            if (i == 0) {
                str = str.concat(key).concat('=').concat(value);
            } else {
                str = str.concat('&').concat(key).concat('=').concat(value);
            }
        }
        return str;
    }

    static getSignedString(params:Array) {
         return MD5Util.hex_md5(MD5Util.hex_md5(this.jointString(params)+"545d9f8aac6b7a4d04abffe51415289600"));
     }
 }