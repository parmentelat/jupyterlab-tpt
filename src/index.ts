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

////
const apply_on_selected_or_active_cells = (
  notebookTracker: INotebookTracker,
  to_apply: (cell: Cell) => void,
) => {
  const panel = notebookTracker.currentWidget
  // please typescript
  if (panel === null)
    return
  const activeCell = notebookTracker.activeCell
  // please typescript
  if (activeCell === null)
    return
  const notebook = panel.content
  const { anchor, head } = notebook.getContiguousSelection()
  let actionCells
  // when only one cell is selected/active, both are null
  if (anchor === null || head === null)
    actionCells = [activeCell]
  else
    actionCells = notebook.widgets.slice(anchor, head + 1)
  actionCells.forEach(to_apply)
}


const set_hide_input = (cell: Cell, hidden: boolean) => {
  const metadata = cell.model.metadata
  metadata.set("hide_input", hidden)
  let tags = [] as Array<string>
  if (metadata.has('tags')) {
    tags = metadata.get('tags') as Array<string>
    if (!tags)
      tags = []
  }
  // set if not already
  if (hidden && (!tags.includes('hide-input')))
    tags.push('hide-input')
  // unset if currently set
  else if (!hidden && (tags.includes('hide-input')))
    tags = tags.filter((item) => item != "hide-input")
  console.log('setting new tags', tags)
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
    console.log('JupyterLab extension jupyterlab-tpt is activated !')
    console.log('ICommandPalette', palette)
    console.log('INotebookTracker', notebookTracker)

    const command: string = "set-hide-input"

    app.commands.addCommand(command, {
      label: 'dummy test',
      isEnabled: () => true,
      isVisible: () => true,
      iconClass: 'some-css-icon-class',
      execute: (args: any) => {
        const { hidden } = args
        apply_on_selected_or_active_cells(notebookTracker,
          (cell) => set_hide_input(cell, hidden))
      }
    })

    app.commands.addKeyBinding({
      command: command,
      args: {hidden: true},
      keys: ['Ctrl 9'],
      selector: ".jp-Notebook",
    })

    palette.addItem({ command, category: 'Tuto' })

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
