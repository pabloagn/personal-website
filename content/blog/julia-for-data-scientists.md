---
title: "Julia for Data Scientists"
categories: ["computer-science", "programming"]
tags: ["julia", "data-science", "performance"]
tools: ["julia"]
summary: "A guide to using Julia for data science tasks, with a focus on performance, ease of use, and ecosystem tools."
catchphrase: "High-performance data science with ease."
layout: single
draft: true
math: true
date: 2025-06-30
---

Writing code can be as simple as importing the required libraries, declaring our variables, functions, and classes as required, including some docstrings here and there, some additional comments, executing, and we're done. While we're at it, let's skip the function & class part and drop everything as is. Even better, let's also save some lines by stripping our file from all comments.

In this Blog Article, we'll

We'll be using Julia scripts and reactive notebooks which can be found in the [Blog Article Repo](https://github.com/pabloagn/blog/tree/master/data-science/julia-for-data-scientists). Datasets can also be found in the [`datasets`](https://github.com/pabloagn/blog/tree/master/data-science/julia-for-data-scientists/julia_project/datasets) repo folder.

# Data processing

For this section, we'll be using some external resources. We will download the [Goodreads-books](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks) dataset by [SOUMIK](https://www.kaggle.com/jealousleopard) on Kaggle. The `.csv` dataset is roughly 1.5 MB.

We will then save our `books.csv` file to our existing `datasets` folder inside our project environment.

## 1. Reading data into a DataFrame

As with Python, we can load files directly into DataFrame objects by using the `DataFrames` & `CSV` packages.

Since we already have those installed, we can simply load them into our current session:

##### **Code**

```Julia
using CSV, DataFrames
```

We can then read our `books.csv` file:

##### **Code**

```Julia

```

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## 2. Comments

### 2.1 Simple commenting

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:

##### **Code**

```Python
# This is a comment.
```

### 2.2 Over-commenting

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

#### 2.1.1 Simple

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

| File Name                 | Format | Method Used                 |
| ------------------------- | ------ | --------------------------- |
| `01_dataset_method_1.csv` | CSV    | `numpy.tofile()`            |
| `02_dataset_method_2.csv` | CSV    | `numpy.savetext()`          |
| `03_dataset_method_3.csv` | CSV    | `pandas.DataFrame.to_csv()` |
| `04_dataset_method_1.txt` | TXT    | `numpy.savetext()`          |

###### _Table 1. Files written on Part 1 of Article Series_

---

# Conclusions

We've reviewed multiple yet simple mechanisms we can employ to make our code cleaner, more elegant, modular, usable, scalable and safer. These measures can not only help us become better programmers but better collaborators. It will make reading code a pleasure instead of an agonizing process and instantly boost our credibility.

---

# References

- [Python Documentation, Built-in Exceptions](https://docs.python.org/3/library/exceptions.html)
- [Python Documentation, Errors & Exceptions](https://docs.python.org/3/tutorial/errors.html)
- [Towards Data Science, What happens when you import a Python module?](https://towardsdatascience.com/what-happens-when-you-import-a-python-module-ad6c0efd2640)
- [Towards Data Science, 3 data structures for faster Python Lists](https://towardsdatascience.com/3-data-structures-for-faster-python-lists-f29a7e9c2f92)

---

# Copyright

Pablo Aguirre, Creative Commons Attribution 4.0 International, All Rights Reserved.
