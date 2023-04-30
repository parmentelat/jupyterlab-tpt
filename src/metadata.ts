/* eslint-disable prettier/prettier */

//
// Metadata helper tools
// (*) md_get: get a metadata value
//         e.g. md_get(cell, "some.path.in.the.metadata")
//           or md_get(cell, ["some", "path", "in", "the", "metadata"])
//           or md_get(cell, ["some", "path", "in", "the", "metadata"], "default value")
// (*) md_set: set a metadata value
//         e.g. md_set(cell, "some.path.in.the.metadata", "new value")
//           or md_set(cell, ["some", "path", "in", "the", "metadata"], "new value")
// (*) md_unset: unset a metadata value
//         e.g. md_unset(cell, "some.path.in.the.metadata")
//           or md_unset(cell, ["some", "path", "in", "the", "metadata"])
//
// (*) md_has: check if a value is present in a metadata list
//         e.g. md_has(cell, "tags", "tag-to-check")
// (*) md_insert: insert a value in a metadata list
//         e.g. md_insert(cell, "tags", "added-tag")
// (*) md_remove: remove a value from a metadata list
//         e.g. md_remove(cell, "tags", "removed-tag")
// (*) md_toggle: toggle a value in a metadata list
//

import { ICellModel, Cell } from '@jupyterlab/cells'

import {
  XpathMap, Xpath, normalize,
  xpath_get, xpath_set, xpath_unset, xpath_insert, xpath_remove
} from './xpath'


// atomic values

export const md_get = (cell: Cell | ICellModel, xpath: Xpath, if_missing?: any): any => {
  if (cell instanceof Cell) {
    cell = cell.model
  }
  xpath = normalize(xpath)
  const [first, ...tail] = xpath

  const start = cell.getMetadata(first)
  if (start === undefined) {
    return if_missing
  } else {
    return xpath_get(start as XpathMap, tail)
  }
}

export const md_set = (cell: Cell, xpath: Xpath, value: any): any => {
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  const start = cell.model.getMetadata(first)
  if (tail.length === 0) {
    cell.model.setMetadata(first, value)
    return value
  }
  const subtree = start || {}
  const retcod = xpath_set(subtree as XpathMap, tail, value)
  cell.model.setMetadata(first, subtree)
  return retcod
}

export const md_unset = (cell: Cell, xpath: Xpath): boolean => {
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  const start = cell.model.getMetadata(first)
  if (start === undefined) {
    return false
  }
  if (tail.length === 0) {
    cell.model.deleteMetadata(first)
    return true
  } else {
    const retcod = xpath_unset(start as XpathMap, tail)
    cell.model.setMetadata(first, start)
    return retcod
  }
}


// lists (i.e. tags)

export const md_has = (cell: Cell, xpath: Xpath, key: string) => {
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  const start = cell.model.getMetadata(first)
  if (start === undefined) {
    return false
  }
  const list = xpath_get(start as XpathMap, tail)
  if (list === undefined) {
    return false
  }
  return list.indexOf(key) >= 0
}

export const md_insert = (cell: Cell, xpath: Xpath, key: string) => {
  xpath = normalize(xpath)
  const [first, ...tail] = xpath

  const start = cell.model.getMetadata(first)
  if (tail.length === 0) {
    let sublist : Array<string>
    if (start !== undefined) {
      sublist = start as Array<string>
      // use another object as otherwise .setMetadata() does not seem to propagate
      sublist = sublist.slice()
    } else {
      sublist = []
    }
    if (sublist.indexOf(key) < 0) {
      sublist.push(key)
      cell.model.setMetadata(first, sublist)
      return key
    } else {
      return undefined
    }
  } else {
    const subtree = start || {}
    const retcod = xpath_insert(subtree as XpathMap, tail, key)
    cell.model.setMetadata(first, subtree)
    return retcod
  }
}

export const md_remove = (cell: Cell, xpath: Xpath, key:string) => {
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  const start = cell.model.getMetadata(first)
  if (start === undefined) {
    return undefined
  }
  if (tail.length === 0) {
    const sublist = start as Array<string>
    if (!(sublist instanceof Array)) {
      return undefined
    }
    // use another object as otherwise .set() does not seem to propagate
    const copy = sublist.slice()
    const index = copy.indexOf(key)
    if (index < 0) {
      return undefined
    }
    // const as_array = sublist as Array<string>
    copy.splice(index, 1)
    cell.model.setMetadata(first, copy)
    return key
  } else {
    const subtree = start
    const retcod = xpath_remove(subtree as XpathMap, tail, key)
    cell.model.setMetadata(first, subtree)
    return retcod
  }
}

export const md_toggle = (cell: Cell, xpath: Xpath, key: string) => {
  xpath = normalize(xpath)
  if ( ! md_has(cell, xpath, key)) {
    return md_insert(cell, xpath, key)
  } else {
    return md_remove(cell, xpath, key)
  }
}
