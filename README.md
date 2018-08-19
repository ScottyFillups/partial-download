# partial-download

Download part of a file.

## Installation

```bash
$ yarn add partial-download

# Or,

$ npm install partial-download --save
```

## Usage

```js
const partialDownload = require('partial-download')

const url = 'https://www.w3schools.com/html/mov_bbb.webm'
const megabyte = 1024 * 1024

// stop downloading once 1MB has been exceeded
thumbnail(url, './output/file.webm', megabyte)
  .then((bytes) => console.log('Downloaded ', bytes, ' bytes!'))
```

## API

#### partialDownload(url, output, byteLimit)

Returns of a `Promise` which resolves to the number of downloaded bytes.

#### url

Type: `String`

The url of the file.

#### output

Type: `String`

The file path of the output, assumes directory exists.

#### byteLimit

Type: `Number`

The byte limit threshold; the download will stop once the byte limit has been exceeded.
