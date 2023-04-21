/* eslint-disable no-case-declarations */
/* eslint-disable prettier/prettier */

// helpers to manage a cell's metadata
export enum MetadataAction {
  Get,      // get the metadata at that xpath
  Set,      // set the metadata at that xpath
  Unset,    // undo the set operation
  Insert,   // insert the value inside that xpath (should point to a list)
  Remove,   // undo insert
}

type Metadata = Record<string, any>
type Xpath = string | string[]

const manage_metadata = (
  data: Metadata,      // intended to be cell.metadata
  action: MetadataAction,
  xpath: Xpath,
  value: any,
): any => {

  const { Get, Set, Unset, Insert, Remove, } = MetadataAction

  const recurse = (
    scanner: Metadata,
    action: MetadataAction,
    xpath: string[],
    value: any,
  ): any => {

    // console.log(`in recurse with xpath=${xpath}`)

    if (xpath.length === 1) {
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
          const list = scanner[step] as Array<string>
          if (list.indexOf(value) < 0) {
            list.push(value)
            return value
          } else {
            return undefined
          }
        case Remove:
          if (scanner[step] instanceof Array) {
            const list = (scanner[step]) as string[]
            // list.pop(value) is not accepted by ts ?!?
            const index = list.indexOf(value)
            if (index >= 0) {
              list.splice(index, 1)
            }
            return value
          } else {
            return undefined
          }
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

  if (typeof xpath === 'string') {
    const string = xpath as string
    xpath = string.split('.')
  }
  const xpath_list = xpath as Array<string>

  return recurse(data, action, xpath_list, value)
}

export const xpath_get = (metadata: Metadata, xpath: Xpath) =>
  manage_metadata(metadata, MetadataAction.Get, xpath, undefined)
export const xpath_set = (metadata: Metadata, xpath: Xpath, value: any) =>
  manage_metadata(metadata, MetadataAction.Set, xpath, value)
export const xpath_unset = (metadata: Metadata, xpath: Xpath) =>
  manage_metadata(metadata, MetadataAction.Unset, xpath, undefined)
export const xpath_insert = (metadata: Metadata, xpath: Xpath, key: string) =>
  manage_metadata(metadata, MetadataAction.Insert, xpath, key)
export const xpath_remove = (metadata: Metadata, xpath: Xpath, key: string) =>
  manage_metadata(metadata, MetadataAction.Remove, xpath, key)
