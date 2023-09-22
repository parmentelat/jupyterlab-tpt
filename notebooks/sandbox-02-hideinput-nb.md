---
celltoolbar: Edit Metadata
jupytext:
  cell_metadata_filter: all,-hidden,-heading_collapsed,-run_control,-trusted
  notebook_metadata_filter: all,-language_info,-toc,-jupytext.text_representation.jupytext_version,-jupytext.text_representation.format_version
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
  title: React apps basics
---

+++ {"slideshow": {"slide_type": "-"}}


Licence CC BY-NC-ND, Thierry Parmentelat

+++ {"tags": []}

# hide-input

```{code-cell} ipython3
from IPython.display import HTML
HTML(filename="_static/style.html")
```

+++ {"slideshow": {"slide_type": ""}, "tags": []}

this may require some more checking but IIRC the `jupyterlab-courselevels` may be required for this to work properly

+++ {"slideshow": {"slide_type": ""}, "tags": []}

## code cells

+++ {"slideshow": {"slide_type": ""}, "tags": []}

````{caution}
the next code cells are marked as

1. `metadata.tags` contains `hide-input`
1. and also `metadata.hide_input=true`  
  see below, this second setting is **only useful with nbclassic**
````

+++ {"slideshow": {"slide_type": ""}, "tags": []}

````{note}
* thanks to (1) the jb HTML output will come as a collapsible
* thanks to the `jupyterlab-courselevels` extension, with (1) the code cell input should be hidden in jupyterlab (and hopefully nb7 as well)
* because of (2) the cell input will not show under nbclassic  
  this requires the jupyter contrib extensions installed, and the hide-input extension enabled
````

+++ {"slideshow": {"slide_type": ""}, "tags": []}

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 2 hide-input cells below

```{code-cell} ipython3
---
hide_input: true
slideshow:
  slide_type: ''
tags: [hide-input]
---
# this text should be hidden
print("should show the output but not the code")
```

```{code-cell} ipython3
---
hide_input: true
slideshow:
  slide_type: ''
tags: [hide-input]
---
# this text should be hidden
print('and another hide-input cell')
```

↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ hide-input cells above

+++

## 2 visible cells, one text and one code

+++

with one markdown cell (this very one) and one code cell

```{code-cell} ipython3
---
editable: true
scrolled: true
slideshow:
  slide_type: ''
tags: []
---
# code (visible)
print("hello")
```

## same with hide-input

below we repeat these 2 cells, with hide-input set

+++ {"editable": true, "slideshow": {"slide_type": ""}, "tags": ["hide-input"], "hide_input": true}

a (hidden-input) markdown cell wont show up at all

```{code-cell} ipython3
---
editable: true
hide_input: true
scrolled: true
slideshow:
  slide_type: ''
tags: [hide-input]
---
# code (hidden-input) will just produce an output, but won't show up
print("hello")
```
