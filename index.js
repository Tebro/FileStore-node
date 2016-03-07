var http = require("http");

"use strict";
class FileStore {
    constructor(domain, port) {
        this.domain = domain;
        this.port = port;
    }

    // storeData(path, value, content_type = null, ttl = null, callback){
    storeData(params, callback){
        var headers = {};
        if(params.content_type != null && typeof params.content_type == "string"){
            headers['Content-Type'] = params.content_type;
        }
        if(params.ttl != null && !isNaN(parseFloat(params.ttl)) && isFinite(params.ttl)){
            headers['File-Store-TTL'] = params.ttl;
        }

        var options = {
            hostname: this.domain,
            port: this.port,
            headers: headers,
            path: params.path,
            method: "POST"
        }

        var req = http.request(options, (res) => {
            res.setEncoding('utf8');
            var data = "";
            res.on('data', (chunk) => {data+=chunk});
            res.on('end', () => {
                if(res.statusCode == 200){
                    callback(null, data);
                }else {
                    var error = {
                        msg: `Error statuscode: ${res.statusCode}`,
                        statuscode: res.statusCode
                    }
                    callback(error, null)
                }
            });
        });

        req.on('error', (e) => {
            callback(e, null);
        });

        req.write(params.value);
        req.end();
    }

    getData (path, callback) {
        var options = {
            hostname: this.domain,
            port: this.port,
            path: path,
            method: "GET"
        };
        var req = http.request(options, (res) => {
            var data = "";
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if(res.statusCode == 200){
                    callback(null, data);
                } else {
                    var error = {
                        msg: `Error statuscode: ${res.statusCode}`,
                        statuscode: res.statusCode
                    }
                    callback(error, null)
                }
            });
        });

        req.on('error', (e) => {
            callback(e, null);
        });

        req.write("");
        req.end();
    }
}

module.exports = FileStore;