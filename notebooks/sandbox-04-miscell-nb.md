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

# miscell

```{code-cell} ipython3
from IPython.display import HTML
HTML(filename="_static/style.html")
```

## the MyST download role 

+++ {"tags": []}

mostly we use this to create a link to download an exercise as a zip -- 
heavily used in `flotpython-exos`

{download}`commencez par télécharger le zip<./downloadable.zip>`

+++

## youtube video & iframe

+++

````{admonition} do not use an html iframe tag
:class: error 

not working in jlab, and works in jupyter book only if the target is in `_static`

<iframe src="_static/addresses-final.html" width="100%" height="600px">
</iframe>

```{code-cell} ipython3
---
editable: true
slideshow:
  slide_type: ''
tags: []
---
# optionally set hide-input on this cell

from IPython.display import IFrame

# Youtube
IFrame(
    "https://www.youtube.com/embed/i_ZcP7iNw-U?rel=0&amp;controls=0&amp;showinfo=0",
    width="600",
    height="400",
    # extras='frameborder="0" allowfullscreen',
)
```

## local video & ipywidgets

for a local video:

```{code-cell} ipython3
# optionally set hide-input on this cell

from ipywidgets import Video
Video.from_file("_static/Push.mp4", autoplay=False)
```

## ipythontutor

```{code-cell} ipython3
%load_ext ipythontutor
```

```{code-cell} ipython3
%%ipythontutor

L1 = L2 = [1, 2, 3]
L1[1:2] = [100, 200, 300]
```

## nbautoeval

```{code-cell} ipython3
from exo_pgcd import exo_pgcd

exo_pgcd.example()
```

```{code-cell} ipython3
def pgcd(a, b):
    return b % a
```

```{code-cell} ipython3
exo_pgcd.correction(pgcd)
```

## equations and dollarmath

this requires extra config, search for `dollarmath`

same for latex-math inline $\forall x\in \mathbb{C}$ like this, or double-dollars like that

$$
\forall x\in \mathbb{C}
$$

+++

## strikethrough

mostly not yet available

this requires an extra config step ~~so that one can see text in strikethrough mode~~

not yet working with jupyterlab(-myst)
