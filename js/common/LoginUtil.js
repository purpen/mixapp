import {Load} from "./AsycStorageConfig";
import {LOGIN_INFO} from "./Constants";

export default class LoginUtil{
    static isLogin(){
        return new Promise((resolve,reject)=>{
            storage.load(new Load(LOGIN_INFO,false)).then(ret=>{
                resolve(ret);
            }).catch(err=>{
                reject(err);
            })
        });
    }
}