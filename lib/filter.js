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
 *  Remove rows that are entirely empty values
 */
const filter = _.promise.make(self => {
    self.rows = self.rows.filter(row => _.values(row).filter(value => value !== null).length !== 0)
})
