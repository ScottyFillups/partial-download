/* global describe, it, after */

const chai = require('chai')
const fs = require('fs-extra')
const path = require('path')
const dirtyChai = require('dirty-chai')
const partialDownload = require('../')

const { expect } = chai

chai.use(dirtyChai)

describe('partial-download', () => {
  const bytes = 1024 * 10
  const filename = path.join(__dirname, './out.webm')

  after(async () => {
    return fs.remove(filename)
  })

  describe('Behaviour for valid input', () => {
    describe('http protocol', () => {
      const url = 'http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm'

      it('stops downloading once byte limit has been exceeded', async () => {
        const downloaded = await partialDownload(url, filename, bytes)
        const filestats = await fs.stat(filename)

        expect(filestats.size).to.equal(downloaded)
        expect(downloaded).to.not.be.below(bytes)
      })
    })

    describe('https protocol', () => {
      const url = 'https://www.w3schools.com/html/mov_bbb.webm'

      it('stops downloading once byte limit has been exceeded', async () => {
        const downloaded = await partialDownload(url, filename, bytes)
        const filestats = await fs.stat(filename)

        expect(filestats.size).to.equal(downloaded)
        expect(downloaded).to.not.be.below(bytes)
      })
    })
  })

  describe('Behaviour for invalid input', () => {
    it('Should reject a malformed request', async () => {
      try {
        await partialDownload('not a url', filename, bytes)

        expect.fail()
      } catch (err) {
        expect(err).to.be.an('error')
      }
    })
  })
})
