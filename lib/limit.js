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
    
    assert.ok(_.is.Array(self.rows), `${method}: expected self.rows to be Array`)

    self.rows.length = Math.min(n, self.rows.length)
})
