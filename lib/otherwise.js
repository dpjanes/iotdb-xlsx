/*
 *  lib/otherwise.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

const _ = require("iotdb-helpers")

const assert = require("assert")

/**
 *  Default values if they are not there
 */
const otherwise = od => _.promise.make(self => {
    let retained = null

    self.rows = self.rows.map(row => {
        row = _.d.clone(row)

        _.mapObject(od, (value, key) => {
            if (row[key] === null) {
                row[key] = od[key]
            } 
        })

        return row
    })
})
