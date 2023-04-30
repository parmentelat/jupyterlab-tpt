/* eslint-disable no-case-declarations */
/* eslint-disable prettier/prettier */

// helpers to manage a JS object
//
// in this module we are only concerned about doing side effects
// in a JavaScript object


// what to do on the passed object
enum Action {
  Get,      // get the metadata at that xpath
  Set,      // set the metadata at that xpath
  Unset,    // undo the set operation
  Insert,   // insert the value inside that xpath (should point to a list)
  Remove,   // undo insert
}


export type XpathMap = Record<string, any>
export type Xpath = string | string[]

export const normalize = (xpath: Xpath): string[] => {
  if (typeof xpath === 'string') {
    const string = xpath as string
    xpath = string.split('.')
  }
  return xpath
}


const manage_metadata = (
  data: XpathMap,      // intended to be cell.metadata
  action: Action,
  xpath: Xpath,
  value: any,
): any => {

  const { Get, Set, Unset, Insert, Remove, } = Action

  const recurse = (
    scanner: XpathMap,
    action: Action,
    xpath: string[],
    value: any,
  ): any => {

    // console.log(`in recurse with xpath=${xpath}`)

    if (xpath.length === 0) {
      switch (action) {
        case Get:
          return scanner
        default:
          return undefined
      }
    } else if (xpath.length === 1) {
      const [step] = xpath
      //
      switch (action) {
        case Get:
          return scanner[step]
        case Set:
          scanner[step] = value
          return value
        case Unset:
          if (step in scanner) {
            delete scanner[step]
            return true
          } else {
            return false
          }
        case Insert:
          // create list if needed
          if (!(step in scanner)) {
            scanner[step] = []
          }
          if (!(scanner[step] instanceof Array)) {
            return undefined
          }
          // insert if not already present
          {
            const list = scanner[step] as Array<string>
            if (list.indexOf(value) < 0) {
              list.push(value)
              return value
            } else {
              return undefined
            }
          }
        case Remove:
          if (!(scanner[step] instanceof Array)) {
            return undefined
          }
          const list = (scanner[step]) as string[]
          // list.pop(value) is not accepted by ts ?!?
          const index = list.indexOf(value)
          if (index >= 0) {
            list.splice(index, 1)
          }
          return value
      }
    } else {
      const [first, ...rest] = xpath
      if (first in scanner) {
        if (!(scanner[first] instanceof Object)) {
          return undefined
        } else {
          const next = scanner[first] as Record<string, any>
          return recurse(next, action, rest, value)
        }
      } else {
        switch (action) {
          case Get:
            return undefined
          case Set:
            scanner[first] = {}
            const next = scanner[first] as Record<string, any>
            return recurse(next, action, rest, value)
          case Unset:
            return undefined
          case Insert:
            if (rest.length === 0) {
              scanner[first] = []
              return recurse(scanner[first], action, rest, value)
            } else {
              scanner[first] = {}
              return recurse(scanner[first], action, rest, value)
            }
          case Remove:
            return undefined
        }
      }
    }
  }

  const xpath_list = normalize(xpath)

  return recurse(data, action, xpath_list, value)
}

export const xpath_get = (metadata: XpathMap, xpath: Xpath) =>
  manage_metadata(metadata, Action.Get, xpath, undefined)
export const xpath_set = (metadata: XpathMap, xpath: Xpath, value: any) =>
  manage_metadata(metadata, Action.Set, xpath, value)
export const xpath_unset = (metadata: XpathMap, xpath: Xpath) =>
  manage_metadata(metadata, Action.Unset, xpath, undefined)
export const xpath_insert = (metadata: XpathMap, xpath: Xpath, key: string) =>
  manage_metadata(metadata, Action.Insert, xpath, key)
export const xpath_remove = (metadata: XpathMap, xpath: Xpath, key: string) =>
  manage_metadata(metadata, Action.Remove, xpath, key)
