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
rise:
  autolaunch: true
  slideNumber: c/t
  start_slideshow_at: selected
  theme: sky
  transition: cube
---

+++ {"slideshow": {"slide_type": "-"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++ {"tags": []}

# sandbox

+++ {"tags": []}

````{attention} ### what
summarize most of our notebook recipes, 

* regular admonitions
* hide-input artefact (a code cell whose input code is hidden)
* collapsible (texts where some part is toggable with a right or down arrow)
  note that collapsible also applies to admonitions
* course levels:
  * using tags to specifiy a level among basic=green, intermediate=blue, advanced=red
  * also the ability to put a frame around a cell
* miscell usual tricks (link to a downloadable file, iframe with some static html, ...)
* mermaid: some inline (git)graphs using `mermaid.js`
````

+++ {"tags": []}

````{seealso} targets

and check how that renders in the following contexts

* jupyter book output, which is now our primary output medium
* jlab4, with a cocktail of extensions, at least
  * jupytext, myst, courselevels
* notebook 7, which as of 2023 June is about to get released 
* there was also nbclassic, but it's getting deprecated so..
````

```{code-cell} ipython3
# this is the required piece
#%pip show jupyterlab-myst jupyterlab-jupytext jupyterlab-courselevels
```

## admonitions

+++

```{attention}
without the dropdown class
this is a regular *admonition* with a custom title  
any of the types below accept a superseded title
```

+++

````{tip} 
Let's give readers a helpful `tip` - this one uses quadruple ```` like this
```
    ````{tip}
    a tip
    ````
```
````

+++

````{hint} my title
this is a `hint` admonition with an overridden title
```
    ````{hint} my title
    some text
    ````
```
````

+++

````{seealso}
let us try `seealso`
````

+++

````{note}
this is a `note`
```
:::{note}
this would work too
:::
```
````

+++

````{important}
let us try `important`
````

+++

````{admonition} This requires an ad hoc title
let us try `admonition`
````

+++

````{attention} my title
this is an `attention` admonition with an overridden title
```
    ````{attention} my title
    some text
    ````
```
````

+++

````{caution}
let us try `caution`
````

+++

````{warning}
let us try `warning`
````

+++

````{danger}
let us try `danger`
````

+++

````{error}
let us try `error`
````

+++

## hide-input

+++ {"slideshow": {"slide_type": ""}, "tags": []}

### code cells

+++ {"slideshow": {"slide_type": ""}, "tags": []}

````{caution}
the next code cell is marked as

1. `metadata.tags` contains `hide-input`
1. and also `metadata.hide_input=true`  
  see below, this second setting is not useful unless you aim at nbclassic
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

## collapsable

+++ {"slideshow": {"slide_type": ""}, "tags": []}

here is an simple untagged admonition with the `dropdown` class:

````{admonition} Click the button to reveal!
:class: dropdown
Some hidden collapsible content !
```
    ```{admonition} click me
    :class: dropdown
    the text to be hidden
    ```
````

+++ {"slideshow": {"slide_type": ""}, "tags": []}

### using raw HTML

+++

it should also be possible to do this using plain HTML with a `details` tag

<details>
<summary>the visible part</summary>

and the rest of the message is just mentioned directly in the &lt;details&gt; tag
</details>

however apparently this requires extra configuration ?

+++ {"slideshow": {"slide_type": ""}, "tags": []}

## course levels

+++ {"slideshow": {"slide_type": ""}, "tags": []}

somthing we had in place before admonitions; 3 levels defined, + the framed cell business

(in the mix, it comes with css support for the `hide-input` cell tag, tested above)

+++ {"slideshow": {"slide_type": ""}, "tags": []}

### code

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

### text

unfortunately text cells is another matter entirely, as when producing markdown (intermediary step in jbook to produce html) the cell structure gets lost entirely

<https://github.com/orgs/executablebooks/discussions/1033#discussioncomment-6198957>

+++ {"tags": ["framed_cell"], "slideshow": {"slide_type": ""}}

#### let's start with a framed cell

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_basic"], "slideshow": {"slide_type": ""}}

#### basic text (^X)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_intermediate"]}

#### intermediate text (^Y)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_advanced"]}

#### advanced text (^Z)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++ {"tags": ["level_intermediate", "framed_cell"]}

#### framed and colored (^M)

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

+++

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

## miscell

+++

### dollarmath

same for latex-math inline $\forall x\in \mathbb{C}$ like this, or double-dollars like that

$$
\forall x\in \mathbb{C}
$$

+++

### strikethrough

this requires an extra config step ~~so that one can see text in strikethrough mode~~

not yet working with jupyterlab(-myst)

+++

### download links

+++ {"tags": []}

#### MyST download role

mostly we use this to create a link to download an exercise as a zip

```{error} BEWARE
this works in the jupyter book output only at this point
```

 {download}`commencez par télécharger le zip<./downloadable.zip>`

+++

#### regular html link

instead we could try and use a regular `<a>` tag; 
it remains to check however if that is going to play well with jupyter-book though


avec la construction standard markdown pour les liens `[]()`: [commencez par télécharger le zip](./dowloadable.zip)

---
le tag html `<a>` marche vraiment très mal: <a href="./downloadable.zip">commencez par télécharger le zip</a>

+++

### iframe

#### html tag

not working in jlab, and works in jupyter book only if the target is in `_static`

<iframe src="_static/addresses-final.html" width="100%" height="600px">
</iframe>

+++

### matplotlib

```{code-cell} ipython3
import numpy as np

X = np.linspace(-10, 10)
Y = X ** 2
```

```{code-cell} ipython3
import matplotlib.pyplot as plt
#%matplotlib notebook
#%matplotlib widget
%matplotlib ipympl
```

```{code-cell} ipython3
plt.figure()
plt.plot(X, Y);
```

+++ {"tags": ["framed_cell"]}

## references

* jbook: <https://jupyterbook.org/en/stable/interactive/hiding.html>
* myst: <https://myst-tools.org/docs/spec/admonitions>

+++

## mermaid

+++

un graphe simplissime

```{mermaid}
graph LR
  a --> b
```

+++

un graph a little more complex

```{mermaid}
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```

+++

### a plausible git scenario

`git commit`

```{mermaid}
gitGraph
    commit id: "A" type: HIGHLIGHT
```

+++

`git commit`

```{mermaid}
gitGraph
    commit id: "A"
    commit id: "B" type: HIGHLIGHT
```

+++

`git commit`

```{mermaid}
gitGraph
    commit id: "A"
    commit id: "B"
    commit id: "C" type: HIGHLIGHT
```

+++ {"tags": []}

`git switch -c devel A`

```{mermaid}
gitGraph
    commit id: "A" type: HIGHLIGHT
    branch devel
    checkout main
    commit id: "B"
    commit id: "C"
    checkout devel
```

```{note}
`git switch -c devel A` is a shortcut for

* `git branch devel A` (create branch `devel` at commit `A`)
* `git switch devel`   (teleport to branch `devel`)
```

+++ {"tags": []}

`git commit`

```{mermaid}
gitGraph
    commit id: "A"
    branch devel
    checkout main
    commit id: "B"
    commit id: "C"
    checkout devel
    commit id: "D" type: HIGHLIGHT
```

+++ {"tags": []}

`git commit`

```{mermaid}
gitGraph
    commit id: "A"
    branch devel
    checkout main
    commit id: "B"
    commit id: "C"
    checkout devel
    commit id: "D"
    commit id: "E" type: HIGHLIGHT
```

+++ {"tags": []}

`git merge main`

```{mermaid}
gitGraph
    commit id: "A"
    branch devel
    checkout main
    commit id: "B"
    commit id: "C"
    checkout devel
    commit id: "D"
    commit id: "E"
    merge main id: "F" type: HIGHLIGHT
```

+++ {"tags": []}

`git switch main`

```{mermaid}
gitGraph
    commit id: "A"
    branch devel
    checkout main
    commit id: "B"
    commit id: "C" type: HIGHLIGHT
    checkout devel
    commit id: "D"
    commit id: "E"
    merge main id: "F"
    checkout main
```

+++ {"tags": []}

`git merge devel main`

```{mermaid}
gitGraph
    commit id: "A"
    branch devel
    checkout main
    commit id: "B"
    commit id: "C"
    checkout devel
    commit id: "D"
    commit id: "E"
    checkout main
    merge devel id: "F" type: HIGHLIGHT
```
