---
title: "Assembly for Beginners"
catchphrase: "Get close to the metal."
categories: ["computer-science", "programming"]
tags: ["assembly", "low-level", "cpu", "registers"]
tools: ["x86", "arm"]
summary: "An approachable introduction to assembly language, demystifying how software interfaces directly with hardware."
layout: single
draft: true
math: true
date: 2025-06-30
---

Assembly is a family of low-level languages . The reason we say family, is because there is no single Assembly; since it talks almost directly with the hardware it varies depending on the CPU processor architecture. This requires an Assembly variant to exist for a given architecture, which will probably be different to the one used for another architecture.
The sheer mention of Assembly makes some people uncomfortable (_including myself_). This language is as low as we get when talking about levels of abstraction; below assembly is just binary machine code, microcode, and below that, well, circuitry.
There are limited applications for learning Assembly unless we're working at Intel. Still, the reason that learning it is valuable, is because it provides an in-depth understanding of how computers work.
We'll be using Assembly code which can be found in the [Blog Article Repo](https://github.com/pabloagn/blog/tree/master/computer-science/programming-best-practices-writing-better-code).

## What is Assembly?

Assembly is a text representation of Machine code. It has a single statement which represents a single instruction within the CPU itself. "MOV X, Y" for example, is a single instruction which passes through the CPU and moves a value X into position Y.
Machine code is a lower level, but it's very very close to assembly. It's so close, that no one bothers using it due to the advantages of being able to read the instruction "MOV" = move. Variable names also become readable rather than raw addresses in the stack or heap.

## Why even bother?

That's a valid question, and there's really not much room for Assembly programming unless we're designing systems (_even operating systems are designed on a higher level language such as C or C++_). The thing is, Assembly...
Otherwise, there's no sane reason to learn assembly and we can just stick with something higher up.
https://www.youtube.com/watch?v=gfmRrPjnEw4

## What to expect

This segment will be different, in that we'll be using an emulator instead of our typical IDE. Additionally, we'll do a fair bit of background in memory structure, registers, CPU architecture, and more; this will be essential in understanding how Assembly works.

## Conclusions

We've reviewed multiple yet simple mechanisms we can employ to make our code cleaner, more elegant, modular, usable, scalable and safer. These measures can not only help us become better programmers but better collaborators. It will make reading code a pleasure instead of an agonizing process and instantly boost our credibility.

## References

- [Python Documentation, Built-in Exceptions](https://docs.python.org/3/library/exceptions.html)
- [Python Documentation, Errors & Exceptions](https://docs.python.org/3/tutorial/errors.html)
- [Towards Data Science, What happens when you import a Python module?](https://towardsdatascience.com/what-happens-when-you-import-a-python-module-ad6c0efd2640)
- [Towards Data Science, 3 data structures for faster Python Lists](https://towardsdatascience.com/3-data-structures-for-faster-python-lists-f29a7e9c2f92)
