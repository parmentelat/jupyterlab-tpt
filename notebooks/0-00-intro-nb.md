---
jupytext:
  cell_metadata_filter: all,-hidden,-heading_collapsed,-run_control,-trusted
  notebook_metadata_filter: all, -jupytext.text_representation.jupytext_version, -jupytext.text_representation.format_version,
    -language_info.version, -language_info.codemirror_mode.version, -language_info.codemirror_mode,
    -language_info.file_extension, -language_info.mimetype, -toc
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
language_info:
  name: python
  nbconvert_exporter: python
  pygments_lexer: ipython3
nbhosting:
  title: introduction
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# introduction

we're testing the new **jlab4 / nb7** combo, together with the rendering under **jupyter-book** and try to make sure both outputs are consistent

```{code-cell} ipython3
# this is the required piece
#%pip show jupyterlab-myst jupyterlab-jupytext jupyterlab-courselevels
```

+++ {"tags": [], "jp-MarkdownHeadingCollapsed": true}

````{admonition} what we do in this series of sample notebooks
:class: important

summarize most of our notebook recipes, regarding among others

* regular admonitions, including collapsible (texts where some part is toggable with a right or down arrow)
  note that collapsible also applies to admonitions
* hide-input artefact (a code cell whose input code is hidden)
* miscell usual tricks (link to a downloadable file, iframe with some static html, ...)
* courselevels - mostly deprecated:
  * using tags to specifiy a level among basic=green, intermediate=blue, advanced=red
  * also the ability to put a frame around a cell
* mermaid: some inline (git)graphs using `mermaid.js`
````

+++ {"tags": []}

````{admonition} for what targets
:class: seealso

and check how that renders in the following contexts

* jupyter book output, which is now our primary output medium
* jlab4, with a cocktail of extensions, at least
  * `jupytext`, `jupyterlab-myst`, and more optionnally now, `jupyterlab-courselevels`
* notebook 7, although much less crucial at this point  
  note that nb7 runs on top of jlab4, so this is much less problematic than nb classic
````
