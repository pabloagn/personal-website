---
title: "Regex in Scala"
categories: ["computer-science", "programming"]
tags: ["scala", "regex", "text-processing", "pattern-matching"]
tools: ["scala"]
summary: "Understand how to effectively use regular expressions in Scala to match, extract, and manipulate text with precision."
catchphrase: "Tame text with powerful patterns."
draft: true
math: true
date: 2025-06-30
---

Writing code can be as simple as importing the required libraries, declaring our variables, functions, and classes as required, including some docstrings here and there, some additional comments, executing, and we're done. While we're at it, let's skip the function & class part and drop everything as is. Even better, let's also save some lines by stripping our file from all comments.

In this Deep Dive, we'll

We'll be using Scala code which can be found in the [Deep Dive Repo](https://github.com/pabloagn/deep-dives/tree/master/computer-science/regex-in-scala).

## A brief introduction

### RegEx

### Scala

## What to expect

RegEx & Scala are not the most beginner-friendly languages out there. However, we'll make this as simple and clear as possible, so that, given that we already have a basic understanding of the both, we can glue them together, making an elegant combination of performance & safety with pure power.

### RegEx

In this segment, we'll study a set of regular expressions which will help us illustrate examples; we will start with easier examples, and build our way up to a practical example involving more advanced concepts. Because of this, at least general knowledge of RegEx is recommended. If we're first approaching RegEx, we can check out [An Introduction to RegEx](https://pabloagn.com/blog/an-introduction-to-regex/), which provides a comprehensive introduction to regular expressions including the POSIX universal flavor as well as some Python hands-on examples.

### Scala

Although we'll not be using advanced [[Scala]] features for this segment, at least a basic knowledge of [[Scala]] is recommended, since it will not be provided here. For that, we can check out [[[Scala]] 3 for Beginners](https://pabloagn.com/blog/scala-3-for-beginners/), which provides a comprehensive introduction to the language and its main features.

### Supporting technologies

Additionally, we'll make use of two other technologies:

- PowerShell 7
- VS Code
- VS Code Extensions
- RegEx101

These will also not be covered in detail, since that's out of the scope of this segment. PowerShell 7 will really only be used to set up our project (_we'll not be executing RegEx here_). For the other ones (_VS Code, RegEx101_), if we're not yet familiar with either of these tools, we have two options:

- **Look for a quick introduction:** These are very simple tools that will boost our productivity whenever writing RegEx. Below are some resources for getting to know them more intimately:
  - **[Getting started with Visual Studio Code](https://code.visualstudio.com/docs/introvideos/basics):** Provides the basics for setting up the tool and understanding its main functionalities.
  - **[Regex101 - The Ultimate Tool for Regular Expressions, Federico Terzi](https://www.youtube.com/watch?v=79WVN-vGllU):** A great tutorial for getting started with RegEx101
- **Use alternative tools:** Of course, these are just two options (_one IDE and one debugger_), but we're free to use whatever works best.

## Setting up our environment

### Setting up a RegEx101 session

There's no such thing as a "RegEx101 session"; what we're doing here is simply creating a new document that will serve as playground whenever we want to debug expressions quickly and safely, instead of doing it inside our IDE when we're writing the actual code.

### Creating a Scala project

The next step is to create a new Scala project. For this, we'll follow the steps below:

We'll first create a new folder that will contain our project, as well as other materials such as input files:

```PowerShell
New-Item -ItemType Directory -Path Test regex-in-scala
cd regex-in-scala
```

Next, we'll create our actual project using `sbt`:

```PowerShell
sbt new scala/scala3.g8
```

With the name `regex-in-scala`.

We'll verify that our project was correctly generated:

```PowerShell
cd regex-in-scala
dir
```

We should see something like this:

```
Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d----          05/22/23     18:38                project
d----          05/22/23     18:38                src
-a---          05/22/23     18:38            342 .gitignore
-a---          05/22/23     18:38            271 build.sbt
-a---          05/22/23     18:38            346 README.md
```

Great! Now, we can open VS Code in the current (_`root`_) project directory, and import the sbt build when prompted:

D002A042_01.png

###### _Figure 1: Importing Main Build to Project_

The `sbt` template we used already includes a `Main.scala` file, which we'll use to write our simple application. However, we'll also create a new worksheet, which we'll use to test expressions on-the-fly:

```PowerShell
New-Item -ItemType Directory -Path .\src\worksheets
New-Item -ItemType File -Path .\src\worksheets\regex_test.worksheet.sc
```

### Including required dependencies

We'll only be using one dependency for our project called [Apache Commons CSV](https://commons.apache.org/proper/commons-csv/) for reading CSV files. To include the dependency, we can open our `build.sbt` file, and include the following:

```Scala
libraryDependencies += "org.apache.commons" % "commons-csv" % "1.8"
```

So that our complete `build.sbt` file should look something like such:

```Scala
val scala3Version = "3.2.2"

lazy val root = project
  .in(file("."))
  .settings(
    name := "regex-in-scala",
    version := "0.1.0-SNAPSHOT",

    scalaVersion := scala3Version,

    libraryDependencies += "org.scalameta" %% "munit" % "0.7.29" % Test,
    libraryDependencies += "org.apache.commons" % "commons-csv" % "1.10.0"
  )
```

The only thing that could change, are the versions of each dependency (_the latest version for `commons-csv` at the writing of this article was `1.10.0`_). We must ensure that we're using the latest version for increased compatibility; the latest versions can be consulted [here](https://commons.apache.org/proper/commons-csv/download_csv.cgi).

All the RegEx will be handled by an internal library called `scala.util.matching`, specifically the `RegEx` class provided by it.

## An introduction to the Scala Regex class

### Performing matches

### Capturing groups

### Advanced concepts

### Error handling with RegEx

## A practical example

We'll now create a very simple application that reads a csv file, and matches certain fields by using RegEx.

### The raw data

For this project, we'll use one CSV file:

- [`characters.csv`](https://raw.githubusercontent.com/pabloagn/deep-dives/master/computer-science/regex-in-scala/regex-matching/utils/characters.csv): A set of characters belonging to movies, tv shows & fiction novels, containing:
  - `Name`
  - `LastName`
  - `Address`
  - `Profession`
  - `Age`
  - `EmailAddress`
  - `Phone`

Our task will be to extract all usable information from this dataset in a readable and clear format.

### Creating our regular expressions

For this section, we'll use [RegEx101](https://regex101.com/), a great tool used for writing, testing & [[debugging]] regular expressions on-the-fly.

#### Visualizing our data

If we take a look at the head of our file, we can see the following structure:

```csv
Name,LastName,Address,Profession,Age,EmailAddress,Phone
Lucifer,Morningstar,Lux, Nightclub Owner, Immortal, lucifermorningstarlux.com,123-456-7890
Ray,Shoesmith,Sydney, Criminal, 40, ray.shoesmith@underworld.com.au,234-567-890
John,Tavner,Milwaukee, Intelligence Officer, 30, john.tavnermilwaukee.gov,345-678-9012
Doron,Kavillio,Israel, Commando, 50, doron.kavillio@israel.gov,456-789-0123
Wayne,McCullough,Brockton, Teenager, 16, wayne.mcculloughbrockton.net,567-890-1234
Edmond,Dantes,Château d'If, Sailor, 25, edmond.dantes@montecristo.com,678-901-2345
Rodion,Raskolnikov,Saint Petersburg, Ex-Student, 23, raskolnikov.rodionstpetersburg.ru,789-012-3456
Anna,Karenina,Moscow, Socialite, 30, anna.karenina@moscow.society.ru,890-123-456
Gania,Ivolgin,Saint Petersburg, Civil Servant, 27, gania.ivolgin@stpetersburg.ru,901-234-5678
Pierre,Bezukhov,Moscow, Count, 32, pierre.bezukhov@moscow.gov.ru,012-345-678
Clary,Desiree,Paris,Actress,20,desiree.clary@paris.fr,-222-333
Edmond,Alexandre,Marseilles,Sailor,30,alexandre.edmond@marseilles.fr,222-333-4444
Kitty,Shcherbatsky,Moscow,Socialite,20,kitty.shcherbatskymoscow.society.ru,333-444-555
Konstantin,Levin,Russian Countryside,Farmer,35,konstantin.levincountryside.ru,444-555-6666
```

So, it appears we have:

- A first name
- A surname
- An address
- A profession
- An age as integer number
- An email address containing different possible domains.
- A phone number containing multiple possible formats:
  - Three segments: `999-1010-1111`
  - Four segments: `1-999-888-7777`

Our task is to match entries that have valid records, meaning:

- A valid name
- A valid surname
- An address of some kind
- A valid age
- A valid email address
- A valid phone number

#### Designing our expressions

Let us start with the first name:

```RegEx
^(?<first_name>[A-z]+)\, ?
```

What we're doing:

- Start at the end of the line.
- Create a named capturing group.
- Include any alphabetical character, lower or upper-case.
- Include a comma `,` separator and an optional whitespace ` `.

Now, for the second name, we do a similar approach:

```RegEx
(?<last_name>[A-z]+)\, ?
```

For the address, we'll do a simplified version, since many of our characters appear to be ancient or live in slightly unusual places, so we'll have to sacrifice a little and generalize:

```RegEx
(?<address>[A-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+)\, ?
```

We include accented & special characters, since some of our characters may live in non-US provinces where these characters are common.

The profession is fairly simple:

```RegEx
(?<profession>[A-z ]+)\, ?
```

The only thing to consider, is that we must include all alphabetic characters, but also white spaces, since the profession might be a collection of 2 or more words (_e.g., Civil Servant, Army Officer, etc._).

Now, we can go for the age, whose only condition will be that is must be composed of an integer or be immortal. We'll also include an age limit, since we don't want people with 1000+ years of age in our database without them explicitly stating that they're immortal (_luckily for us, the immortal guys included are specified as immortal_).

```RegEx
(?<age>\d+|Immortal)\, ?
```

Once we have the ages, we'll go for the email addresses. This one is a little bit trickier, since we appear to have domains of all kinds, so the only conditions will be as follows:

- Start with alphanumeric characters, including special characters (_`.`, `-`, `_`, etc.\_)
- Continue with an `@` symbol.
- Continue with alphanumeric characters (domain name)
- Close with at least one dot character followed by alphabetical characters (_top-level domain_)

```RegEx
(?<email_address>[a-zA-Z0-9_.+-]+\@[a-zA-Z0-9-.]{1,})\, ?
```

The phone number is also slightly trickier, since we have two possible combinations we can accept:

- `8-222-111-0000`
- `456-789-0123`

So, in essence, the first segment is optional, while the other 3 are required:

```RegEx
(?<phone_number>(\d{1,2}\-)?\d{3}\-\d{3}\-\d{4})$
```

We also make sure to include an end-of-line metacharacter using the dollar sign `$`.

If we join all the pieces together, we should end up with something like the expression below:

```RegEx
^(?<first_name>[A-z]+)\, ?(?<last_name>[A-z]+)\, ?(?<address>[A-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+)\, ?(?<profession>[A-z ]+)\, ?(?<age>\d+|Immortal)\, ?(?<email_address>[a-zA-Z0-9_.+-]+\@[a-zA-Z0-9-.]{1,})\, ?(?<phone_number>(\d{1,2}\-)?\d{3}\-\d{3}\-\d{4})$
```

If we transfer this expression to a RegEx visualizer tool, we can see in this [link](https://regex-vis.com/?r=%5E%28%3F%3Cfirst_name%3E%5BA-z%5D%2B%29%5C%2C+%3F%28%3F%3Clast_name%3E%5BA-z%5D%2B%29%5C%2C+%3F%28%3F%3Caddress%3E%5BA-z%C3%80-%C3%BA%C3%80-%C3%BF%C3%80-%C3%96%C3%98-%C3%B6%C3%B8-%C3%BF+%27%5D%2B%29%5C%2C+%3F%28%3F%3Cprofession%3E%5B%5Cw+%5D%2B%29%5C%2C+%3F%28%3F%3Cage%3E%5Cd%2B%29%5C%2C+%3F%28%3F%3Cemail_address%3E%5Ba-zA-Z0-9_.%2B-%5D%2B%5C%40%5Ba-zA-Z0-9-.%5D%7B1%2C%7D%29%5C%2C+%3F%28%3F%3Cphone_number%3E%28%5Cd%7B1%2C2%7D%5C-%29%3F%5Cd%7B3%7D%5C-%5Cd%7B3%7D%5C-%5Cd%7B4%7D%29%24+) that we end up with a complete structure.

Now it's time to transfer this expression to our application.

### Performing tests in a Scala worksheet

Earlier in this module, we created a worksheet; the advantage with working with these files, is that we can immediately see the result of our evaluations, without having to compile and run. The main downside to this, is that we are limited in terms of reading and writing files (_these will not work properly_). So, what we'll do, is emulate csv entries using a string containing some records:

```Scala
import scala.util.matching.Regex

val myText: String =
"""
Lucifer,Morningstar,Lux, Nightclub Owner, Immortal, lucifermorningstarlux.com,123-456-7890
Ray,Shoesmith,Sydney, Criminal, 40, ray.shoesmith@underworld.com.au,234-567-890
John,Tavner,Milwaukee, Intelligence Officer, 30, john.tavnermilwaukee.gov,345-678-9012
Doron,Kavillio,Israel, Commando, 50, doron.kavillio@israel.gov,456-789-0123
Wayne,McCullough,Brockton, Teenager, 16, wayne.mcculloughbrockton.net,567-890-1234
Edmond,Dantes,Château d'If, Sailor, 25, edmond.dantes@montecristo.com,678-901-2345
Rodion,Raskolnikov,Saint Petersburg, Ex-Student, 23, raskolnikov.rodionstpetersburg.ru,789-012-3456
"""
```

Now, we include our translated RegEx; it's important to mention that Scala does not yet support named captured groups, so we'll have to work with unnamed groups for this example. Also, unfortunately Scala is extremely picky when it comes to declaring RegEx using newline characters. Because of this, and to increase clarity, we'll declare one `String` variable per group of our expression, then concatenate all, and finally convert to a regular expression:

```Scala
val namePattern: String = """([A-Za-z]+), ?"""
val surnamePattern: String = """([A-Za-z]+), ?"""
val addressPattern: String = """([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+), ?"""
val professionPattern: String = """([A-Za-z ]+), ?"""
val agePattern: String = """(\d+|Immortal), ?"""
val emailPattern: String = """([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+), ?"""
val phonePattern: String = """((\d{1,2}-)?\d{3}-\d{3}-\d{4})"""

val completePattern: String = namePattern + surnamePattern + addressPattern + professionPattern + agePattern + emailPattern + phonePattern
val regexPattern: Regex = completePattern.r
```

So that in the end, we're left with something like such:

```
regexPattern: Regex = ([A-Za-z]+), ?([A-Za-z]+), ?([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+), ?([A-Za-z ]+), ?(\d+|Immortal), ?([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+), ?((\d{1,2}-)?\d{3}-\d{3}-\d{4})
```

We could also have done it in a single line, but it would decrease readability:

```Scala
val regexPattern: Regex = """([A-Za-z]+), ?([A-Za-z]+), ?([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+), ?([A-Za-z ]+), ?(\d+|Immortal), ?([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+), ?((\d{1,2}-)?\d{3}-\d{3}-\d{4})""".r
```

The matches variable is an iterator object, so now, the only thing we need to do is to include a `foreach` statement that goes through every record (_newline_) and performs a pattern matching of the records that comply with out expression:

```Scala
matches.foreach { m =>
    println(s"First name: ${m.group(1)}")
    println(s"Last name: ${m.group(2)}")
    println(s"Address: ${m.group(3)}")
    println(s"Profession: ${m.group(4)}")
    println(s"Age: ${m.group(5)}")
    println(s"Email address: ${m.group(6)}")
    println(s"Phone number: ${m.group(7)}")
    println("-----")
}
```

```
// First name: Doron
// Last name: Kavillio
// Address: Israel
// Profession: Commando
// Age: 50
// Email address: doron.kavillio@israel.gov
// Phone number: 456-789-0123
// -----
// First name: Edmond
// Last name: Dantes
// Address: Château d'If
// Profession: Sailor
// Age: 25
// Email address: edmond.dantes@montecristo.com
// Phone number: 678-901-2345
// -----
```

It appears that there are just 2 records from this subset that comply with our requirements. We can verify this by going to RegEx101, and inserting the same set of entries we just used, along with the expression employed:

D002A042_02.png

Now that we have positive results using our worksheet, it's time to get more serious and import our entire set using a proper `.scala` file.

### Writing our application

#### Importing the required dependencies

When we created our project, a `Main.scala` file was also generated. We'll open it, and start by importing the required dependencies:

```Scala
import java.io.{File, FileWriter}
import org.apache.commons.csv.{CSVFormat, CSVParser, CSVPrinter}
import scala.util.matching.Regex
import scala.collection.JavaConverters._
```

Where:

- `java.io.FileReader`: Is used for for reading streams of characters.
- `org.apache.commons.csv._`: Is used to read and write files in variations of the Comma Separated Value (_CSV_) format.
- `scala.util.matching.Regex`: provides the `Regex` class used to perform regex matching in bodies of text.
- `scala.collection.JavaConverters._`: Provides a variety of decorators that enable converting between Scala and Java collections using extension methods.

#### Defining our functions

Once we have our dependencies ready, we'll define some functions that will help us modularize our small application:

- A main function called `runMatcher`: Will call the `writeData` function.
- A reader function called `readCsvFile`: Will read a `.csv` file containing our data.
- A matching function called `matchData`: Will match our entries using a predefined regular expression.
- A writing function called `writeData`: Will write a new `.csv` file containing only matched records.

##### The main function

The main function will simply call the other functions, in this case, the writing function which will be at the last part of our application.

```Scala
// Define main function
@main def runMatcher: Unit = {
  // Define directories
  val rDir: String = "utils/characters.csv"
  val wDir: String = "utils/characters_processed.csv"

  // Define RegEx groups
  val namePattern: String = """([A-Za-z]+), ?"""
  val surnamePattern: String = """([A-Za-z]+), ?"""
  val addressPattern: String = """([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+), ?"""
  val professionPattern: String = """([A-Za-z ]+), ?"""
  val agePattern: String = """(\d+|Immortal), ?"""
  val emailPattern: String = """([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+), ?"""
  val phonePattern: String = """((\d{1,2}-)?\d{3}-\d{3}-\d{4})"""

  writeData(rDir, wDir, regexPattern)
}
```

Here, we're simply:

- Declaring two variables holding our directory paths.
- Declaring out RegEx pattern that we'll use later for pattern matching.
- Calling our not-yet-implemented `writeData` function.

##### The readCSV file function

This function will help us read our target file, which is in a `.csv` file format, to a Scala `List` of `CSVRecord` objects.

```Scala
// Defining our reading function
def readCsvFile(readPath: String): List[String] = {
  val file = new File(readPath)
  val parser = CSVParser.parse(file, java.nio.charset.StandardCharsets.UTF_8, CSVFormat.DEFAULT)
  val records = parser.getRecords.asScala.toList
  parser.close()
  records.map(_.toString)
}
```

What we're doing is:

1. We first declare our function with a single argument, the target path, and an expected return type of `List[String]`.
2. We then create a new `java.io.File` object containing our path.
3. Next, we declare a CSV parser handle.
   1. This new object will take the `File` object, the encoding (_in this case `UTF_8`_), and the CSV format we're expecting, in this case, `DEFAULT`.
4. We then ask the parser for our records, and convert them to a `List`. This `List` contains a set of `CSVRecord` objects with all of its values.
5. Finally, we close the parser handler and map each CSV record to its string representation using the `toString` method.

##### The matchData function

This function will be in charge of matching our data using a predefined RegEx pattern:

```Scala
def matchData(readDir: String, regexPattern: Regex): List[String] = {
  val csvData = readCsvFile(readDir)
  val matchedData = csvData.flatMap { row =>
    regexPattern.findFirstMatchIn(row).map { m =>
      s"""
      |First name: ${m.group(1)}
      |Last name: ${m.group(2)}
      |Address: ${m.group(3)}
      |Profession: ${m.group(4)}
      |Age: ${m.group(5)}
      |Email address: ${m.group(6)}
      |Phone number: ${m.group(7)}
      |-----""".stripMargin
    }
  }
  matchedData
}
```

What we're doing is:

1. We fist call our `csvData` function and assign its return value to a new variable called `csvData`. The type of this variable will be a `List` of `String` values.
2. We then create a new variable called `matchedData`, that will perform our RegEx matching. This expression is slightly more elaborate, so lets detail it more:
   1. We take the `csvData` variable of type `List[String]`.
   2. We then use the `flatMap` higher-order method. This method applies (_`Map`_) a given function to all elements inside our list, and then flattens (_`flat`_) the remaining object. The level of granularity is row level, as denoted in `csvData.flatMap { row => ... }`.
   3. The function in this case is `regexPattern.findFirstMatchIn(row)`: It searches for the first match of the regular expression pattern (`regexPattern`) within the current `row` string. The result is an `Option` that either contains the match or is `None`.
   4. `.map { m => ... }`: If a match is found in the previous step, it maps the match (_`m`_) to a new value.
   5. We then take `m`, and see if it matches any of the groups by using string interpolation `s"""${var}"""`.
   6. Finally, we apply the `stripMargin` method to our string output, which removes the leading `|` characters and any preceding whitespace on each line, resulting in properly formatted output.
3. We finally call the `matchedData` variable. This is required because it triggers the evaluation of the transformation operations defined earlier in the code. In Scala, certain operations like `flatMap` and `map` are lazily evaluated, meaning they are not executed immediately when they are defined. Instead, they are executed when the result is actually needed or when a strict operation is applied to them.

##### The writeData function

This is our last function, and involves paying attention to how the output from the previous function is being formatted. If we take a look at our previous output, it should look something like such:

```
List(
First name: Edmond
Last name: Alexandre
Address: Marseilles
Profession: Sailor
Age: 30
Email address: alexandre.edmond@marseilles.fr
Phone number: 222-333-4444
-----,
First name: Alyosha
Last name: Karamazov
Address: Saint Petersburg
Profession: Monk
Age: 20
Email address: alyosha.karamazov@stpetersburg.ru
Phone number: 555-666-7777
...
```

So, we need to translate this list into something that is writeable to a `.txt` file. This is easily done by using a `foreach` method:

```Scala
def writeData(readPath: String, writePath: String, regexPattern: Regex): Unit = {
  val data: List[String] = matchData(readPath, regexPattern)
  val fileWriter = new FileWriter(writePath)
  data.foreach(record => fileWriter.write(record + "\n"))
  fileWriter.close()
}
```

What we're doing is:

1. We first define our function, accepting both reading & writing paths, as well as our RegEx pattern.
2. The output type of this function is `Unit`, since we're not returning anything to the user, we're simply writing a file.
3. We then call our our `matchData` function and assign it to a new variable.
4. Next, we create a new `FileWriter` object.
5. Next, we iterate over all records inside our list, and write them by including the contents and a newline character in the end, so the records are properly separated.
6. Finally, we close the `fileWriter` handler object.

### Running our application

Now that we have everything we need, we can compile & run our application using `sbt`. For this, we can head to our root directory, open a new PowerShell instance, and execute the following:

```PowerShell
sbt run
```

Which should yield the following:

```
[info] welcome to sbt 1.8.2 (Oracle Corporation Java 11)
[info] loading settings for project regex-matching-build-build from metals.sbt ...
[info] loading project definition from \project\project
[info] loading settings for project regex-matching-build from metals.sbt ...
[info] loading project definition from \project
[success] Generated .bloop\regex-matching-build.json
[success] Total time: 0 s, completed May 23, 2023, 5:20:30 PM
[info] loading settings for project root from build.sbt ...
[info] set current project to regex-matching (in build file:regex-in-scala)
[info] compiling 1 Scala source to \regex-in-scala\target\scala-3.2.2\classes ...
[warn] there was 1 deprecation warning; re-run with -deprecation for details
[warn] one warning found
[info] running runMatcher
```

If we take a look at our `.txt` file, we can see that it correctly matched the expected records, and wrote them in a really nice format:

```
First name: Edmond
Last name: Alexandre
Address: Marseilles
Profession: Sailor
Age: 30
Email address: alexandre.edmond@marseilles.fr
Phone number: 222-333-4444
-----

First name: Alyosha
Last name: Karamazov
Address: Saint Petersburg
Profession: Monk
Age: 20
Email address: alyosha.karamazov@stpetersburg.ru
Phone number: 555-666-7777
-----

First name: Ivan
Last name: Karamazov
Address: Saint Petersburg
Profession: Intellectual
Age: 24
Email address: ivan.karamazov@stpetersburg.ru
Phone number: 666-777-8888
-----

First name: Dewitt
Last name: Booker
Address: Columbia
Profession: Detective
Age: 38
Email address: booker.dewitt@columbia.com
Phone number: 888-999-1010
-----

First name: Konstantin
Last name: Levin
Address: Russian Countryside
Profession:
Age: 35
Email address: levin.konstantin@countryside.ru
Phone number: 3-777-666-5555
-----
...
```

## Conclusions

In this segment, we briefly discussed what Scala & RegEx are, what are the use-cases of both, and how can we use RegEx inside Scala to perform simple validations by using the built-in `scala.util.matching.Regex` class. We also went over a simple real-life example, where we were presented with a messy CSV file that we had to process by using regular expressions. Finally, we wrote the new file containing the clean records in a readable format what we can present to anyone, and it'll be understood.

Scala is not the most beginner-friendly language for performing RegEx matching; there are other languages such as Python providing easy-to-use implementations that can be more flexible in some instances. However, Scala is still extremely powerful, and provides excellent capabilities; similar to Python, we can use unnamed capturing groups to treat our fields as variables. We can also go over large bodies of text without sacrificing performance if we use the right modules & methods.

So sure, if we're in a hurry and would like to simply perform a RegEx analysis on some text, even RegEx101 is a better option for this; the real power of Scala surfaces when we're aiming to develop a streamlined process that can handle terabytes of records while staying performant.

## References

- [Introduction to Apache Commons CSV, Baeldung](https://www.baeldung.com/apache-commons-csv)
