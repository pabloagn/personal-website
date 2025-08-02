---
title: "An Introduction to RegEx"
catchphrase: "Master the art of pattern matching."
categories: ["computer-science", "programming"]
tags: ["regex", "text-processing", "pattern-matching"]
tools: ["general"]
summary: "Learn how to match, extract, and transform text without succumbing to despair."
layout: single
draft: false
math: true
date: 2025-06-30
---

Regular Expressions, also known as RegEx, is a pattern-matching tool used to find patterns in strings. We can think of RegEx as the powerful version of search-and-replace or [wildcards](https://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm), where we can look for specific substrings and replace accordingly.

RegEx can be used to search for patterns and/or replace patterns with other strings, numbers, or characters. It's such a powerful tool that many programming languages support their own RegEx flavor.

In this Blog Article, we'll start by discussing what RegEx is, providing some historical context, explaining why it's useful, providing a comprehensive list of the most popular flavors available, and going through the basic syntax of RegEx expressions.

We'll then review RegEx syntactic elements such as literal characters, metacharacters & shorthand notations, character sets, ranges, negations, alternations, and modes or flags. We'll step things up a little by exploring anchors & boundaries, quantifiers & repetitions, greedy & lazy operation modes, capturing & non-capturing groups, named groups, backreferences, and positive & negative lookarounds, all while providing detailed examples throughout the entire segment, and a mini-project involving a client's database cleaning using more advanced regular expressions.

We'll close this segment by providing some next steps for those interested in practicing RegEx composing.

We'll be using Python scripts & RegEx expressions, which can be found in the [Blog Article Repo](https://github.com/pabloagn/blog/tree/master/computer-science/an-introduction-to-regex).

## What is RegEx?

RegEx is an extremely powerful tool for searching simple to very complex patterns. It's mostly used in input validation and searching throughout large bodies of text. It's so powerful that there are specific flavors (_implementations_) for multiple programming languages, and it is widely adopted among software developers, data analysts, Linux sysadmins, and much more.

### An introduction

RegEx can do two main things:

- Look through a body of text.
- Match and replace one or more instances using RegEx patterns.

A body of text includes anything with literal characters, digits, or special characters inside. For example, RegEx can be used to search the following, among many others:

- HTML code
- IP Addresses
- Passwords
- Physical Addresses
- Dates
- Structured/unstructured datasets
- User inputs

This is just a small subset of what RegEx can search since it can really search and match almost any body of text.

Depending on our use case, we can use RegEx on multiple platforms:

- A shell prompt such as [PowerShell](https://pabloagn.com/technologies/powershell-7/) or Bash.
  - Bash has multiple core commands supporting POSIX RegEx out of the box.
- Bash scripts.
- The find-and-replace feature in VS Code.
- A JavaScript script.
- A [Python](https://pabloagn.com/technologies/python/) script.
- A [Rust](https://pabloagn.com/blog/rust-for-beginners/) application.
- Simple validation using debuggers such as [RegEx101](https://regex101.com/).
- The RegEx feature in [Bulk Rename Utility](https://www.bulkrenameutility.co.uk/).

This is just a reduced list, but the number of platforms supporting RegEx is extensive.

### Visualizing RegEx

Let us illustrate what RegEx is by using a visualizer. A RegEx visualizer is a tool that lets us visualize our RegEx pattern in a railroad diagram. Great visualizers include:

- [regex-vis](https://regex-vis.com)
- [Debuggex](https://www.debuggex.com/)
- [Regulex](https://jex.im/regulex/#!flags=&re=)

We can write a simple RegEx expression that searches for email domains:

```RegEx
(?<=@)\w+(?=\.\w{2,3})
```

A railroad diagram would look like such:

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_01.jpg">
</p>

_Figure 1: Conventional RegEx Railroad Diagram_

In our railroad diagram, each sequential RegEx step is explained in detail, including:

- Which literal character is being searched for.
- How many times (_repetitions_) are we searching for the given character.

We'll discuss what each of those characters are in more detail, but for now, we must understand that RegEx operates character-wise. We can add repetitions to repeat the pattern to more than one character, or sets to include a range of possible characters.

## Historical context

Regular expressions, or RegEx, have their roots in theoretical computer science and formal language theory, dating back to the early 20th century. The concept of formal languages and their grammar was introduced by mathematician [Noam Chomsky](https://en.wikipedia.org/wiki/Noam_Chomsky) in the 1950s, and this laid the foundation for the development of RegEx.

In the 1960s and 70s, RegEx was used extensively in the development of the [Unix](https://en.wikipedia.org/wiki/Unix) operating system, which is still widely used today. The `grep` command, used to search for patterns in text files, was one of the earliest regex implementations and remains a key tool for developers and system administrators.

As computing power and storage capacity increased, RegEx became more widely used in various applications, including data validation, text processing, web scraping, and network security. Today, RegEx is a fundamental tool for anyone working with text data and is supported by many programming languages and software tools.

## Why is it useful?

As we mentioned, there are thousands of applications where RegEx can be useful. However, there are probably two main use cases that, in turn, branch into several sub-applications:

### Searching & replacing complex patterns

If we've ever tried searching for a substring in any editor such as VS Code, Spyder, R Studio, or PyCharm, we may remember that the search patterns we could include were very limited.

Let us imagine we have a set of 4 email addresses and would like to find and replace all domains using a conventional search-replace method:

```
johndoe@email.com
james_johnson@email.com
olivia_lee@email.com
markwilson@email.com
```

Easy peasy lemon squeezy, right? We would search for `email` and replace it with the required domain. But what would happen if the target emails had different domains?

```
johndoe@gmail.com
james_johnson@yahoo.com
olivia_lee@protonmail.com
markwilson@gmail.com
```

Well, this becomes more complicated because we have no exact matches to look for. In short, we would have to look for each domain separately and replace it with the required domain.

This is not a deal-breaker since we only have four addresses, but what happens when we have a database of 1,000,000+ records? The manual approach becomes impossible.

This is where RegEx comes into play. We can use regular expressions to search for extremely complex patterns and replace them with a new value accordingly.

The great thing about RegEx is that it's extremely simple in nature but can become as complex as we would like it to be, meaning we have the flexibility to build elaborate expressions with simple components and keep building on top of that until we get exactly what we're looking for.

### Validating user inputs

We've probably heard of SQL injections. They are a common attack vector that uses malicious SQL code for backend database manipulation to access information that was not intended to be displayed.

When we enter a website that asks for a username and password, we normally type the required fields without thinking about what goes behind curtains; in reality, the moment we enter our password and press enter, our data is most probably validated in an SQL database, where the algorithm searches for our entry, and returns `TRUE` if our username and password match. If they do not match, it returns `FALSE`, and we get an "_incorrect password_" message.

If someone were to include a customized SQL query in the input (_SQL injection_) instead of the expected username and password, many bad things, such as deleting records, changing passwords, and forcing an entry as administrator, could happen.

This can be easily avoided using input validation techniques with RegEx: The username and password fields are expecting a specific combination of characters, so that an error would be returned if we were to try something like this:

```SQL
SELECT * FROM Users WHERE UserId = 105 OR 1=1;
```

Where `1=1` will always be true, and there goes our database.

Or even simpler:

```SQL
SELECT * FROM users WHERE username = 'administrator'--' AND password = ''
```

These are actually two extremely simplified versions of an SQL injection that can be avoided using RegEx as an input validation mechanism.

**Disclaimer:** These queries are for educational purposes only and not meant to be used for malicious intent. Also, these examples can be found anywhere; in reality, SQL injections usually conform much more elaborate versions of the latter, but we get the idea.

## Why is it hard?

RegEx has certain fame associated with it; people often see regular expressions as a bunch of characters without any sense whatsoever, and that's because RegEx is not written as a conventional programming language (_there's no explicit instruction given using conventional programming language-style syntaxis_); instead, it uses a set of basic characters, metacharacters, and modifiers to build complex search patterns that, at first glance, look unintelligible.

There's one fairly famous quote among programmers:

> Some people, when confronted with a problem, think "I know, I'll use regular expressions." Now they have two problems.
>
> [Jamie Zawainski](https://en.wikipedia.org/wiki/Jamie_Zawinski)

This expression, for example, validates IPv4 addresses:

```RegEx
/
^(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.){3}([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$
/
gm
```

Apart from the numeric characters, there's nothing that would remotely make sense at first glance; it looks like a bunch of random characters resembling what we get when we open a binary file in a text editor:

```
8@4@;rE9=*A|=*Ae~mEtVtQtKuQ@@t
```

The thing is that, with RegEx, each character has a very specific purpose that we will soon learn.

## RegEx Flavors

As mentioned, there are several RegEx flavors depending on the language and/or their version.

Below are the most common flavors currently available:

- **POSIX Basic and Extended Regular Expressions:** POSIX (_Portable Operating System Interface_) defines two flavors of regular expressions: Basic Regular Expressions (BRE) and Extended Regular Expressions (_ERE_). They are used in various UNIX-based systems and tools such as grep, sed, and awk.
- **Perl-Compatible Regular Expressions (PCRE):** PCRE is a popular RegEx library used in many programming languages such as PHP, Python, and Ruby. It provides powerful features such as lookaheads, backreferences, and non-capturing groups.
- **JavaScript Regular Expressions:** JavaScript supports RegEx natively, and its flavor is similar to PCRE, but with some differences, such as the lack of support for lookbehinds.
- **.NET Regular Expressions:** The .NET framework provides a RegEx class that supports a flavor similar to PCRE, with additional features such as named groups and balancing groups.
- **Python Regular Expressions:** Python also has a native RegEx module that supports a flavor similar to PCRE but with some differences, such as using a raw string for RegEx patterns and lacking support for atomic groups.
- **Java Regular Expressions:** Java provides a RegEx library that supports a flavor similar to .NET, with some differences, such as the lack of support for lookbehinds in the default mode.

Additionally, more flavors for emerging languages have been recently created:

- Golang
- Rust

## Preparing our environment

For this segment, we'll be using two main tools:

1. **[RegEx101](https://regex101.com/):** A powerful regular expression tester with syntax highlighting, explanation, and a cheat sheet for PHP/PCRE, Python, GO, JavaScript, Java, C#/.NET, Rust. We'll use RegEx101 to initially write, test & debug all our expressions and then translate them to Python code.
2. **[Regex-Vis](https://regex-vis.com/):** A visualizer displaying regular expressions in railroad diagrams. We'll use this tool to visualize all our expressions & their step-by-step execution.
3. **Python RegEx in VS Code:** There's no required RegEx extension for VS Code. Since we'll be composing our expressions in a web application, we can simply write and debug there and finally paste them into VS Code. However, there are some optional, useful extensions we can include:
   - **[Regex Previewer](https://marketplace.visualstudio.com/items?itemName=chrmarti.regex):** A live RegEx previewer currently supporting JavaScript, TypeScript, PHP, and Haxe.
   - **[Regex snippets](https://marketplace.visualstudio.com/items?itemName=Monish.regexsnippets):** A collection of useful RegEx snippets abstracted in simpler expressions.

## Basic syntax & rules

RegEx syntax comprises a set of base characters, metacharacters, and modifiers that we can use to compose more elaborate expressions.

We must consider that each RegEx flavor has slight variations, but the general syntax is very similar throughout.

A basic RegEx syntax is defined as follows:

```RegEx
/cat/gi
```

Where:

- Forward slashes `/` delimit the regular expression.
- Inside the slashes, we include our expression, which in this case is the literal word `cat`.
- Outside of the slashes, we include the mode(s) or flag(s), which can change how RegEx operates on our target. In this example, the `g` flag stands for "_global_", while the `i` flag stands for "_case-insensitive_".

Throughout this segment, we'll write regular expressions without the forward slashes to make it more efficient. However, in many flavors, we need to include them as part of our pattern declaration.

We will also denote the outputs of each expression enclosed by double asterisk `**` signs: `**regex_output**`.

It's important to note that regular expressions are case-sensitive unless specified otherwise. This means that if we look for `K`, it will return `K` and not `k`. Also, they operate on a per-character basis, and by default, only the first character found is returned, so if we define the following:

```RegEx
/cat/
```

Only the first `cat` appearance will be returned. If we would like to return all the matches, we need the include the `g` flag.

Throughout this segment, we'll use two flags, `g` & `m`, for all examples unless specified otherwise.

### Modes / flags

Modes & flags refer to the optional operation mode we can pass to RegEx. We've already seen two of them. However, there are more we can use:

- **`i` (_case-insensitive_):** This flag indicates that the pattern should be matched in a case-insensitive manner. For example, `/cat/i` would match `cat`, `Cat`, or `CAT`.
- **`g` (_global_):** This flag indicates that the pattern should be matched multiple times within the text string rather than just the first occurrence.
- **`m` (_multiline_):** This flag changes the behavior of anchors such as `^` and `$` to match the beginning and end of individual lines within the text string rather than just the beginning and end of the whole string.
- **`s` (_single-line_):** This flag changes the behavior of the dot (.) special character to match any character, including newlines.
- **`x` (_verbose_):** This flag allows for using whitespace and comments within the RegEx pattern, making it easier to read and understand.

We can use combinations of flags by using the following syntax:

```RegEx
/cat/gim
```

### Literal characters

A literal character is a single-string character that can be used to match a larger string. By default, it matches the first occurrence of that character in the string. For example, `a` would be a literal character.

As we mentioned, literal character matching is case-sensitive.

We can also use a collection of literal characters to match full words:

```RegEx
paul
Where is **paul**
```

There are special characters, such as `.` and `?`, that cannot be matched using literal characters alone. For this, we need to escape them to literal characters using a backslash `\`. This is true for all metacharacters.

### Metacharacters list

There are 11 main metacharacters that are special in RegEx. Each metacharacter (_without escape_) has a specific function:

1. `.` (_dot_): Matches any single character except for newline characters.
2. `*` (_asterisk_): Matches zero or more occurrences of the preceding character or group.
3. `+` (_plus_): Matches one or more occurrences of the preceding character or group.
4. `?` (_question mark_): Matches zero or one occurrence of the preceding character or group.
5. `^` (_caret_): Matches the beginning of a line.
6. `$` (_dollar sign_): Matches the end of a line.
7. `[ ]` (_square brackets_): Defines a character class that matches any single character within the brackets.
8. `|` (_pipe_): Specifies alternative patterns to be matched.
9. `()` (_parentheses_): Groups characters or patterns together and can be used with quantifiers.
10. `{ }` (_curly braces_): Specifies the number of occurrences of the preceding character or group to match.
11. `\` (_backslash_): Escapes special characters, allowing them to be matched as plain text.

We also have other special metacharacters:

- Digits, words, and whitespaces:
  1. `\d` - Matches any digit character.
  2. `\D` - Matches any character that is not a digit character.
  3. `\w` - Matches any word character (_alphanumeric & underscore_). Only matches low-ascii characters (_no accented or non-roman characters_).
  4. `\W` - Matches any character that is not a word character (_alphanumeric & underscore_).
  5. `\s` - Matches any whitespace character (_spaces, tabs, line breaks_).
  6. `\S` - Matches any character that is not a whitespace character.
- Non-printable characters
  1. `\t` - Matches a TAB character.
  2. `\n` - Line Feed: Matches a newline character
  3. `\r` - The carriage return character moves the cursor to the beginning of the line without advancing to the next line.
  4. `\f` - Form feed is a page-breaking ASCII control character. It forces the printer to eject the current page and to continue printing at the top of another page.

If we want to search for any of these literally, we must translate the metacharacter into a literal character (_escape it_). We do this using the backslash `\`:

```RegEx
\+
This **+** is a plus sign
```

We can look at metacharacters as operators in any other programming language; they perform a given operation on the preceding character.

## Main metacharacters

The main metacharacters are used as a base to compose more complex metacharacters. Let us review each one in more detail.

### The dot metacharacter (.)

The dot metacharacter matches any single character without caring what the character is. The only exceptions are line break characters (_by default, but we can add a flag, and it will match even line breaks_).

The dot metacharacter will also match other metacharacters:

```RegEx
.is
Th**is** is a sentence with a special character **?is**
```

So what we're doing here, is matching any character before `is`, and `is` itself.

### The caret metacharacter (^)

The caret `^` matches the start of a line or a particular string. If we're trying to match a sentence that starts at the beginning of the line, we use this character. This character is also referred to as an **anchor** because it anchors the match to the start of the line.

For example, we can define a pattern that matches `sentence d`, where `d` is any integer digit:

```RegEx
sentence \d
This is **sentence 1**
This is **sentence 2**
```

This expression will match both words since we're not specifying they should be at the beginning of the line.

In contrast, if we explicitly define a start-of-line anchor, the expression will not match:

```RegEx
^sentence \d
This is sentence 1
This is sentence 2
```

This metacharacter tells the engine to match an expression only if it's at the start of the line.

So, if we try to match the words at the start of each sentence, it matches correctly:

```RegEx
^This
**This** is sentence 1
**This** is sentence 2
```

### The dollar sign metacharacter ($)

The dollar metacharacter works exactly the same as the caret, but it denotes an end-of-line anchor instead:

```RegEx
sentence \d$
This is **sentence 1**
This is **sentence 2**
```

Consequently, it will not match a character if it's not at the end:

```RegEx
This$
This is sentence 1
This is sentence 2
```

We can also enclose full groups and add these anchors, but we'll get to groups later on.

### Quantifiers & repetitions (+, \*)

We mentioned that RegEx works on a per-character basis. This means that if we want to match a repetition of characters, we need to use an operator that lets us do that.

The asterisk `*` is used to attempt to match the preceding token zero or more times. The plus `+` is used to attempt to match the preceding token once or more times. A token in the RegEx context is a single character or metacharacter we're trying to match.

We can use the asterisk to match a digit `n` number of times, including 0 times:

```RegEx
3\.\d*
**3.**
```

This will match the number even though we do not have decimal places, because the asterisk includes zero repetitions.

The plus `+` character is very similar, but it only matches if there is one or more appearances of the preceding character.

This would match:

```RegEx
3\.\d+
**3.14159**
```

While this would not:

```RegEx
3\.\d+
3.
```

We can also declare quantifiers as lazy or greedy and possessive or not possessive. We'll get to those later on.

### Character sets ([abc...n])

A character set in RegEx is a “box” of optional characters. By box, we refer to a single character that can take multiple forms.

Each “box” can represent a set of possible combinations in a given string. For example, the set `[A-Z]` would enclose every capital letter from A to Z, while the set `[.-]` would enclose all dot or hyphen literal characters.

But didn’t we say that we needed to escape metacharacters to match them literally? Yes, indeed, but this is not required inside sets since almost all characters (_except specific ones such as the caret_) are taken literally:

```RegEx
[.]+
www**..**
WWW**..**
```

However, this can sometimes be considered bad practice since we get accustomed to not escaping inside sets, and when we try to match the same metacharacters outside sets, we might forget the escaping. This is especially dangerous when using the dot metacharacter, since it will match anything and not a specific literal dot, making our expression vulnerable to mismatches taken as valid matches.

Both of these strings would match:

```RegEx
[Ww]
www
WWW
```

But the match would be on a per-character basis, meaning we would get six total matches (_one for each character_). If we include a repetition at the end of our set, the number of matches changes:

```RegEx
[Ww]+
www
WWW
```

This expression would match 2 times.

Sets can also expand alphanumeric character ranges (_lower and upper-case_):

```RegEx
[A-Fa-f1-4]+
**ABCDEF**G**abcdef**g**1234**5
```

### Ranges ({a, b})

Ranges are similar to repetitions, but they provide a fixed number of repetition times:

```RegEx
Amule{1,2}t
**Amuleet**
Amuleeet
```

We can set the following:

- A minimum number of repetitions.
- A maximum number of repetitions (_can be left open_).

So if we're looking for words with at least 2 `e` characters in `Amulet`, we could do something like such:

```RegEx
Amule{2,}t
Amulet
**Amuleet**
**Amuleeet**
```

### Negations (^, !)

A negation is precisely what it sounds like; it's a way to tell RegEx that we do not want a given character. There are two main ways to do negations:

- Using the caret `^` metacharacter inside a set.
- Using the exclamation mark `!` in lookarounds (_we’ll look at them later_).

We can use the caret metacharacter to return every entry except the ones starting with 1 or `\n` (_newline_):

```RegEx
^[^1\n]+
**2345**
**2367**
1234
```

We must not get confused with the two caret metacharacters:

- The first one asserts the position at the beginning of the line.
- The second one negates the characters succeeding it.

We can also return all characters except `a` to `d`:

```RegEx
[^a-d]+
abcd**efghijklmno**
```

### Alternations (|)

Alternations are simply an OR logical statement where we can test for multiple possible conditions, and the expression will match if at least one is true (and will return all of them if all are true):

```RegEx
(Mr\. \w+) \(He\)|(Mrs\. \w+) \(She\)
**Mr. Sureth (He)**
**Mrs. Damien (She)**
Mr. Lopez (She)
```

Both entries will match, since we're specifying an alternation (_more than one possible valid pattern_).

## Advanced components

Now that we have the basics, it's time to level things up and start talking about more advanced RegEx components.

### Boundaries

We already saw two examples of anchors. However, we can also use boundaries to delimit sets of characters.

Boundaries are used to define limits or edges for pattern matching. They help to ensure that a pattern match occurs only at specific points in the input string, such as at the beginning or end of a word or line. In contrast to an **anchor**, a **boundary** refers to a position or a marker that separates words, characters, or other elements in a string.

Below are the available boundaries in RegEx:

- `\b`: Word boundary, matches positions between a word character (letters, digits, underscores) and a non-word character.  
- `\B`: Non-word boundary, matches positions where `\b` does not match, i.e., within a sequence of word characters or non-word characters.  
- `\A`: Start of the input, matches the position at the very beginning of the entire input string.  
- `\Z`: End of the input, matches the position at the very end of the entire input string, before the final newline (_if any_).  
- `\z`: End of the input, matches the position at the very end of the entire input string after the final newline (_if any_).  
- `\G`: Start of the match, matches the position where the previous match ended, or the start of the input for the first match. Useful for consecutive matches.

A word boundary can be used, for example, when we want to make sure that we're delimiting words inside a sentence, and only if this is true a match will be returned:

```RegEx
\b[A-Za-z]+\b
**This** **is** **a** 2sentence.
**This** **is** another4sentence.
```

In this case, we're only matching the separate words with no characters other than upper-case or lower-case alphabetical characters.

The two word delimiters `\b` create a boundary around our expression so that a set of characters only matches if literal spaces surround it.

### Greedy & lazy quantifiers

We have already talked about quantifiers for use in repetitions. By default, quantifiers are greedy. Let us explain what greedy is by using a common example.

We want to extract the `html` tags and only the tags in an HTML webpage. An `html` tag can be defined as follows:

```HTML
<html>Text here</html>
```

Where two tags are enclosing our body of text.

We know that `html` tags are enclosed in less-than `<` and greater-than `>` characters, so we can do the following:

```RegEx
<.+>
```

In theory, this should match the tag delimiters and everything in between. The problem is that we have two matching delimiters that enclose the entire sentence `<>`, so our previous expression would match the entire line:

```RegEx
<.+>
**<html>Page title</html>**
```

This is because, by nature, quantifiers are greedy, meaning they return as many characters as possible without stopping at the first delimiter (_they eat the whole thing_).

Lazy quantifiers solve this problem: They stop at the first delimiter appearance. We can declare a lazy plus `+` quantifier by using `+?`:

```RegEx
<.+?>
**<html>**Page title**</html>**
```

With this new syntax, the matching will stop at the first delimiter occurrence and return both matches as required.

### Capturing & non-capturing groups

A group is part of a RegEx pattern enclosed in the parentheses `()` metacharacters. Groups let us separate or abstract matching patterns into a whole unit, making them extremely useful when we have extensive patterns, would like to keep things more organized, or would like to define groups as variables for later reuse. This makes groups very useful when working with expressions in programming languages.

There are two main types of groups:

- Capturing  
  - Named  
  - Unnamed  
- Non-capturing

#### Unnamed capturing groups

A capturing group is one that is captured as an actual group, meaning we can access it later in our expression syntax with a reference.

Capturing groups can be named or unnamed. The main difference is that in the first one, we assign a custom tag to our group, while in the latter, the RegEx engine assigns a number based on the group order.

A capturing group is unnamed by default and can be referenced by an index number that goes from 1 to the total number of unnamed groups on our namespace:

```RegEx
(Hello) (World)
**Hello World**
```

Where:

- `Hello` will belong to capturing group 1.  
- `World` will belong to capturing group 2.  
- The literal space in between will not belong to any group since it's not enclosed in parentheses `()`.

If we want to reference our first capturing group further down the pattern, we can do so:

```RegEx
^(Hello) (World) \g{1}
**Hello World Hello**
```

In this example, we're referencing our first capturing group by using the metacharacter `\g{n}`, where `n` is the group number.

We can also reference groups by expressing them in negative number notation:

```RegEx
^(Hello) (World) \g{-1}
**Hello World World**
```

In this example, we match the same text as most recently matched by the 2nd capturing group, denoting it as `-1`.

If we had three capturing groups, the group `-1` would actually be the third group, and `-2` would be the second:

```RegEx
^(Hello) (Hello) (World) \g{-2}
**Hello Hello World Hello**
```

We must remember that the grouping syntax heavily depends on the RegEx flavor we're using. It's always recommended to check the documentation for the RegEx type we're using since some flavors might not even support group referencing.

#### Named capturing groups

Named capturing groups are very similar to an unnamed version; the only difference is that the first includes a tag we can custom define.

Let us illustrate with an example where we match an email address and separate its parts into named capturing groups:

```RegEx
^(?<email_address>(?<first_name>\w+)\.(?<last_name>\w+)\@(?<domain_name>\w+)(?<top_level_domain_name>\.\w+))$
**john.jelly@gmail.com**
```

What we're doing here is separating our pattern into four main subgroups, enclosed by one supergroup:

- `email_address`
  - `first_name`
  - `last_name`
  - `domain_name`
  - `top_level_domain_name`

So, in the end, we get the following:

- One email address group that we can reference as a variable.  
- One first name group we can use to validate that person's first name.  
- One last name group we can use to validate for the same purpose.  
- One domain name.  
- One top-level domain name.  

If we split each group, we should get the following:

- `john.jelly@gmail.com`
  - `john`
  - `jelly`
  - `gmail`
  - `.com`

As we'll see further, named capturing groups are extremely useful in many programming languages since we can reference these groups and extract them as if they were variables throughout our code.

For example, if we want to switch the order in which first and last names appear in the email address, we can create a new string by substituting:

```RegEx
${last_name}\.${first_name}\@${domain_name}${top_level_domain_name}
```

```
jelly.john@gmail.com
```

Again, this syntax works in RegEx101 using the POSIX flavor, but we must check the syntax for other flavors if we wish to replicate this example in another language.

#### Non-capturing groups

A non-capturing group is one that is not abstracted as an actual group in our namespace, meaning we're not using an index or name to define it; it simply is a matching pattern enclosed in parenthesis without the possibility to reference it afterward. We can think of unnamed groups as anonymous functions where there is no name we can use to reference them.

Non-capturing groups are useful when we don't wish to saturate our namespace with unnecessary patterns; it may be that we don't intend to use a given group in the future, such as one containing separators.

Unnamed groups can be defined by using a `?:` inside the parenthesis and before our pattern:

```RegEx
^(\w+)(?:\, )(\w+)$
**Hello, there**
```

The non-capturing group will be `,`.

### Backreferences & backtracking

We already saw an example of **backreferencing** in capturing groups when we referenced a previous group in a section appearing after our first match.

This is closely related to another concept called **backtracking**.  
The RegEx engine has the capacity to **backtrack**, meaning it retries a match starting from an earlier position in the input string when the current match attempt fails.

This is useful, but there are also cases where we might want to avoid it. We must remember that RegEx, as with any other searching tool, is an engine that executes a pattern-searching process behind the scenes. Each backtracking step means that the engine must go over already-visited patterns again; this can lower performance and result in higher searching times, especially when working with extensive datasets.

Fortunately for us, there is one metacharacter that avoids backtracking when working with quantifiers: possessive quantifiers.  
A possessive quantifier is a type of quantifier that tells the RegEx engine to match as much of the input string as possible without allowing backtracking. It is denoted by an extra plus sign `+` at the end of the quantifier, such as `a++` or `.*+`.

For example, the pattern `a++b` would match one or more `a` characters followed by a `b` character, without allowing backtracking to retry the `a` match if the subsequent `b` match fails.

Let us think of another example where we want to match a string that starts with any number of `a` characters, followed by the letter `b`, and ends with any number of `c` characters. For example, the string `aaabcccccc`.

Using a normal greedy quantifier, we can write the following regular expression:

```RegEx
a+b.*c
**aaabc**
```

Here, the `+` matches one or more `a` characters, and the `.*` matches any character (_except newlines_) zero or more times, followed by the `c` character. However, the `.*` is greedy, meaning it will match as many characters as possible, including the `a` characters already matched by the `+`. This is why, in the case where the input string is `aaabc`, the RegEx engine finds a match; it backtracks and **refinds** the `c` character already found by `.*`.

To avoid this problem and make the quantifier possessive, we can add an extra plus sign `+` after the `.*`:

```RegEx
a++b.*+c
aaabc
```

This will not match the pattern because it cannot backtrack, so the actual `c` is not found as literal `c` but as any character using the dot metacharacter.

A main use case for using possessive quantifiers in regular expressions is when matching long, complex, or repetitive strings that may cause excessive backtracking. For example, when matching a string with multiple repeating patterns, such as a large HTML document with nested tags, possessive quantifiers can help avoid the potentially infinite backtracking that can occur with certain patterns and input data.

However, as useful as these methods are, they must be used sparingly since they can cause unintended behavior and make our expressions harder to debug.

### Lookarounds

**Lookarounds** are special metacharacters that allow us to specify patterns that must match (_or must not match_) before or after the main pattern we are trying to match.

There are four main lookaround implementations in RegEx:

- Positives  
  - Lookbehind  
  - Lookahead  

- Negatives  
  - Lookbehind  
  - Lookahead  

The positive variations allow us to match if a pattern is before or after the main pattern. In contrast, the negative variations allow us to match if a pattern is **not** before or after the main pattern.

A lookbehind checks for the pattern before the main pattern (looks behind), while a lookahead does the inverse; it looks ahead of the main pattern.

We can illustrate this a little bit better with a railroad diagram:

```RegEx
(?<=before)target(?=after)
```

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_02.jpg">
</p>

_Figure 2: A Typical Positive Lookbehind Expression_

As we can see, there is a `before` (_Preceded by_) and an `after` (_Followed by_) section. This diagram refers specifically to the positive variants, but we can draw a similar diagram for the negative versions by using the negation metacharacter:

```RegEx
(?<!before)target(?!after)
```

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_03.jpg">
</p>

_Figure 3: A Typical Negative Lookbehind Expression_

Let us define a simple example that will help us understand lookarounds better:

```
Mr. Oleg Smith
Mrs. Danna Pereia
```

For all lookaround examples, we'll use the `gm` flags, so be sure to include them in your expressions.

#### Positive lookbehind

A positive lookbehind tells RegEx to match `b` **if** `a` exists; it looks behind `b` and returns `b` if the pattern behind (`a`) matches.

The basic syntax is as follows:

```RegEx
(?<=before)target
```

Where:

- `before` is the pattern behind our target.  
- `target` is the pattern that will be returned if `before` exists.

From our previous example:

```RegEx
(?<=Mr\. )\w+
Mr. **Oleg** Smith
Mrs. Danna Pereia
```

#### Positive lookahead

A positive lookahead tells RegEx to match `a` **if** `b` exists; it looks ahead of `a` and returns `a` if the pattern ahead (`b`) matches.

The basic syntax is as follows:

```RegEx
target(?=after)
```

Where:

- `target` is the pattern that will be returned if `after` exists.  
- `after` is the pattern ahead of our target.

From our previous example:

```RegEx
\w+(?= Smith)
Mr. **Oleg** Smith
Mrs. Danna Pereia
```

#### Negative lookbehind

A negative lookbehind tells RegEx to match `b` **if** `a` does **not** exist; it looks behind `b` and returns `b` if the pattern behind (`a`) does **not** match.

The basic syntax is as follows:

```RegEx
(?<!before)target
```

Where:

- `before` is the pattern behind our target.  
- `target` is the pattern that will be returned if `before` does **not** exist.

From our previous example:

```RegEx
(?<!Danna )\b\w+$
Mr. Oleg **Smith**
Mrs. Danna Pereia
```

Breaking it down:

1. Define a negative lookbehind that checks if `Danna` does **not** exist (note the space after the name).  
2. Define a word boundary. This tells RegEx that we only want to match `\w+` if it's a complete word.  
3. Match any alphanumeric characters using `\w+` up to the end of the line with `$`.

#### Negative lookahead

A negative lookahead tells RegEx to match `a` **if** `b` does **not** exist; it looks ahead of `a` and returns `a` if the pattern ahead (`b`) does **not** match.

The basic syntax is as follows:

```RegEx
target(?!after)
```

Where:

- `target` is the pattern that will be returned if `after` does **not** exist.  
- `after` is the pattern ahead of our target.

From our previous example:

```RegEx
^\w+s?\.(?! Oleg)
Mr. Oleg Smith
**Mrs.** Danna Pereia
```

Breaking it down:

1. Define the start of the line with `^`.  
2. Match any alphanumeric word `\w+`, followed by an optional `s` (to include `Mrs.`), and then a literal dot `\.`.  
3. Assert that the next word is **not** `Oleg`, preceded by a space.

## Unit testing

Unit testing is a software-development process in which the smallest testable parts of an application—units—are individually scrutinized for proper operation. The developer chooses the level of rigorousness, but ideally the tests must cover all possible edge cases to prevent bugs with untested samples.

Regular expressions are prone to truly awful bugs because:

- We are generating gigantic expressions in a single line, where a single missed character can render the whole expression useless.  
- We don't always know all the edge cases: a client can provide us with a dataset that contains all kinds of crazy patterns and errors that we did not originally account for.

This is why it's always recommended to perform thorough testing and debugging using an external tool such as RegEx101.  
RegEx101 has a built-in unit tester where we can design tests and perfect our expressions to our liking.

### Testing a simple expression

Head to [RegEx101](https://regex101.com/) and select the **Unit Tests** section to design your tests.  
A unit test should typically consist of a single string representing an edge case you want to test.

For example, a nice and simple set of four edge cases in an IPv4-validation implementation would consist of the following:

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_12.jpg">
</p>

_Figure 4: A Typical Testing Suite Covering 4 Edge Cases_

You can then run your IPv4 RegEx pattern:

```RegEx
(?P<ip_address>(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.){3}([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]))$
```

…and it will pass all tests:

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_13.jpg">
</p>

_Figure 5: Result for Test Suite of 4 Edge Cases_

Even more amazing is that if you encounter a bug in your test, you can debug it right inside the Unit Tester. Select the bug icon, and a RegEx debugger will appear:

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_14.jpg">
</p>

_Figure 6: Debugging an Edge Case Using the Built-In Debugger_

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_15.jpg">
</p>

_Figure 7: “Song” View for Debugging an Edge Case_

From here, you can play all the matching steps as if it were a song. Each step is shown with its number, corresponding RegEx fragment, and the resulting match in your test string:

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/05/B019A036_regex_vis_16.jpg">
</p>

_Figure 8: Scrolling Through the “Song” View for a Particular Edge Case_

Unit testing is an art because it requires deep knowledge of the algorithm you are implementing and its limitations to create meaningful tests.  
The great thing is that this practice applies to any programming language—Java and Scala, for example, possess very strong unit-testing infrastructures designed to catch bugs and save you many hours of frustration.

## RegEx in Python

Up until now, we've only used regular expressions in a debugger, but RegEx is too powerful to just play around with—you need to use it in real code.

Python supports RegEx via two main libraries:

- The built-in `re` library.  
- The third-party `regex` library.

The first provides a more limited set of functions for working with regular expressions. It can be used to search for patterns in strings, split strings using regular expressions, and replace parts of strings with new text.

The second offers a more powerful set of functions. It can do everything that the `re` module can do, plus additional features such as advanced searches using multiple regular expressions at the same time or matching overlapping patterns.

In this segment, we'll work with the `re` module. Documentation for `regex` can be found [here](https://pypi.org/project/regex/).

Start by opening your favorite IDE and importing the required library:

```python
import re
```

### Using `re`

Declare a simple string:

```python
mystring = """
Mr. John Smith
Mrs. Catherina Jones
Mr. Kali Smith
Mrs. Jenneth Smith
"""
```

If we print our string:

```python
print(mystring)
```

we get:

```
Mr. John Smith
Mrs. Catherina Jones
Mr. Kali Smith
Mrs. Jenneth Smith
```

(Internally, this is `\nMr. John Smith\nMrs. Catherina Jones\nMr. Kali Smith\nMrs. Jenneth Smith\n`.)

Now declare a pattern that will search for any name beginning with `Mrs.`:

```python
pattern = re.compile(r"^Mrs\. \w+ \w+", re.M)
```

A couple of details to remember:

- A RegEx pattern can be enclosed in single (`'...'`) or double (`"..."`) quotes.  
- It can contain as many flags as you like. In `re`, flags are defined using the `re.F` syntax, where `F` is any supported flag.  
- Flags in `re` use different syntax than POSIX RegEx, for example.

Below are the supported flags in `re`, with their long and short names (use whichever you prefer):

- `re.IGNORECASE` (or `re.I`) – Perform case-insensitive matching.  
- `re.MULTILINE` (or `re.M`) – Allow `^` and `$` to match at the start and end of each line as well as the start and end of the entire string.  
- `re.DOTALL` (or `re.S`) – Allow the `.` metacharacter to match any character, including newlines.  
- `re.UNICODE` (or `re.U`) – Enable full Unicode matching.  
- `re.ASCII` (or `re.A`) – Perform ASCII-only matching.  
- `re.VERBOSE` (or `re.X`) – Enable verbose mode, which allows the use of whitespace and comments within the pattern.  
- `re.DEBUG` – Display debugging information about the pattern and the matching process.

#### Using `finditer`

To return match objects instead of plain strings, use `finditer`:

```python
matches = pattern.finditer(mystring)
[x for x in matches]
```

`pattern.finditer` returns an iterable of `re.Match` objects, so use a loop (or comprehension) to extract the values:

```
[<re.Match object; span=(16, 36), match='Mrs. Catherina Jones'>,
 <re.Match object; span=(52, 70), match='Mrs. Jenneth Smith'>]
```

Where:

- `span` – start and end positions (0-based index, upper bound exclusive).  
- `match` – the actual text matched by the pattern.

If you want to match directly without compiling first, swap the flag position to the end:

```python
matches = re.finditer(r"^Mrs\. \w+ \w+", mystring, re.M)
[x for x in matches]
```

Sometimes you'll include backslashes or other special characters in your pattern, so it's best to use a raw string:

```python
pattern = re.compile(r"^Mrs\. \w+ \w+", re.M)
```

#### Using `findall`

If you only want the matched strings, use `findall`:

```python
matches = pattern.findall(mystring)
matches
```

```
['Mrs. Catherina Jones', 'Mrs. Jenneth Smith']
```

#### Using `match`

`match` checks whether the pattern matches **at the beginning** of the string and returns one `re.Match` object or `None`:

```python
mystring = "Hello World"
pattern = re.compile(r"[A-Za-z]+ [A-Za-z]+")
match = pattern.match(mystring)
print(match)
```

```
<re.Match object; span=(0, 11), match='Hello World'>
```

#### Using `search`

`search` finds the **first** occurrence of the pattern anywhere in the string:

```python
mystring = """
Mr. John Smith
Mrs. Catherina Jones
Mr. Kali Smith
Mrs. Jenneth Smith
"""
pattern = re.compile(r"^Mrs\. \w+ \w+", re.M)
match = pattern.search(mystring)
print(match)
```

```
<re.Match object; span=(16, 36), match='Mrs. Catherina Jones'>
```

#### Operating on `re.Match` objects

`re.Match` objects expose helper methods:

- `.group()`  
- `.start()`  
- `.end()`  
- `.span()`

Suppose you want to operate on phone numbers from a client’s database:

```python
mystring = r"""
John Doe, johndoe@email.com, (123) 456-7890, 123 Main St.
Jane Smith, jane.smith@email.com, (234) 567-8901, 456 Elm St.
Robert Johnson, robert.johnson@email.com, (345) 678-9012, 789 Oak Ave.
Sarah Lee, sarah_lee@email.com, (456) 789-0123, 234 Pine St.
Michael Brown, michael.brown@email.com, (567) 890-1234, 567 Maple Dr.
Lisa Davis, lisa.davis@email.com, (678) 901-2345, 890 Cedar Rd.
David Rodriguez, david.rodriguez@email.com, (789) 012-3456, 1234 Willow Way
Emily Kim, emily.kim@email.com, (890) 123-4567, 5678 Birch Blvd.
James Johnson, james_johnson@email.com, (901) 234-5678, 9012 Pine St.
"""

pattern = re.compile(r"(?<=\.com\, )\(\d{3}\) \d{3}\-\d{4}\b", re.M)
matches = pattern.finditer(mystring)

for match in matches:
    print(f"Full re.Match object: {match}\n")
    print(f"Match Location: {match.span()}\n")
    print(f"Start Index: {match.start()} ; End Index: {match.end()}\n")
    print(f"Phone Number Length: {match.end() - match.start()}\n")
    print(f"Phone Number: {match.group()}\n")
```

```
Full re.Match object: <re.Match object; span=(30, 44), match='(123) 456-7890'>
Match Location: (30, 44)
Start Index: 30 ; End Index: 44
Phone Number Length: 14
Phone Number: (123) 456-7890
Full re.Match object: <re.Match object; span=(93, 107), match='(234) 567-8901'>
Match Location: (93, 107)
Start Index: 93 ; End Index: 107
Phone Number Length: 14
Phone Number: (234) 567-8901
Full re.Match object: <re.Match object; span=(163, 177), match='(345) 678-9012'>
Match Location: (163, 177)
Start Index: 163 ; End Index: 177
Phone Number Length: 14
Phone Number: (345) 678-9012
Full re.Match object: <re.Match object; span=(224, 238), match='(456) 789-0123'>
Match Location: (224, 238)
Start Index: 224 ; End Index: 238
Phone Number Length: 14
Phone Number: (456) 789-0123
Full re.Match object: <re.Match object; span=(293, 307), match='(567) 890-1234'>
Match Location: (293, 307)
Start Index: 293 ; End Index: 307
Phone Number Length: 14
Phone Number: (567) 890-1234
Full re.Match object: <re.Match object; span=(357, 371), match='(678) 901-2345'>
Match Location: (357, 371)
Start Index: 357 ; End Index: 371
Phone Number Length: 14
Phone Number: (678) 901-2345
Full re.Match object: <re.Match object; span=(431, 445), match='(789) 012-3456'>
Match Location: (431, 445)
Start Index: 431 ; End Index: 445
Phone Number Length: 14
Phone Number: (789) 012-3456
Full re.Match object: <re.Match object; span=(495, 509), match='(890) 123-4567'>
Match Location: (495, 509)
Start Index: 495 ; End Index: 509
Phone Number Length: 14
Phone Number: (890) 123-4567
Full re.Match object: <re.Match object; span=(568, 582), match='(901) 234-5678'>
Match Location: (568, 582)
Start Index: 568 ; End Index: 582
Phone Number Length: 14
Phone Number: (901) 234-5678
```

## Mini-project: Cleaning a client's database

A house-rental company has a brand-new relational database they would like to populate with fresh user information. They currently have the data in a rudimentary and inconsistent format that cannot be parsed with conventional file types such as `.tsv` or `.csv` (_their engineer messed up and separated the data with weird, inconsistent characters_).

Our job is to extract four key fields from this dataset, which will then be used to systematically harass their clients via invasive phone calls and targeted publicity:

- User's first name.  
- User's last name.  
- User's phone number (_validated_).  
- User's email address.

Since this company is dubious, they also collected their customers' IP addresses in IPv4 format. However, we have mentioned that their engineer has certain shortcomings, so they are skeptical about whether these addresses are valid.

We then have three rules:

- If the phone number is invalid, we must not include it since this will only stall their process.  
- If the IP address is not valid, we must not include it.  
- If the email address is invalid, we must not include it.

The dataset’s head can be found below:

```
Christopher Brown%%% cbrown@gmail.com%}%% (567) 890-1234%%% 890 Cedar Rd.%%% 192.268.0.3
Ashley Johnson%%% ashleyjohnson@yahoo.com%%% (678) 901-2345%%% 1234 Willow Way%%% 10.0.0.5
Andrew Lee%%% andrewlee@hotmeil.com%%% (789) 012-3456%%% 5678 Birch Blvd.%%% 172.16.1.3
Sarah Davis%%% sarah.davis@gmail.com%%% (890) 123-4567%%% 9012 Pine St.%%% 192.268.1.4
Robert Kim%%% robert_kim@yahoo.com%$$% 2345 Oak Ave.%%% 10.0.0.6
Emily Smith%%% emilysmith@gmail.com%%% (123) 456-7890%%% 456 Elm St.%%% 172.16.0.4
Michael Davis Jr.%%% michael.davis.jr@yahooo.com%%% (234) 567-8901%%% 789 Oak Ave.%%% 192.268.0.4
L. Kim Jr.%%% lkimjr@hotmeil.com%%% (345) 678-9012%% 10.0.0.7
```

The dataset link can be consulted [here](https://github.com/pabloagn/blog/blob/master/computer-science/an-introduction-to-regex/src/inputs/advanced_set.txt).

Before we begin, there are a few details we must consider:

- The syntax may change between platforms. For example, the visualizer we're using, [regex-vis](https://regex-vis.com), does not support named captured groups declared as `(?P<first_name>[A-Za-z]+)`; we must remove the `P` character. In contrast, [RegEx101](https://regex101.com) supports both versions, while Python’s `re` requires the `P` character before the group name.  
- It’s always a good idea to write our regular expressions in an online debugger first, where we can see our changes live. This makes composing regex much easier because we can track the effects of every change while writing the actual expression.

So, with everything in place, let's get started, shall we?

### Making sense of the data

From our dataset’s head we can notice some details:

- The attributes appear to be separated by multiple percentage signs `%` (no idea why) or other weird characters such as `$` or `}`.  
- The percentage signs are not always consistent (some have double, some have triple characters).  
- Some IP addresses appear to be invalid.  
  - A valid IPv4 address has four integer groups, each between `0` and `255` (inclusive).  
  - Groups are separated by literal dots `.`, and the last group does not terminate in a dot.  
- Some email domains appear to be invalid.  
  - A valid email address must have a set of alphanumeric characters, followed by an `@` separator, and a domain composed of a valid commercial domain name plus a valid `.com` top-level domain name. Here, we assume that all users have commercial email addresses.  
- Some first names are written as acronyms (_`L. Kim`_).  
- All phone numbers share the same structure:  
  - `(aaa) ddd-dddd`, where `a` is the area code and `d` is an integer digit between `0` and `9`.

In summary, this database is a mess. However, regex is so powerful that we can perform all the tasks and return a pristine version to our client.

### First names

This one is fairly simple. We need to create a named capturing group at the start of the line that matches

- Any lower- or upper-case letter from `A` to `Z`.  
- Optionally, a single-letter acronym followed by a literal dot `.`.  

The first name will be followed by a literal space:

```RegEx
^(?P<first_name>[A-Za-z]+)(?:\.? )
```

### Last names

This is simpler because we assume there are no middle names. The set of alphabetical characters following the first name should be the last name. We also handle shortened versions such as `James B.` by allowing an optional dot at the end:

```RegEx
(?P<last_name>[A-Za-z]+\.?)
```

### Optional suffix

Some names have `Jr.` or `Sr.` suffixes. This field is optional:

```RegEx
(?P<suffix> Jr\.|Sr\.)?
```

### Separators

Next come the weird separators. We may encounter any of the following characters— `%`, `}`, or `$`—in any combination and length:

```RegEx
(?:[\%\$\{\}]{1,} )?
```

### Validated email address

A typical email address has five main components:

1. A username that can contain alphanumerics plus `-`, `_`, or `.`.  
2. An `@` sign.  
3. A domain name (assumed commercial).  
4. A literal dot `.`.  
5. A top-level domain (assumed `.com`).  

We create three named groups (username, domain, and TLD) wrapped inside a super-group:

```RegEx
(?P<email_address>
    (?P<email_name>[\w\-\._]+)
    @
    (?P<email_domain>hotmail|gmail|aol|outlook|yahoo|protonmail)
    \.com
)?
(?:[\%\$\{\}]{1,} )?
```

### Validated phone numbers

A valid phone number must have

- An area code `(ddd)`.  
- Three digits.  
- A hyphen `-`.  
- Four final digits.

```RegEx
(?P<phone>\(\d{3}\) \d{3}-\d{4})?
(?:[\%\$\{\}]{1,} )
```

### Home addresses

Although not required, we capture the address in case it is needed later. A valid address should

- Start with a set of digits.  
- Be followed by a street name that may contain one or more words.  
- Optionally end with a dot if the street type is abbreviated (`St.` vs `St`).

```RegEx
(?P<address>\d+ (?:\w+ ?){1,}\.?)
(?:[\%\$\{\}]{1,} )?
```

### Validated IPv4 addresses

An IPv4 address has four octets, each between `0` and `255`, separated by dots. Using alternations and quantifiers we get:

```RegEx
(?P<ip_address>(
    ([01]?[0-9]?[0-9]|
     2[0-4][0-9]|
     25[0-5])\.
){3}
([01]?[0-9]?[0-9]|
 2[0-4][0-9]|
 25[0-5]))
$
```

### Matching the database

Putting it all together:

```RegEx
^(?P<first_name>[A-Za-z]+)(?:\.? )
(?P<last_name>[A-Za-z]+\.?)
(?P<suffix> Jr\.|Sr\.)?
(?:[\%\$\{\}]{1,} )?
(?P<email_address>
  (?P<email_name>[\w\-\._]+)@
  (?P<email_domain>hotmail|gmail|aol|outlook|yahoo|protonmail)
  \.com
)?
(?:[\%\$\{\}]{1,} )?
(?P<phone>\(\d{3}\) \d{3}-\d{4})?
(?:[\%\$\{\}]{1,} )
(?P<address>\d+ (?:\w+ ?){1,}\.?)
(?:[\%\$\{\}]{1,} )?
(?P<ip_address>(
  ([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.
){3}
([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]))
$
```

A more readable, multiline Python version with flags and file handling might look like this:

```Python
import re

pattern = re.compile(
    r"^(?P<first_name>[A-Za-z]+)(?:\.? )"
    r"(?P<last_name>[A-Za-z]+\.?)"
    r"(?P<suffix> Jr\.|Sr\.)?"
    r"(?:[\%\$\{\}]{1,} )?"
    r"(?P<email_address>(?P<email_name>[\w\-\._]+)"
    r"@(?P<email_domain>hotmail|gmail|aol|outlook|yahoo|protonmail)\.com)?"
    r"(?:[\%\$\{\}]{1,} )?"
    r"(?P<phone>\(\d{3}\) \d{3}-\d{4})?"
    r"(?:[\%\$\{\}]{1,} )"
    r"(?P<address>\d+ (?:\w+ ?){1,}\.?)"
    r"(?:[\%\$\{\}]{1,} )?"
    r"(?P<ip_address>(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.){3}"
    r"([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]))$",
    re.M | re.X
)

with open('src/inputs/advanced_set.txt', 'r', encoding='utf-8') as f:
    data = f.read()

for m in pattern.finditer(data):
    print(
        m.group('first_name'),
        m.group('last_name'),
        m.group('phone'),
        m.group('email_address'),
        m.group('ip_address'),
        sep=' | '
    )
```

### Next steps

Regex mastery can be summarized in one expression: `(practice){100,}`. Once you understand the foundations, you can combine them into extremely powerful patterns that search anything, anywhere, all at once.

Below are some resources if you want to explore regex further. **Disclaimer:** none of the links are referral links.

- **Regex debuggers & visualizers**  
  - [RegEx101](https://regex101.com) – real-time editor, debugger, code generator, and more.  
  - [RegExR](https://regexr.com/) – similar to RegEx101 with built-in unit testing.  
  - [Debuggex](https://www.debuggex.com/) – debugger/railroad visualizer (limited language support).  
  - [Regulex](https://jex.im/regulex/) – JavaScript-focused visualizer.  
  - [regex-vis](https://regex-vis.com/) – produces beautiful railroad diagrams (used throughout this segment).

- **Regex practice**  
  - RegEx101’s built-in quiz (28 tests to push your regex expertise).  
  - [Regex Crossword](https://regexcrossword.com/) – crossword puzzles powered by regex patterns.  
  - [RegexLearn](https://regexlearn.com/learn) – two modules: regex 101 and regex for SEO.  
  - [RegexOne](https://regexone.com/) – 20+ interactive exercises explaining the basics.  
  - [HackerRank – regex domain](https://www.hackerrank.com/domains/regex) – problems from easy to hard.  
  - [Regex Golf](https://alf.nu/RegexGolf?world=regex&level=r00) – score based on expression length.

- **Forums & community**  
  - [/r/regex](https://www.reddit.com/r/regex/) – a vibrant subreddit for questions and solutions.

- **Other regex utilities**  
  - [CommonRegex](https://github.com/madisonmay/CommonRegex) – common patterns with a simple interface.  
  - [awesome-regex](https://github.com/aloisdg/awesome-regex) – curated list of libraries, tools, and software.  
  - [Useful Regex Patterns](https://projects.lukehaas.me/regexhub/) – interactive library of common patterns.

- **Learning resources**  
  - [Regular Expressions in Python (YouTube)](https://www.youtube.com/watch?v=AEE9ecgLgdQ&) – free one-hour course.  
  - [Taming Regular Expressions (Udemy)](https://www.udemy.com/course/taming-regex-a-complete-guide-to-regular-expressions/) – beginner-friendly.  
  - [Regular Expressions for Beginners and Beyond (Udemy)](https://www.udemy.com/course/regular-expressions-for-beginners-and-beyond-with-exercises/) – hands-on course.  
  - [Mastering Regular Expressions in JavaScript (Udemy)](https://www.udemy.com/course/mastering-regular-expressions-in-javascript/) – JavaScript focus.  
  - [Python Regular Expressions Complete Masterclass (Udemy)](https://www.udemy.com/course/python-regex/) – Python focus.  
  - [Regular Expressions for Beginners – Universal (Udemy)](https://www.udemy.com/course/regular-expressions-for-beginners-universal/) – POSIX-style focus.

### Conclusions

We have reviewed the essential building blocks of regular expressions and shown how to combine them into powerful patterns. From validating email addresses to cleaning entire databases, regex is a vital tool across many programming languages and command-line utilities.

### References

- [RegexOne](https://regexone.com/)  
- [Regular-Expressions.info](https://www.regular-expressions.info/)  
- [Python docs – `re`](https://docs.python.org/3/library/re.html)  
- [Google for Education – Python Regular Expressions](https://developers.google.com/edu/python/regular-expressions)
