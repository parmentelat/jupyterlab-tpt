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

# mermaid

```{code-cell} ipython3
from IPython.display import HTML
HTML(filename="_static/style.html")
```

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

## a plausible git scenario

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
