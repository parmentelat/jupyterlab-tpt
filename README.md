# jupyterlab_tpt

[![Github Actions Status](https://github.com/parmentelat/jupyterlab-tpt/workflows/Build/badge.svg)](https://github.com/parmentelat/jupyterlab-tpt/actions/workflows/build.yml)
My custom tweaks for using JLAB

## Requirements

- JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_tpt
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_tpt
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_tpt directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_tpt
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-tpt` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)

# My notes

* on using signals
  <https://github.com/jupyterlab/extension-examples/tree/master/signals>

* a very useful example of arming callbacks on changes
  // https://discourse.jupyter.org/t/how-to-get-output-model-for-a-given-cell-in-a-jupyterlab-extension/11342/6

* waiting for a notebook context to be ready
  ```js
  notebookContext: DocumentRegistry.IContext<INotebookModel>
  notebookContext.ready.then(() => {
    /*
     * The order of operations here is key. First, create a model that contains a log of
     * executed cells and the state of the gather UI.
     */
    let notebookModel = notebookContext.model;
    ...
  })
  ```
