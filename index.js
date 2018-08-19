'use strict'

const fs = require('fs')
const https = require('https')
const http = require('http')
const url = require('url')

function partialDownload (target, outputPath, byteLimit) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath)

    let bytes = 0
    let driver = url.parse(target).protocol === 'https:'
      ? https
      : http

    driver.get(target, (res) => {
      res.on('data', (data) => {
        if (bytes < byteLimit) {
          file.write(data)
          bytes += data.length
        } else {
          res.destroy()
          resolve(bytes)
        }
      }).on('end', file.end.bind(file))
    })
  })
}

module.exports = partialDownload
