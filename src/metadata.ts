/* eslint-disable prettier/prettier */

import { ICellModel, Cell } from '@jupyterlab/cells'

import {
  XpathMap, Xpath, normalize,
  xpath_get, xpath_set, xpath_unset, xpath_insert, xpath_remove
} from './xpath'

// this will need changes for jupyterlab 4.0
// see jupyterlab/grep -i metadata packages/cells/src/model.ts
//
// code like cellModel.metadata.has(key) will not work anymore
// same for .get() and .set()
// indeed now what we have is
//
// cellModel.metadata (read-only, and not recommended, for performance reasons)
// cellModel.getMetadata(key)
// cellModel.setMetadata(key, value)
// cellModel.deleteMetadata(key)
// cellModel.metadataChanged.connect((sender, args) => {

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
