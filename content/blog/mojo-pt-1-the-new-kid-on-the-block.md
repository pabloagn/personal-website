---
title: "Mojo, Pt. 1: The New Kid on the Block"
categories: ["computer-science", "programming"]
tags: ["mojo", "ai", "compilers", "python"]
tools: ["mojo"]
summary: "Introducing Mojo, a language combining Pythonic syntax with systems-level speed — ideal for AI and ML workloads."
catchphrase: "Familiar syntax, blazing speed."
layout: single
draft: true
math: true
date: 2025-06-30
---

Machine Learning has grown to become a true monstrosity in terms of adoption and hype. We can measure how many times the word AI is being said on tech companies' press releases, and it will probably be higher than every other word in the English vocabulary; everyone wants to have a bite of this attractive golden fruit because really, what's being achieved with AI is unprecedented; we're living a bacchanal feast that would make Heliogabalus blush.

Up until now, we've been deploying ML models in suboptimal languages; Python was not built for high-performance, data-intensive production applications, since it lacks two main components: strong static typing, and performant parallel execution due to CPython's [GIL (_Global Interpreter Lock_)](https://realpython.com/python-gil/) cap on CPU-bound tasks in multithreaded applications.

This has urged developers to come up with more efficient measures to design & deploy ML pipelines in production environments, and one of them, is the creation of new, more efficient programming languages; this is exactly what Mojo is trying to achieve.

So what is Mojo? A recipe for disaster? The missing piece for the birth of unprecedented powerful models? Who knows. In the meantime, let us explore what this new language is all about, and if it's really the technology that will change everything (_once again_).

In this two-piece Blog Article, we'll spend time discussing what Mojo is, who invented it, how and why was it created, its main syntax & features, it's advantages & disadvantages over similar languages such as [Python](https://pabloagn.com/technologies/python/), [Julia](https://pabloagn.com/technologies/julia/) & [R](https://pabloagn.com/technologies/r/), what it can and cannot do, what the current state and future plans are for this new language, and much more.

We'll also dedicate most of the second segment to introducing a practical example of what can be done with the language in its current state, along with some performance comparisons with Python & Julia.

We'll be using Mojo scripts which can be found in the [Blog Article Repo](https://github.com/pabloagn/blog/tree/master/machine-learning/mojo-pt-1-the-new-kid-on-the-block).

# Mojo: The new kid on the block

It's not that often that we hear of a new programming language built by serious people, that could really change the way we look at code. Mojo has been getting a lot of hype, since already ML models are receiving all the attention; it would then make sense that, if an ML-oriented, general purpose language is claiming to offer performances thousands times faster than Python, people would be extremely interested.

The funniest thing is that people are already expecting a lot of things from Mojo, while it has not been released yet (_it's still in playground mode, meaning there's an actual waitlist that can take up to 2 weeks to roll-in new users_).

According to the official page:

> Mojo is a new programming language that bridges the gap between research and production by combining the best of Python syntax with systems programming and metaprogramming.
>
> With Mojo, you can write portable code that’s faster than C and seamlessly inter-op with the Python ecosystem.
> [Modular, Mojo](https://docs.modular.com/mojo/)

Modular is a serious company widely known for their enterprise-level solutions in the field of AI; they currently provide three main services:

- Hardware integration services.
- A state-of-the-art unified AI inference engine.
- The Mojo programming language (_still in early-access_).

What's more interesting is that Modular was co-founded by two experts: [Chris Lattner](https://en.wikipedia.org/wiki/Chris_Lattner), which is also the co-founder of [LLVM](https://en.wikipedia.org/wiki/LLVM "LLVM"), supporter of [Clang](https://en.wikipedia.org/wiki/Clang "Clang") & [MLIP](https://mlir.llvm.org/), and main designer of the [Swift programming language](https://developer.apple.com/swift/), and [Tim Davis](https://www.modular.com/team/tim-davis), who helped build a wide variety of successful AI-related technologies such as [TensorFlow](https://www.tensorflow.org/), [XLA](https://www.tensorflow.org/xla) & [MLIR](https://mlir.llvm.org/), and more.

According to an interview provided by Lattner, he meant to create a high-performing language since Swift's inception, however, Swift was never fully-adopted as he imagined due to Apple practically taking full ownership of the language and making it platform specific.

https://users.rust-lang.org/t/rust-vs-mojo-the-new-llvm-language/93548/2

# Why Mojo?

To answer this question, we must first dive into the context of

## 1. Some contextual history

## 2. What is currently missing in AI development

## 3. What Mojo brings to the table

## 4. What Mojo could change

---

# The plans

## 1. Current state

## 2. Future plans

# The playground

We mentioned that Mojo currently exists exclusively in a [JupyterHub](https://jupyter.org/hub) environment, which we can access by joining the waitlist and gaining early-access to some of Mojo's features (_waitlist access as of the publishing of this article was 2 weeks_). This implies various things:

- The taste of the language we get is far from being a complete representation of what's in store for future iterations; there are various features not yet implemented, specifically around its interoperability with Python.
- The number of vCPU cores available in each cloud instance may vary, so baseline performance is not representative of the language.
- Environment installations are not yet supported, meaning we're stuck with what Modular decided to include (_this should not stop us from playing with Mojo, since the included packages are almost representative of what we would use in a normal Mojo development pipeline, at least in the preprocessing & research part_).
- We cannot use global variables inside functions yet.

The full roadmap and current state can be consulted [here](https://docs.modular.com/mojo/roadmap.html).

## 1. Basic concepts

Mojo introduces 4 key concepts:

- Low-level interfacing capabilities
- Strong type-checking
- Advanced meta-programming systems
- Optional immutability

### 1.1 Low-level interfacing capabilities

### 1.2 Strong type-checking

### 1.3 Advanced meta-programming systems

### 1.4 Optional immutability

## 2. Basic syntax

We mentioned that Mojo can be thought of as a superset of Python, meaning that syntactic constructs are very similar between both; in fact, Mojo directly borrows most of Python's syntax directly.

However, there are some key differences between both. We'll define what's similar and what's different.

### 2.1 Similarities with Python

### 2.2 New implementations

### 2.3 Some practical examples

## 3. Interoperability with Python

### 3.1 Importing Python modules

## 4. Advanced concepts

## 5. Advanced syntax

---

# Next steps

We'll next review a performance analysis, as well as deploy a ML model using both Mojo & Python, and see how they behave, and if Python still has a chance.

---

# Conclusions

We've reviewed

---

# References

- [Mojo Programming Manual](https://docs.modular.com/mojo/programming-manual.html)
- [Real Python, GIL](https://realpython.com/python-gil/)
- ***

# Copyright

Pablo Aguirre, Creative Commons Attribution 4.0 International, All Rights Reserved.
