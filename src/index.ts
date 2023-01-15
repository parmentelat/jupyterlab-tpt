import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

//import {ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import {ICommandPalette } from '@jupyterlab/apputils';

/* import {
  see https://github.com/jupyterlab/jupyterlab/issues/2872
  INotebookModel,
  // INotebookTracker,
  // Notebook,
  // NotebookPanel
} from '@jupyterlab/notebook';
 */

//import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab-tpt extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-tpt:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab-tpt is activated!');
    console.log('ICommandPalette', palette);

    const command: string = "MINE:fake-command"

    app.commands.addCommand(command, {
      label: 'dummy test',
      isEnabled: () => true,
      isVisible: () => true,
      iconClass: 'some-css-icon-class',
      execute: () => {
        console.log("in my fake command")
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
