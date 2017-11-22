import HttpUtil from "../network/HttpUtil";
import {USER_LOGIN_URL} from "./URLS";
const POST='POST';
const GET='GET';

export default class AppService {
    static loginUser(params:Array){
        return new Promise((resolve,reject)=>{
            HttpUtil.getData(POST,USER_LOGIN_URL,params)
                .then((data)=>{resolve(data);
            }).catch((error)=>{
                reject(error);
            })
        });
    }
}