/**
 * @module
 * @name dances.ajax
 * @requires dances.json
 * @author devan5 <devan5.pan#gmail.com>
 * @Date 2013.07.10
 */

(function(exprots, undefined){
    "use strict";
    var
        newRequest,

        uc = function(fn){
            return function(){
                return Function.prototype.call.apply(fn, arguments);
            }
        },

        slice = uc(Array.prototype.slice),

        toString = uc(Object.prototype.toString),

        Tools,

        fHandleData,
        fBindUrl
    ;

    Tools = {
        json: {
            parse    : dances.json,
            stringify: dances.json
        }
    };

    exprots = exprots || {};

    /**
     * @example
     * ajax("url", "opts")
     * @example
     * ajax("opts")
     */
    function Ajax(url, opts){

        if(this instanceof  Ajax){

        }else{
            _ajax.apply(this, arguments);
        }

    }

    function _ajax(url, opts){
        var
            http,
            method,
            data
        ;
        if("[object Object]" === toString(url)){
            opts = url;
            url = opts.url;
        }

        opts = opts || {};

        http = newRequest();
        method = opts.method.toUpperCase();
        data = opts.data;

        // check xhr.method
        -1 === "GET#,POST#,".indexOf(method + "#") && (method = "GET");

        // handle data
        data = fHandleData(data);

        // bind url
        url = "GET" === url ? fHandleData(url, data) : url;

        // TODO check 教科书般的代码
/*
        if("POST" == method){
            http.setRequestHeader("Content-type", "application/x-www-form-urlencode");
        }
*/

        http.open(method, url, false !== opts.async, opts.user, opts.password);

        http.onreadystatechange = function(){
            if(4 === http.readyState){
                if(200 === http.status){
                    "function" === typeof opts.success && opts.success(http.responseText, http);
                    "function" === typeof opts.complete && opts.complete(http.responseText, http);
                }else{
                    "function" === typeof opts.error && opts.error(http.responseText, http);
                    "function" === typeof opts.complete && opts.complete(http.responseText, http);
                }
            }
        };

        http.send(data);

    }

    fHandleData = function(data){
        // 处理 data

        return data;
    };

    fBindUrl = function(url, data){
        // 处理 data

        return url;
    };

    newRequest = function(){
        var oXhr;
        if("XMLHttpRequest" in window){
            try{
                oXhr = new XMLHttpRequest();

                newRequest = function(){ return new XMLHttpRequest(); }

            }catch (e){ }
        }

        if(!oXhr && window.ActiveXObject){
            var
                aIE = [
                    "Microsoft.XMLHTTP",
                    "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp.6.0"
                ],
                len = aIE.length
            ;

            while(len--){
                try{
                    oXhr = new ActiveXObject(aIE[len]);
                    newRequest = (function(x){ return function(){ return new ActiveXObject(x); } })(aIE[len]);
                    break;
                }catch(e){}
            }

            aIE.length = 0;

        }

        return oXhr;
    };

    exprots.ajax = Ajax;

    "function" === typeof window.define && define.amd && define.amd.dsAjax && define(["dJs"], function(){
       return Ajax;
    });

})(window.dances);

/*_____

    dances.ajax("url", opts);

    var instX = new dances.ajax();

    instX.open();
    instX.send(data);


*/