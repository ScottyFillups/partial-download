# partial-load

Download part of a file.

## Installation

```bash
$ yarn add partial-load

# Or,

$ npm install partial-load --save
```

## Usage

```js
const partialDownload = require('partial-load')

const url = 'https://www.w3schools.com/html/mov_bbb.webm'
const megabyte = 1024 * 1024

// stop loading once 1MB has been exceeded
partialDownload(url, './output/file.webm', megabyte)
  .then((bytes) => console.log('Downloaded ', bytes, ' bytes!'))
```

## API

#### partialLoad(url, output, byteLimit)

Returns of a `Promise` which resolves to the number of loaded bytes.

#### url

Type: `String`

The url of the file.

#### output

Type: `String`

The file path of the output, assumes directory exists.

#### byteLimit

Type: `Number`

The byte limit threshold; the load will stop once the byte limit has been exceeded.
