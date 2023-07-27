/*
 * for attaching keybindings later on, see
 * https://towardsdatascience.com/how-to-customize-jupyterlab-keyboard-shortcuts-72321f73753d
 */

/* eslint-disable prettier/prettier */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application'

import { ICommandPalette } from '@jupyterlab/apputils'

import {
  INotebookTracker,
  Notebook,
  NotebookActions,
} from '@jupyterlab/notebook'

import {
  CodeCell,
  MarkdownCell,
  Cell,
} from '@jupyterlab/cells'

// md_clean may be broken
import { md_get, md_set, md_unset, md_insert, md_remove } from 'jupyterlab-celltagsclasses'

import { Scope, apply_on_cells } from 'jupyterlab-celltagsclasses'

/*
in order to have consistent behaviour between
classic notebook (with the hide-input extension enabled)
and jupyter book, we manage consistently
* the metadata.hide_input attribute
* the 'hide-input' tag
*/
const _set_hide = (cell: Cell, hidden: boolean, input_output: string) => {
  if (hidden) {
    md_set(cell, `hide_${input_output}`, true)
    md_insert(cell, 'tags', `hide-${input_output}`)
  } else {
    md_unset(cell, `hide_${input_output}`)
    md_remove(cell, 'tags', `hide-${input_output}`)
  }
}
const _toggle_hide = (cell: Cell, input_output: string) => {
  if (md_get(cell, `tags.hide-${input_output}`)) {
    _set_hide(cell, false, input_output)
  } else {
    _set_hide(cell, true, input_output)
  }
}

const set_hide_input = (cell: Cell, hidden: boolean) => _set_hide(cell, hidden, 'input')
const set_hide_output = (cell: Cell, hidden: boolean) => _set_hide(cell, hidden, 'output')
const toggle_hide_input = (cell: Cell) => _toggle_hide(cell, 'input')
const toggle_hide_output = (cell: Cell) => _toggle_hide(cell, 'output')


// this is specific to the web course, where we use a toolset with functions
// that have this in their name
const NEEDLE = 'tools.sample_from'

const set_hide_input_needle = (cell: Cell, hidden: boolean) => {
  // ignore text cells
  if (cell instanceof CodeCell) {
    // need to access the cell model
    const model = cell.model
    if (model.sharedModel.getSource().toLowerCase().indexOf(NEEDLE) !== -1) {
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
  for (let i = 4; i > 0; i--) {
    model.sharedModel.setSource(model.sharedModel.getSource().replace('#'.repeat(i) + ' ', ''))
  }
  if (depth === 0) { return }
  model.sharedModel.setSource(`${'#'.repeat(depth)} ${model.sharedModel.getSource()}`)
}

const clean_cell_metadata = (cell: Cell) => {
  console.log("Cleaning metadata for cell", cell)
  const editable = cell.model.getMetadata('editable')
  if (editable === true) {
    md_unset(cell, 'editable')
  }
  const tags = cell.model.getMetadata('tags')
  if (tags?.length === 0) {
    md_unset(cell, 'tags')
  }
  const slide_type = md_get(cell, 'slideshow.slide_type')
  if (slide_type === '') {
    md_unset(cell, 'slideshow.slide_type')
  }
  const slideshow = md_get(cell, 'slideshow')
  if ((slideshow !== undefined) && (JSON.stringify(slideshow) == '{}')) {
    md_unset(cell, 'slideshow')
  }
  const user_expressions = md_get(cell, 'user_expressions')
  if (user_expressions?.length === 0) {
    md_unset(cell, 'user_expressions')
  }
}


/**
 * Initialization data for the jupyterlab-tpt extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-tpt:plugin',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, notebookTracker: INotebookTracker) => {
    console.log('extension jupyterlab-tpt is activating')
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

    // Option-Command-9 = toggle (hide-input) on all selected cells
    // Ctrl-Alt-9 = show (wrt hide-input) on all selected cells
    command = 'convenience:hide-input'
    app.commands.addCommand(command, {
      label: 'hide input for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => set_hide_input(cell, true))
    })
    palette.addItem({ command, category: 'Convenience' })

    command = 'convenience:show-input'
    app.commands.addCommand(command, {
      label: 'show input for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => set_hide_input(cell, false))
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Ctrl Alt 9'], selector: '.jp-Notebook' })

    command = 'convenience:toggle-show-input'
    app.commands.addCommand(command, {
      label: 'toggle show input for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => toggle_hide_input(cell))
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Alt Cmd 9'], selector: '.jp-Notebook' })

    command = 'convenience:hide-output'
    app.commands.addCommand(command, {
      label: 'hide output for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => set_hide_output(cell, true))
    })
    palette.addItem({ command, category: 'Convenience' })

    command = 'convenience:show-output'
    app.commands.addCommand(command, {
      label: 'show output for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => set_hide_output(cell, false))
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Ctrl Alt 0'], selector: '.jp-Notebook' })

    command = 'convenience:toggle-show-output'
    app.commands.addCommand(command, {
      label: 'toggle show output for all selected cells',
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, (cell) => toggle_hide_output(cell))
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Alt Cmd 0'], selector: '.jp-Notebook' })


    command = 'convenience:hide-input-all-samples'
    app.commands.addCommand(command, {
      label: `hide input for all code cells that contain ${NEEDLE}`,
      execute: () => apply_on_cells(notebookTracker, Scope.All, (cell) => set_hide_input_needle(cell, true))
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Alt Cmd 8'], selector: '.jp-Notebook' })

    command = 'convenience:show-input-all-samples'
    app.commands.addCommand(command, {
      label: `show input for all code cells that contain ${NEEDLE}`,
      execute: () => apply_on_cells(notebookTracker, Scope.All, (cell) => set_hide_input_needle(cell, false))
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Ctrl Alt 8'], selector: '.jp-Notebook' })


    command = 'convenience:metadata-clean-selected'
    app.commands.addCommand(command, {
      label: `clean metadata for all selected cells`,
      execute: () => apply_on_cells(notebookTracker, Scope.Multiple, clean_cell_metadata)
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Alt Cmd 7'], selector: '.jp-Notebook' })


    command = 'convenience:metadata-clean-all'
    app.commands.addCommand(command, {
      label: `clean metadata for all cells`,
      execute: () => apply_on_cells(notebookTracker, Scope.All, clean_cell_metadata)
    })
    palette.addItem({ command, category: 'Convenience' })
    app.commands.addKeyBinding({ command, keys: ['Ctrl Alt 7'], selector: '.jp-Notebook' })


    // Ctrl-0 to Ctrl-4 to set markdown sections
    for (let depth = 0; depth < 5; depth++) {

      command = `convenience:section-level-${depth}`
      app.commands.addCommand(command, {
        label: `active cell becomes section level ${depth}`,
        execute: () => {
          const notebook = notebookTracker.currentWidget?.content
          if (notebook === undefined) { return }
          make_text_and_insert_section(notebook, depth)
        }
      })
      palette.addItem({ command, category: 'Convenience' })
      app.commands.addKeyBinding({ command, keys: [`Ctrl ${depth}`], selector: '.jp-Notebook' })
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
    palette.addItem({ command, category: 'Convenience' })
    // control-e means end of ine if in edit mode
    app.commands.addKeyBinding({ command, keys: ['Ctrl E'], selector: '.jp-Notebook.jp-mod-commandMode' })

    app.commands.addKeyBinding({ command: 'notebook:render-all-markdown', keys: ['Ctrl W'], selector: '.jp-Notebook' })

    // this is actually lowercase u and d, would need an explicit Shift otherwise
    app.commands.addKeyBinding({ command: 'notebook:move-cell-up', keys: ['U'], selector: '.jp-Notebook.jp-mod-commandMode' })
    app.commands.addKeyBinding({ command: 'notebook:move-cell-down', keys: ['D'], selector: '.jp-Notebook.jp-mod-commandMode' })

  }
}

export default plugin
