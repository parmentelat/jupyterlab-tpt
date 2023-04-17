/* eslint-disable prettier/prettier */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

//import {ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { ICommandPalette } from '@jupyterlab/apputils';

import {
  INotebookTracker, // NotebookPanel,
  // INotebookModel,
  // Notebook,
  // ICellModel,
} from '@jupyterlab/notebook';

import {
  CodeCellModel,
  // ICellModel,
  // ICodeCellModel
  Cell,
} from "@jupyterlab/cells";

//import { Widget } from '@lumino/widgets';


/*
the logic of applying a function on all selected cells if relevant
or the active cell otherwise
 */
const apply_on_selected_or_active_cells = (
  notebookTracker: INotebookTracker,
  to_apply: (cell: Cell) => void,
) => {
  const panel = notebookTracker.currentWidget
  // please typescript
  if (panel === null) { return }
  const activeCell = notebookTracker.activeCell
  // please typescript
  if (activeCell === null) { return }
  const notebook = panel.content
  const { anchor, head } = notebook.getContiguousSelection()
  let actionCells
  // when only one cell is selected/active, both are null
  if (anchor === null || head === null) {
    actionCells = [activeCell]
  } else {
    actionCells = notebook.widgets.slice(anchor, head + 1)
  }
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
  const metadata = cell.model.metadata
  metadata.set('hide_input', hidden)
  let tags = [] as Array<string>
  if (metadata.has('tags')) {
    tags = metadata.get('tags') as Array<string>
    if (!tags) {
      tags = []
    }
  }
  if (hidden && (!tags.includes('hide-input'))) {
    // set if not already
    tags.push('hide-input')
  } else if (!hidden && (tags.includes('hide-input'))) {
    // unset if currently set
    tags = tags.filter((item) => item != 'hide-input')
  } else {
    // otherwise, nothing to do
    return
  }
  // console.log('setting new tags', tags)
  metadata.set('tags', tags)
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

    let command

    command = 'hide-input'
    app.commands.addCommand(command, {
      label: command,
      execute: () => apply_on_selected_or_active_cells(notebookTracker, (cell) => set_hide_input(cell, true))
    })
    app.commands.addKeyBinding({command, keys: ['Accel Alt 9'], selector: ".jp-Notebook"})
    palette.addItem({command, category: 'Convenience'})

    command = 'show-input'
    app.commands.addCommand(command, {
      label: command,
      execute: () => apply_on_selected_or_active_cells(notebookTracker, (cell) => set_hide_input(cell, false))
    })
    app.commands.addKeyBinding({command, keys: ['Alt Ctrl 9'],  selector: ".jp-Notebook"})
    palette.addItem({command, category: 'Convenience'})


    // command = 'all-samples-hide-input'
    // app.commands.addCommand(command, {
    //   label: command,
    //   execute: () => set_all_samples_hide_input(notebookTracker, true)
    // })
    // app.commands.addKeyBinding({command, keys: ['Accel Alt 8'], selector: ".jp-Notebook"})
    // palette.addItem({command, category: 'Convenience'})



    notebookTracker.widgetAdded.connect((tracker, panel) => {
      const notebook = panel.content
      const notebookModel = notebook.model
      if (notebookModel === null) { return }
      notebookModel.cells.changed.connect((_, change) => {
        console.log('changed!', change)
        if (change.type == 'remove') { return }
        if (change.type == 'add') {
          const newCell = change.newValues[0]
          const isCode = newCell instanceof CodeCellModel
          console.log("added", newCell, 'code cell', isCode)

        }

      })
    })
  }
};

export default plugin;
