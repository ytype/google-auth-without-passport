import http from 'http'
import assert from 'assert'

import '../src/index.js'

describe('Mock Node Server', () => {
    it('should return 200', done => {
        http.get('http://127.0.0.1:3000', res => {
            assert.equal(200, res.statusCode)
            done()
        })
    }),
    it('should return 404', done => {
        http.get('http://127.0.0.1:3000/hello', res => {
            assert.equal(404, res.statusCode)
            done()
        })
    })
})
