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

/* function foo(cell: ICellModel) {
  console.log("in foo with cell = ", cell)
  cell
} */

//import { Widget } from '@lumino/widgets';

const set_hide_input = (cell: Cell, value: boolean) => {
  const metadata = cell.model.metadata
  metadata.set("hide_input", value)
  let tags = [] as Array<string>
  if (metadata.has('tags')) {
    tags = metadata.get('tags') as Array<string>
    if (!tags)
      tags = []
  }
  // set if not already
  if (value && (!tags.includes('hide-input')))
    tags.push('hide-input')
  // unset if currently set
  else if (!value && (tags.includes('hide-input')))
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

    const command: string = "MINE:fake-command"

    app.commands.addCommand(command, {
      label: 'dummy test',
      isEnabled: () => true,
      isVisible: () => true,
      iconClass: 'some-css-icon-class',
      execute: (args: any) => {
        console.log(`in my fake command: args=`, args)
        const { value } = args
        const panel /*: NotebookPanel*/ = notebookTracker.currentWidget
        // console.log("panel", panel)
        if (panel === null)
          return
        // active cell
        const activeCell = notebookTracker.activeCell
        if (activeCell === null)
          return
        const notebook = panel.content
        const { anchor, head } = notebook.getContiguousSelection()
        let actionCells
        if (anchor === null || head === null)
          actionCells = [activeCell]
        else
          actionCells = notebook.widgets.slice(anchor, head + 1)
        console.log(`applying set_hide_input (${value}) to ${actionCells.length} cells`)
        actionCells.forEach( (cell) => set_hide_input(cell, value))
      }
    })

    app.commands.addKeyBinding({
      command: command,
      args: {value: true},
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
