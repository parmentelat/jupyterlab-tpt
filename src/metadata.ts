/* eslint-disable prettier/prettier */

import { ICellModel, Cell } from '@jupyterlab/cells'

import {
  XpathMap, Xpath, normalize,
  xpath_get, xpath_set, xpath_unset, xpath_insert, xpath_remove
} from './xpath'


export const md_get = (cell: Cell | ICellModel, xpath: Xpath, if_missing?: any): any => {
  if (cell instanceof Cell) {
    cell = cell.model
  }
  const md = cell.metadata
  xpath = normalize(xpath)
  const [first, ...tail] = xpath

  if (!md.has(first)) {
    return if_missing
  } else {
    return xpath_get(md.get(first) as XpathMap, tail)
  }
}

export const md_set = (cell: Cell, xpath: Xpath, value: any): any => {
  const md = cell.model.metadata
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  if (tail.length === 0) {
    md.set(first, value)
    return value
  }
  const subtree = md.has(first) ? md.get(first) : {}
  const retcod = xpath_set(subtree as XpathMap, tail, value)
  md.set(first, subtree)
  return retcod
}

export const md_unset = (cell: Cell, xpath: Xpath): boolean => {
  const md = cell.model.metadata
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  if (! md.has(first)) {
    return false
  }
  if (tail.length === 0) {
    md.delete(first)
    return true
  } else {
    const subtree = md.get(first)
    const retcod = xpath_unset(subtree as XpathMap, tail)
    md.set(first, subtree)
    return retcod
  }
}

export const md_insert = (cell: Cell, xpath: Xpath, key: string) => {
  const md = cell.model.metadata
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  if (tail.length === 0) {
    let sublist : Array<string>
    if (md.has(first)) {
      sublist = md.get(first) as Array<string>
      // use another object as otherwise .set() does not seem to propagate
      sublist = sublist.slice()
    } else {
      sublist = []
    }
    if (sublist.indexOf(key) < 0) {
      sublist.push(key)
      md.set(first, sublist)
      return key
    } else {
      return undefined
    }
  } else {
    const subtree = md.has(first) ? md.get(first) : {}
    const retcod = xpath_insert(subtree as XpathMap, tail, key)
    md.set(first, subtree)
    return retcod
  }
}

export const md_remove = (cell: Cell, xpath: Xpath, key:string) => {
  const md = cell.model.metadata
  xpath = normalize(xpath)
  const [first, ...tail] = xpath
  if (! md.has(first)) {
    return undefined
  }
  if (tail.length === 0) {
    const sublist = md.get(first)
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
    md.set(first, copy)
    return key
  } else {
    const subtree = md.get(first)
    const retcod = xpath_remove(subtree as XpathMap, tail, key)
    md.set(first, subtree)
    return retcod
  }
}
