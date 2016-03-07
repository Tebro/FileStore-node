var FileStore = require("./index.js");


var fs = new FileStore("localhost", 10000);

var params = {
    path: "/foobar",
    value: "Hello World",
    content_type: "text/plain",
    ttl: 10
};
function responseHandler(err, data) {
    if(err != null){
        console.log("ERROR!");
        console.log(err);
    }
    console.log("DATA!");
    console.log(data);
}

fs.storeData(params, responseHandler);

fs.getData("/foobar", responseHandler);

setTimeout(() => {
    fs.getData("/foobar", responseHandler);
}, 11000);