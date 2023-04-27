/*
 * for attaching keybindings later on, see
 * https://towardsdatascience.com/how-to-customize-jupyterlab-keyboard-shortcuts-72321f73753d
 */

/* eslint-disable prettier/prettier */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application'

//import {ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { ICommandPalette } from '@jupyterlab/apputils'

import {
  INotebookTracker, // NotebookPanel, // INotebookModel,
  Notebook,
  NotebookActions,
} from '@jupyterlab/notebook'

import {
  CodeCell, // ICellModel, // ICodeCellModel
  MarkdownCell,
  Cell,
} from '@jupyterlab/cells'

//import { Widget } from '@lumino/widgets'

import {
  md_get, md_set, md_unset, md_insert, md_remove
} from './metadata'


/*
the logic of applying a function on a set of cells
if on_selected is false
  then to_apply is called on all cells in the notebook
if on_selected is true
  then to_apply is called on all selected cells, or the active cell
  if no multiple selection was made
 */
enum Scope {
  All,        // run on all cells
  Active,     // the active cell only
  Multiple,   // the multiple selected if that is the case, the active cell otherwise
}

const apply_on_cells = (
  notebookTracker: INotebookTracker,
  scope: Scope,
  to_apply: (cell: Cell) => void,
) => {
  const notebook = notebookTracker.currentWidget?.content
  if (notebook === undefined) { return }

  let actionCells
  if (scope === Scope.All) {
    actionCells = notebook.widgets.slice()
  } else {
    const activeCell = notebook.activeCell
    if (activeCell === null) { return }

    if (scope === Scope.Active) {
      actionCells = [activeCell]
    } else {
      const { anchor, head } = notebook.getContiguousSelection()
      // when only one cell is selected/active, both are null
      if (anchor === null || head === null) {
        actionCells = [activeCell]
      } else {
        actionCells = notebook.widgets.slice(anchor, head + 1)
      }
    }
  }
  // console.log(`apply_on_cells with scope=${scope} on ${actionCells.length} cells`)

  actionCells.forEach(to_apply)
}

/*
in order to have consistent behaviour between
classic notebook (with the hide-input extension enabled)
and jupyter book, we manage consistently
* the metadata.hide_input attribute
* the 'hide-input' tag
*/
const set_hide_input = (cell: Cell, hidden: boolean) => {
  if (hidden) {
    md_set(cell, 'hide_input', true)
    md_insert(cell, 'tags', 'hide-input')
  } else {
    md_unset(cell, 'hide_input')
    md_remove(cell, 'tags', 'hide-input')
  }
}


// this is specific to the web course, where we use a toolset with functions
// that have this in their name
const NEEDLE = 'tools.sample_from'

const set_hide_input_needle = (cell: Cell, hidden: boolean) => {
  // ignore text cells
  if (cell instanceof CodeCell) {
    // need to access the cell model
    const model = cell.model
    if (model.value.text.toLowerCase().indexOf(NEEDLE) !== -1) {
      set_hide_input(cell, hidden)
    }
  }
}

// use depth=0 to remove
const make_text_and_insert_section = (notebook: Notebook, depth: number) => {

  // console.log("make_text_and_insert_section", depth)
  NotebookActions.changeCellType(notebook, 'markdown')
  const activeCell = notebook?.activeCell
  if (activeCell === undefined) { return }
  const model = activeCell?.model
  if (model === undefined) { return }
  // remove starting #'s if any
  for (let i=4; i>0; i--) {
    model.value.text = model.value.text.replace('#'.repeat(i)+' ', '')
  }
  if (depth === 0) { return }
  model.value.text = `${'#'.repeat(depth)} ${model.value.text}`
}

/**
 * Initialization data for the jupyterlab-tpt extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-tpt:plugin',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, notebookTracker: INotebookTracker) => {
    console.log('JupyterLab extension jupyterlab-tpt is activating')
    // console.log('ICommandPalette', palette)
    // console.log('INotebookTracker', notebookTracker)

    // the addCommand would accept the following
    // isEnabled: () => true,
    // isVisible: () => true,
    // iconClass: 'some-css-icon-class',
    // also we could pass args to execute, but in the hide-input case
    // it does not work well as we need distinct labels depending on the args

    // https://lumino.readthedocs.io/en/1.x/api/commands/interfaces/commandregistry.ikeybindingoptions.html
    // The supported modifiers are: Accel, Alt, Cmd, Ctrl, and Shift. The Accel
    // modifier is translated to Cmd on Mac and Ctrl on all other platforms. The
    // Cmd modifier is ignored on non-Mac platforms.
    // Alt is option on mac

    let command


    command = 'convenience:hide-input'
    app.commands.addCommand(command, {
      label: 'hide input for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => set_hide_input(cell, true))
    })
    palette.addItem({command, category: 'Convenience'})
    app.commands.addKeyBinding({command, keys: ['Alt Cmd 9'], selector: '.jp-Notebook'})

    command = 'show-input'
    app.commands.addCommand(command, {
      label: 'show input for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => set_hide_input(cell, false))
    })
    palette.addItem({command, category: 'Convenience'})
    app.commands.addKeyBinding({command, keys: ['Ctrl Alt 9'],  selector: '.jp-Notebook'})



    command = 'convenience:hide-input-all-samples'
    app.commands.addCommand(command, {
      label: `hide input for all code cells that contain ${NEEDLE}`,
      execute: () => apply_on_cells(notebookTracker, Scope.All, (cell) => set_hide_input_needle(cell, true))
    })
    palette.addItem({command, category: 'Convenience'})
    app.commands.addKeyBinding({command, keys: ['Alt Cmd 8'], selector: '.jp-Notebook'})

    command = 'convenience:show-input-all-samples'
    app.commands.addCommand(command, {
      label: `show input for all code cells that contain ${NEEDLE}`,
      execute: () => apply_on_cells(notebookTracker, Scope.All, (cell) => set_hide_input_needle(cell, false))
    })
    palette.addItem({command, category: 'Convenience'})
    app.commands.addKeyBinding({command, keys: ['Ctrl Alt 8'], selector: '.jp-Notebook'})


    // Ctrl-0 to Ctrl-4 to set markdown sections
    for (let depth=0; depth < 5; depth++) {

      command = `convenience:section-level-${depth}`
      app.commands.addCommand(command, {
        label: `active cell becomes section level ${depth}`,
        execute: () => {
          const notebook = notebookTracker.currentWidget?.content
          if (notebook === undefined) { return }
          make_text_and_insert_section(notebook, depth)
        }
      })
      palette.addItem({command, category: 'Convenience'})
      app.commands.addKeyBinding({command, keys: [`Ctrl ${depth}`], selector: '.jp-Notebook'})
    }

    // render-all-cells - unrender-all-cells (markdown actually)

    const unrender_markdown = (cell: Cell) => {
      if (cell.model.type !== 'markdown') { return }
      (cell as MarkdownCell).rendered = false
    }
    command = 'notebook:unrender-all-markdown'
    app.commands.addCommand(command, {
      label: 'unrender all markdown cells',
      execute: () => apply_on_cells(notebookTracker, Scope.All, unrender_markdown)
    })
    palette.addItem({command, category: 'Convenience'})
    // control-e means end of ine if in edit mode
    app.commands.addKeyBinding({command, keys: ['Ctrl E'], selector: '.jp-Notebook.jp-mod-commandMode'})

    app.commands.addKeyBinding({command: 'notebook:render-all-markdown', keys: ['Ctrl W'], selector: '.jp-Notebook'})

    // this is actually lowercase u and d, would need an explicit Shift otherwise
    app.commands.addKeyBinding({command: 'notebook:move-cell-up', keys: ['U'], selector: '.jp-Notebook.jp-mod-commandMode'})
    app.commands.addKeyBinding({command: 'notebook:move-cell-down', keys: ['D'], selector: '.jp-Notebook.jp-mod-commandMode'})


    notebookTracker.widgetAdded.connect((tracker, panel) => {
      const notebookModel = panel.content.model
      if (notebookModel === null) {
        return
      }
      notebookModel.cells.changed.connect((cellList, change) => {
        if (change.type !== 'add') {
          return
        }
        console.log('we have a new cell')
        const newCellModel = change.newValues[0]
        console.log(newCellModel, cellList.length)
        // looks like maybe with 4.0 we'll be able to do something like this
        // newCellModel.metadataChanged.connect((...args: any) => {
        //     console.log('metadata changed', args)
        // })
        // but for now we'll go with something much simpler so that students
        // who are not expected to mess with the colors themselves, will see the colors
        for (const tag of md_get(newCellModel, 'tags', [])) {
          console.log(`found metadata tag ${tag}`)
          // on a full-fledged Cell instance we could do cell.addClass() (or hasClass....)
          // but here ew have a CellModel and for now I can't find my way back to the Cell instance
        }
      })
    })

  }
}

export default plugin
