/**
 * Created by node on 15-12-23.
 */
//解决IE8以下,jQuery跨域访问BUG;
jQuery.support.cors = true;
var host = '/';

/**
 * 正则对象
 */
var regexpObj = {
    phone: /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|70)\d{8}$/,
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    password: /^(.){6,16}$/,
    number: /^\d+$/,
};

/**
 *  远程数据
 */
var rData = {
    /**
     * 简单查询
     * @param url
     * @param fn
     */
    query: function(url, fn) {
        $.ajax({
            url: host + url,
            cache: false,
            async: true,
            type: 'GET',
            xhrFields: { withCredentials: true },
            success: function(result) {
                fn(null, result);
            },
            error: function(res, error, exception) {
                if (fn) {
                    if (res.responseJSON) {
                        fn(res.responseJSON);
                    } else {
                        fn(exception);
                    }
                }
            },
        });
    },
    /**
     * ajaxRequest
     * @param url  url 地址
     * @param data  数据
     * @param method
     * @param headers
     * @param fn
     */
    request: function(url, data, method, headers, fn) {
        $.ajax({
            url: host + url,
            data: data || {},
            cache: false,
            async: true,
            type: method,
            headers: headers || {},
            xhrFields: { withCredentials: true },
            success: function(result) {
                if (fn) {
                    fn(null, result);
                }
            },
            error: function(res, error, exception) {
                if (fn) {
                    if (res.responseJSON) {
                        fn(res.responseJSON);
                    } else {
                        fn(exception);
                    }
                }
            },
        });
    },
};

/**
 * 输入检查
 *  div和input的id组合的命令规则
 *  <div id="inputEmailDiv" >
 *      <input type="email"id="inputEmail">
 *  </div>
 */
var iCheck = {
    empty: function(elementId) {
        return this.check(elementId);
    },
    email: function(elementId) {
        return this.check(elementId, regexpObj.email);
    },
    phone: function(elementId) {
        return this.check(elementId, regexpObj.phone);
    },
    password: function(elementId) {
        return this.check(elementId, regexpObj.password);
    },
    number: function(elementId) {
        return this.check(elementId, regexpObj.number);
    },
    check: function(elementId, regexp) {
        var _element = $('#' + elementId);
        var _elementDiv = $('#' + elementId + 'Div');
        if (!_element || !_elementDiv) {
            return false;
        }
        _elementDiv.removeClass('has-error');
        var _data = _element.val();
        if ($.trim(_data) === '') {
            _elementDiv.addClass('has-error');
            _element.focus();
            return false;
        }

        if (regexp && !regexp.test(_data)) {
            _elementDiv.addClass('has-error');
            _element.focus();
            return false;
        }

        return true;
    },
};

/**
 * 弹窗消息
 * */
var popMsg = {
    timing: 2500,
    loading: function(text) {
        this.show(text || '处理中...', 'alert-success');
    },
    error: function(text) {
        this.show(text, 'alert-danger', this.timing);
    },
    warning: function(text) {
        this.show(text, 'alert-warning', this.timing);
    },
    info: function(text) {
        this.show(text, 'alert-info', this.timing);
    },
    success: function(text) {
        this.show(text, 'alert-success', this.timing);
    },
    show: function(text, classname, timing) {
        $('#bs-message-modal-alert').removeClass(
            'alert-success alert-info alert-warning alert-danger',
        );
        $('#bs-message-modal-alert').addClass(classname);
        $('#bs-message-modal-text').html(text);
        $('#bs-message-modal-sm').modal('show');

        if (timing) {
            var st = setTimeout(function() {
                $('#bs-message-modal-sm').modal('hide');
                $('#bs-message-modal-text').html('');
                clearTimeout(st);
            }, timing);
        }
    },
    close: function() {
        $('#bs-message-modal-sm').modal('hide');
    },
};

/**
 * api访问
 * */
var api = {
    verifyUser: function(callback) {
        var url = 'profile',
            method = 'GET';
        rData.request(url, '', method, null, callback);
    },
    login: function(logIninfo, callback) {
        var url = 'login',
            data = logIninfo,
            method = 'POST',
            headers = { 'content-type': 'application/x-www-form-urlencoded' };
        rData.request(url, data, method, headers, callback);
    },
    logout: function(callback) {
        var url = 'logout',
            method = 'GET';
        rData.request(url, null, method, null, callback);
    },
};

//base64加密 解密
/* //1.加密  
var result = Base.encode('125中文');  //--> "MTI15Lit5paH"
//2.解密  
var result2 = Base.decode(result); //--> '125中文'
*/

~(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Base = factory();
    }
})(this, function() {
    'use strict';

    function Base64() {
        // private property
        this._keyStr =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }
    //public method for encoding
    Base64.prototype.encode = function(input) {
        var output = '',
            chr1,
            chr2,
            chr3,
            enc1,
            enc2,
            enc3,
            enc4,
            i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output =
                output +
                this._keyStr.charAt(enc1) +
                this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) +
                this._keyStr.charAt(enc4);
        }
        return output;
    };

    // public method for decoding
    Base64.prototype.decode = function(input) {
        var output = '',
            chr1,
            chr2,
            chr3,
            enc1,
            enc2,
            enc3,
            enc4,
            i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    };

    // private method for UTF-8 encoding
    Base64.prototype._utf8_encode = function(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };

    // private method for UTF-8 decoding
    Base64.prototype._utf8_decode = function(utftext) {
        var string = '',
            i = 0,
            c = 0,
            c1 = 0,
            c2 = 0,
            c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(
                    ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63),
                );
                i += 3;
            }
        }
        return string;
    };

    var Base = new Base64();

    return Base;
});