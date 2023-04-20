/* eslint-disable prettier/prettier */

import { 
    metadata_get, metadata_set, metadata_unset, metadata_insert, metadata_remove
} from './metadata'

const md = {}

// uncomment to debug
const checkpoint = (message: string) => {
    // console.log('------', message, '\n', JSON.stringify(md))
    message
}

console.assert(metadata_get(md, 'simple') === undefined, '001')
console.assert(metadata_set(md, 'simple', 1) === 1, '002')
console.assert(metadata_get(md, 'simple') === 1, '003')

checkpoint("should have 'simple' set to 1")

// first time OK
console.assert(metadata_unset(md, 'simple') === true, '011')
// then KO
console.assert(metadata_unset(md, 'simple') === false, '012')
console.assert(metadata_get(md, 'simple') === undefined, '013')
console.assert(metadata_set(md, 'simple', 1) === 1, '014')

checkpoint('same')

console.assert(metadata_get(md, 'nested.under') === undefined, '021')
console.assert(metadata_set(md, 'nested.under', 2) === 2, '022')
console.assert(metadata_get(md, 'nested.under') === 2, '023')
console.assert(metadata_unset(md, 'nested.under') === true, '024')
console.assert(metadata_get(md, 'nested.under') === undefined, '025')
console.assert(metadata_unset(md, 'nested.under') === false, '026')
console.assert(JSON.stringify(metadata_get(md, 'nested')) === '{}', '027')
console.assert(metadata_set(md, 'nested.under', 2) === 2, '028')

checkpoint("should have 'nested.under' set to 2")

console.assert(metadata_get(md, 'jupyter') === undefined, '031')
console.assert(metadata_get(md, 'jupyter.source_hidden') === undefined, '032')
console.assert(metadata_get(md, ['jupyter', 'source_hidden']) === undefined, '033')
console.assert(metadata_set(md, 'jupyter.source_hidden', true) === true, '034')
console.assert(metadata_get(md, ['jupyter', 'source_hidden']) === true, '035')
console.assert(metadata_get(md, 'jupyter.source_hidden') === true, '036')

checkpoint('jupyter.source_hidden=true')

// cannot insert in pre-existing non-array
console.assert(metadata_insert(md, 'jupyter', 'anything') === undefined, '041')
console.assert(metadata_insert(md, 'jupyter.source_hidden', 'anything') === undefined, '042')

checkpoint('same')

console.assert(metadata_get(md, 'tags.hide-input') === undefined, '051')
// first time ok
console.assert(metadata_insert(md, 'tags', 'hide-input') === 'hide-input', '052')
// then ko
console.assert(metadata_insert(md, 'tags', 'hide-input') === undefined, '053')
console.assert(metadata_insert(md, 'tags', 'foo') === 'foo', '054')
let fetch = metadata_get(md, 'tags')
console.assert(fetch instanceof Array, '055')
console.assert(fetch.length === 2, '056')

checkpoint('with 2 tags hide-input and foo')

console.assert(metadata_remove(md, 'tags', 'foo') === 'foo', '061')
fetch = metadata_get(md, 'tags')
console.assert(fetch instanceof Array, '062')
console.assert(fetch.length === 1, '063')

checkpoint('foo removed from the tags')

console.assert(metadata_get(md, 'hide_input') === undefined, '071')
console.assert(metadata_set(md, 'hide_input', true) === true, '072')
console.assert(metadata_set(md, 'hide_input', false) === false, '072-bis')
console.assert(metadata_unset(md, 'hide_input') === true, '073')
console.assert(metadata_get(md, 'hide_input') === undefined, '074')

checkpoint('unchanged')
