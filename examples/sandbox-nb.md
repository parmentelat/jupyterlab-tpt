---
celltoolbar: Edit Metadata
jupytext:
  cell_metadata_filter: all,-hidden,-heading_collapsed,-run_control,-trusted
  formats: md:myst
  notebook_metadata_filter: all,-language_info,-toc,-jupytext.text_representation.jupytext_version,-jupytext.text_representation.format_version
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
nbhosting:
  title: React apps basics
rise:
  autolaunch: true
  slideNumber: c/t
  start_slideshow_at: selected
  theme: sky
  transition: cube
---

+++ {"slideshow": {"slide_type": "-"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# purpose

playing with the various ways to implement:

* regular admonitions
* hide-input artefact (a code cell whose input code is hidden)
* collapsible (texts where some part is toggable with a right or down arrow)
  note that collapsible also applies to admonitions
* course levels:
  * using tags to specifiy a level among basic=green, intermediate=blue, advanced=red
  * also the ability to put a frame around a cell

and hopefully all this should work in the following contexts

* jupyter book output, which is now our primary output medium
* classic notebook, which although it is almost deprecated, remains our main editing tool
* jlab, but apparently this is mostly a hopeless goal

+++ {"tags": ["framed_cell"]}

## references

* jbook: <https://jupyterbook.org/en/stable/interactive/hiding.html>
* myst: <https://myst-tools.org/docs/spec/admonitions>

+++

## admonitions

```{code-cell} ipython3
# this is the required piece
%pip show jupyterlab-myst
```

```{admonition} without the dropdown class
this is a regular *admonition* with a custom title  
not sure how to change the color then
```

+++

```{tip} 
1/10 Let's give readers a helpful hint! - this one uses ```
```

+++

:::{note}
2/10 note: you can use either ``` or :::
:::

+++

```{attention}
3/10 let us try this
```

+++

```{caution}
4/10 let us try this
```

+++

```{danger}
5/10 let us try this
```

+++

```{error}
6/10 let us try this
```

+++

```{hint}
7/10 let us try this
```

+++

```{important}
8/10 let us try this
```

+++

```{seealso}
9/10 let us try this
```

+++

```{warning}
10/10 let us try this
```

+++

## hide-input

+++

### code cells

the next code cell is marked as

1. `metadata.hide_input=true`
1. and metadata.tags contains 'hide-input'

* because of (1) the cell input will not show under nbclassic  
  this requires the jupyter contrib extensions installed, and the hide-input extension enabled
* thanks to (2) the jb HTML output will come as a collapsible
* however under jupyter lab **the code cell input is still visible**

+++

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 2 hide-input cells below

```{code-cell} ipython3
---
editable: true
hide_input: true
slideshow:
  slide_type: ''
tags: [hide-input]
---
# this text whould be hidden
print("should show the output but not the code")
```

```{code-cell} ipython3
:hide_input: true
:tags: [hide-input]

print('and another hide-input cell')
```

↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ hide-input cells above

+++

## collapsable

+++ {"editable": true, "slideshow": {"slide_type": ""}, "tags": []}

here is an simple untagged admonition with the `dropdown` class:

```{admonition} Click the button to reveal!
:class: dropdown
Some hidden toggle content!
```

+++

:::{danger} with class dropdown
:class: dropdown
note: you can use either ``` or :::
:::

+++

### using raw HTML

+++

it should also be possible to do this using plain HTML with a `details` tag

<details>
<summary>the visible part</summary>

and the rest of the message is just mentioned directly in the &lt;details&gt; tag
</details>

however apparently this requires extra configuration ?

+++

## course levels

+++

### code

```{code-cell} ipython3
:tags: [level_basic]

# a basic cell

def fact(n):
    if n <= 1:
        return 1
    else:
        return n * fact(n-1)
```

```{code-cell} ipython3
fact(10)
```

```{code-cell} ipython3
:tags: [level_intermediate]

# an intermediate cell

def fact(n):
    return 1 if n <= 1 else n * fact(n-1)
```

```{code-cell} ipython3
fact(10)
```

```{code-cell} ipython3
:tags: [level_advanced]

# an advanced cell

from functools import reduce
from operator import mul

def fact(n):
    return reduce(mul, range(1, n+1))
```

```{code-cell} ipython3
fact(10)
```

### text

+++ {"tags": ["framed_cell"]}

#### let's start with a framed cell

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_basic"]}

#### basic text (^X)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_intermediate"]}

#### intermediate text (^Y)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_advanced"]}

#### advanced text (^M)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_intermediate", "framed_cell"]}

#### framed and colored (^M)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": []}

***
