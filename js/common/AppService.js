import HttpUtil from "../network/HttpUtil";
import * as Url from "./URLS";
const POST = 'POST';
const GET = 'GET';

export default class AppService {
    static generatePromise(method,url,params) {
        return new Promise((resolve, reject) => {
            HttpUtil.getData(method,url, params)
                .then((data) => {
                    resolve(data);
                }).catch((error) => {
                reject(error);
            })
        });
    }
    static loginUser(params: Array) {
        return this.generatePromise(POST,Url.USER_LOGIN_URL,params);
    }

    static registerUser(params: Array) {
        return this.generatePromise(POST,Url.USER_REGISTER_URL,params);
    }

    static getCheckCode(params:Array) {
        return this.generatePromise(POST,Url.AUTH_VERIFY_CODE_URL,params);
    }

    static getProductInfo(params:Array) {
        return this.generatePromise(POST,Url.PRODUCT_DETAIL_URL,params);
    }


    static getShopCartData(params:Array) {
        return this.generatePromise(POST,Url.SHOP_CART_URL,params);
    }

    static getIndexTabData(params:Array) {
        return this.generatePromise(POST,Url.INDEX_PRODUCTS_LIST,params);
    }

    static getChoiceGoodsData(params) {
        return this.generatePromise(POST,Url.INDEX_CHOICE_GOODS_URL,params);
    }

    static getCategoryData(params) {
        return this.generatePromise(POST,Url.INDEX_CATEGORY_URL,params);
    }

    static getLocalGuideData(params) {
        return this.generatePromise(POST,Url.INDEX_LOCALGUIDE_URL,params);
    }

    static getIndexBannerData(params) {
        return this.generatePromise(POST,Url.INDEX_BANNER_URL,params);
    }
}