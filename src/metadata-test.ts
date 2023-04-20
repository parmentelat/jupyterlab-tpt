/* eslint-disable prettier/prettier */

import { MetadataAction, manage_metadata } from './metadata'

const {Get, Set, Unset, Insert, Remove, } = MetadataAction

const m = manage_metadata

const md = {}

// uncomment to debug
const checkpoint = (message) => {
    // console.log('------', message, '\n', JSON.stringify(md))
    message
}

console.assert(m(md, Get, 'simple', null) === undefined, '001')
console.assert(m(md, Set, 'simple', 1) === 1, '002')
console.assert(m(md, Get, 'simple', null) === 1, '003')

checkpoint("should have 'simple' set to 1")

// first time OK
console.assert(m(md, Unset, 'simple', null) === true, '011')
// then KO
console.assert(m(md, Unset, 'simple', null) === false, '012')
console.assert(m(md, Get, 'simple', null) === undefined, '013')
console.assert(m(md, Set, 'simple', 1) === 1, '014')

checkpoint('same')

console.assert(m(md, Get, 'nested.under', null) === undefined, '021')
console.assert(m(md, Set, 'nested.under', 2) === 2, '022')
console.assert(m(md, Get, 'nested.under', null) === 2, '023')
console.assert(m(md, Unset, 'nested.under', null) === true, '024')
console.assert(m(md, Get, 'nested.under', null) === undefined, '025')
console.assert(m(md, Unset, 'nested.under', null) === false, '026')
console.assert(JSON.stringify(m(md, Get, 'nested', null)) === '{}', '027')
console.assert(m(md, Set, 'nested.under', 2) === 2, '028')

checkpoint("should have 'nested.under' set to 2")

console.assert(m(md, Get, 'jupyter', null) === undefined, '031')
console.assert(m(md, Get, 'jupyter.source_hidden', null) === undefined, '032')
console.assert(m(md, Get, ['jupyter', 'source_hidden'], null) === undefined, '033')
console.assert(m(md, Set, 'jupyter.source_hidden', true) === true, '034')
console.assert(m(md, Get, ['jupyter', 'source_hidden'], null) === true, '035')
console.assert(m(md, Get, 'jupyter.source_hidden', null) === true, '036')

checkpoint('jupyter.source_hidden=true')

// cannot insert in pre-existing non-array
console.assert(m(md, Insert, 'jupyter', 'anything') === undefined, '041')
console.assert(m(md, Insert, 'jupyter.source_hidden', 'anything') === undefined, '042')

checkpoint('same')

console.assert(m(md, Get, 'tags.hide-input', null) === undefined, '051')
// first time ok
console.assert(m(md, Insert, 'tags', 'hide-input') === 'hide-input', '052')
// then ko
console.assert(m(md, Insert, 'tags', 'hide-input') === undefined, '053')
console.assert(m(md, Insert, 'tags', 'foo') === 'foo', '054')
let fetch = m(md, Get, 'tags', null)
console.assert(fetch instanceof Array, '055')
console.assert(fetch.length === 2, '056')

checkpoint('with 2 tags hide-input and foo')

console.assert(m(md, Remove, 'tags', 'foo') === 'foo', '061')
fetch = m(md, Get, 'tags', null)
console.assert(fetch instanceof Array, '062')
console.assert(fetch.length === 1, '063')

checkpoint('foo removed from the tags')
