# FileStore Node.js Library

This is a simpel library that assists with storing and retrieving data from a [FileStore](https://github.com/Tebro/FileStore)


## Requirements

The library requires some advanced ES6 features and node must therefore be run with the following command.

`node --use-strict --harmony_default_parameters app.js`

## Installation

Install with NPM

`npm install --save tebro-filestore`

## Usage

This module provides a simple class with two methods, one for storing data, and one for retrieving it.

**Example usage:**

```javascript
var FileStore = require("tebro-filestore");

var fs = new FileStore("example.com", 10000);

var params = {
    path: "/hello",
    value: "Hello World",
    content_type: "text/plain",
    ttl: 10
};

function callback(err, data) {
    if(err != null){
        console.log(err);
    }
    console.log(`DATA: ${data}`);
}

fs.storeData(params, callback);

fs.getData("/foobar", callback);


```