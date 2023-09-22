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

# courselevels (mostly obso)

```{code-cell} ipython3
from IPython.display import HTML
HTML(filename="_static/style.html")
```

+++ {"slideshow": {"slide_type": ""}, "tags": []}

something we had in place before admonitions; 3 levels defined, + the framed cell business

mostly obsoleted; primarily, the myst -> html conversion process does not preserve cells
so the coloring/framing business in here:
- works fine in jlab for bot code and text
- but does not work in jbook for text, and that's probably for good...

might still make sense to use color markers on code cells that contain exercise that the students must fill...

+++ {"slideshow": {"slide_type": ""}, "tags": []}

## in code

+++ {"slideshow": {"slide_type": ""}, "tags": []}

code cells will work in both worlds (jlab + jbook)

```{code-cell} ipython3
---
slideshow:
  slide_type: ''
tags: [level_basic]
---
# a basic cell

def fact(n):
    if n <= 1:
        return 1
    else:
        return n * fact(n-1)
```

```{code-cell} ipython3
---
slideshow:
  slide_type: ''
tags: []
---
fact(10)
```

```{code-cell} ipython3
---
slideshow:
  slide_type: ''
tags: [level_intermediate]
---
# an intermediate cell

def fact(n):
    return 1 if n <= 1 else n * fact(n-1)
```

```{code-cell} ipython3
---
slideshow:
  slide_type: ''
tags: []
---
fact(10)
```

```{code-cell} ipython3
---
slideshow:
  slide_type: ''
tags: [level_advanced]
---
# an advanced cell

from functools import reduce
from operator import mul

def fact(n):
    return reduce(mul, range(1, n+1))
```

```{code-cell} ipython3
---
slideshow:
  slide_type: ''
tags: []
---
fact(10)
```

+++ {"slideshow": {"slide_type": ""}, "tags": []}

## text

unfortunately text cells is another matter entirely, as when producing markdown (intermediary step in jbook to produce html) the cell structure gets lost entirely

<https://github.com/orgs/executablebooks/discussions/1033#discussioncomment-6198957>

+++ {"tags": ["framed_cell"], "slideshow": {"slide_type": ""}}

### let's start with a framed cell

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_basic"], "slideshow": {"slide_type": ""}}

### basic text (^X)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_intermediate"]}

### intermediate text (^Y)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_advanced"]}

### advanced text (^Z)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_intermediate", "framed_cell"]}

### framed and colored (^M)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
