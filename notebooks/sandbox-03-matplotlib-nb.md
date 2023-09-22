---
jupytext:
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
---

# matplotlib rendering

```{code-cell} ipython3
import numpy as np
import matplotlib.pyplot as plt

X = np.linspace(0, 2*np.pi)
Y = np.sin(X)
```

## the right choice

+++

* `%matplotlib notebook` is advertised as no longer working
  and indeed one gets `Javascript Error: IPython is not defined`
* `%matplotlib widget` has been mentioned sometimes;
  it seems to work but it won't render properly in the jupyter book (or was it in vs-code ?)
* so I will settle on using `%matplotlib ipympl`

either `notebook` or `ipympl` requires `pip install ipympl`  
this module is also sometimes referred to as `jupyterlab-matplotlib`

```{code-cell} ipython3
# it's best to mention this, but commented off, so that the jupyterbook output has a drawing at all
# %matplotlib ipympl
```

```{code-cell} ipython3
plt.figure()
plt.plot(X, Y);
```

```{code-cell} ipython3
I, J = np.indices((4, 4))
grid = (I + J) % 2

plt.figure()
plt.imshow(grid)
plt.figure()
plt.imshow(1-grid);
```
