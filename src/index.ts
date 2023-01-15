import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

//import {ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import {ICommandPalette } from '@jupyterlab/apputils';

import {
   INotebookTracker, // NotebookPanel,
  // INotebookModel,
  // Notebook,
  // ICellModel,
} from '@jupyterlab/notebook';


/* function foo(cell: ICellModel) {
  console.log("in foo with cell = ", cell)
  cell 
} */

//import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab-tpt extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-tpt:plugin',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, tracker: INotebookTracker) => {
    console.log('JupyterLab extension jupyterlab-tpt is activated!');
    console.log('ICommandPalette', palette);

    const command: string = "MINE:fake-command"

    app.commands.addCommand(command, {
      label: 'dummy test',
      isEnabled: () => true,
      isVisible: () => true,
      iconClass: 'some-css-icon-class',
      execute: () => {
        console.log("in my fake command:", "app", app, "palette ", palette, "tracker", tracker)
        const panel /*: NotebookPanel*/ = tracker.currentWidget
        if (panel === null)
          return
        console.log("activeCell", tracker.activeCell)
        console.log("panel", panel)
        // 
      },
    })

    app.commands.addKeyBinding({
      command: command,
      args: {},
      keys: ['Ctrl 9'],
      selector: ".jp-Notebook",
    })

    palette.addItem( {command, category: 'Tuto'})
  }
};

export default plugin;
