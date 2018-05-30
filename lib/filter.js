/*
 *  lib/filter.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

const _ = require("iotdb-helpers")

const assert = require("assert")

/**
 *  Restrict rows to those matching the filter
 */
const filter = f => _.promise.make(self => {
    const method = "filter"

    assert.ok(_.is.Array(self.jsons), `${method}: expected self.jsons to be Array`)
    assert.ok(_.is.Function(f), `${method}: expected parameter to be Function`)

    self.jsons = self.jsons.filter(f)
})

/**
 *  API
 */
exports.filter = filter
exports.filter.empty = filter(json => _.values(json).filter(value => value !== null).length !== 0)
