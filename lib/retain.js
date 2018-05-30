/*
 *  lib/retain.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-28
 */

const _ = require("iotdb-helpers")

const assert = require("assert")

/**
 *  Retain values from row to row to row
 */
const retain = keys => _.promise.make(self => {
    let retained = null

    self.rows = self.rows.map(row => {
        if (retained === null) {
            retained = {}
            keys.forEach(key => {
                retained[key] = row[key]
            })
        }

        row = _.d.clone(row)

        keys.forEach(key => {
            if (row[key] === null) {
                row[key] = retained[key]
            } else {
                retained[key] = row[key]
            }
        })

        return row
    })
})
