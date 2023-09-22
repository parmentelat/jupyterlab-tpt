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

# admonitions

```{code-cell} ipython3
from IPython.display import HTML
HTML(filename="_static/style.html")
```

here's how we use MyST **admonitions**; there are other ways, but these are stable and show up the same in both jlab and jbook, so...

just be wary to **not insert a (sub)title** inside an admonition, as it would not make it to the table of contents !

+++

## no title and no class


in its the simplest form, with no class nor shortcut

    ````{admonition}
    with no title nor class
    ````

renders like this

````{admonition}
with no title nor class
````

+++

## with a title and no class

    ````{admonition} a title and no class
    this is the same as with the `note` class
    ````

gives you this

````{admonition} a title and no class
this is the same as with the `note` class
````

+++

## a title and a class

there are a few predefined classes (see table below)

    ````{admonition} with a title and a class
    :class: tip

    the color and icon are inherited from the chosen class
    ````

which renders as
````{admonition} with a title and a class
:class: tip

the color and icon are inherited from the chosen class
````

+++

## the menagerie of classes

there are some *predefined* types of admonition that are - see them also below

| name | color | icon |
|-:|:-|-|
| `tip` | green | pen |
| `hint` | green | bulb |
| `seealso` | green | right arrow |
| `note` | blue | circled i |
| `important` | blue | lightning |
| `attention` | yellow | megaphone |
| `caution` | yellow | circled exclamation mark |
| `warning` | yellow | triangled exclamation mark |
| `danger` | red | circled exclamation mark |
| `error` | red | circled x |

+++

````{admonition} a tip
:class: tip

rendering with the `tip` class
````

````{admonition} a hint
:class: hint

rendering with the `hint` class
````

````{admonition} a seealso
:class: seealso

rendering with the `seealso` class
````

````{admonition} a note
:class: note

rendering with the `note` class
````

````{admonition} a important
:class: important

rendering with the `important` class
````

````{admonition} a attention
:class: attention

rendering with the `attention` class
````

````{admonition} a caution
:class: caution

rendering with the `caution` class
````

````{admonition} a warning
:class: warning

rendering with the `warning` class
````

````{admonition} a danger
:class: danger

rendering with the `danger` class
````

````{admonition} a error
:class: error

rendering with the `error` class
````

+++

## collapsible contents with the `dropdown` class

just add the `dropdown` class to create a collapsible contents

    ````{admonition} this is a collapsible section
    :class: attention dropdown

    the whole text goes here....
    ````

````{admonition} this is a collapsible section
:class: attention dropdown
    
Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    ```python
    we can add fenced code anywhere inside the admonition
    # and that's why the 4 backticks, btw
    import numpy as np
    import pandas as pd
    
    df = pd.read_csv("titanic.csv")
    ```
````

+++ {"slideshow": {"slide_type": ""}, "tags": []}

### using raw HTML

+++

for the record only, it should also be possible to do create collapsible using plain HTML with a `<details>` tag

<details>
    
<summary>the visible part</summary>

and the rest of the message is just mentioned directly in the &lt;details&gt; tag

</details>

however **do not use this** as apparently this requires extra configuration...
