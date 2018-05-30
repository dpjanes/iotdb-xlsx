/*
 *  lib/limit.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

const _ = require("iotdb-helpers")

const assert = require("assert")

/**
 *  Restrict the number of rows returned
 */
const limit = n => _.promise.make(self => {
    const method = "limit"
    
    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    assert.ok(_.is.Integer(n), `${method}: expected parameter to be Integer`)

    self.jsons.length = Math.min(n, self.jsons.length)
})
