// ---------------------
// Map
// ---------------------

// A simple function
val myList1: List[Int] = List(1, 2, 3, 4, 5)
myList1.map(x => x * x)

// A more elaborate function
def applyFun(x: Int): Int =
    if (x % 2 == 0) x * x
    else x

myList1.map(applyFun)

// A generic method
def genericMethod[T](x: T) = x match
    case x:Int => x * x
    case x:String => s"${x} * ${x}"

val myList2 = List(1, 2, "3")

myList2.map(genericMethod)

// A method matching a list of lists
def matchMultiple(xs: List[Int]): Int = xs match
    case Nil => 0
    case y :: ys => y + matchMultiple(ys)

val myList3: List[List[Int]] = List(List(1, 2, 3), List(4, 5, 6), List(7, 8, 9))

myList3.map(matchMultiple)

// ---------------------
// flatMap
// ---------------------

// Calculate square of nested elements using a recursive function
def squaredSum(xs: List[List[Int]]): List[Int] = xs match
    case Nil => Nil
    case y :: ys => y.map(x => x * x) ++ squaredSum(ys)

val myList4: List[List[Int]] = List(List(1, 2, 3), List(4, 5, 6))

squaredSum(myList4)

// Calculate square of nested elements using flatMap & map
myList4.flatMap(x => x.map(x => x * x))

// Return the collection without any operation
myList4.flatMap(x => x)

// ---------------------
// filter
// ---------------------

// Declare a recursive function that filters even numbers
def checkEven(xs: List[Int]): List[Int] = xs match
    case Nil => Nil
    case y :: ys => if (y % 2 == 0) y :: checkEven(ys) else checkEven(ys)

val myList7: List[Int] = List(1, 2, 3, 4, 5, 6, 7, 8, 9)
checkEven(myList7)

// Filter even numbers using filter
myList7.filter(x => x % 2 == 0)

// Filter a list of strings
val myList8: List[String] = List("d", "b", "e", "a", "t", "b", "y", "z")

myList8.filter(x => x < myList8.head)

myList8.filter(x => x <= myList8.head)


// ---------------------
// foldLeft
// ---------------------

// Define a recursive function calculating the product of items and returning a list of integer values
def foldListsLeft(xs: List[List[Int]], f: List[Int] => Int): List[Int] = xs match
    case Nil => Nil
    case y :: ys => f(y) :: foldListsLeft(ys, f)

// Define the product helper function
def productsInt(xs: List[Int]): Int = 
    def prodAccumulate(xs: List[Int], acc: Int): Int = 
        if (xs.isEmpty) acc
        else xs.head * prodAccumulate(xs.tail, acc)
    prodAccumulate(xs, 1)

val myList9: List[List[Int]] = List(List(1, 2, 3), List(4, 5, 6), List(7, 8, 9))

foldListsLeft(myList9, productsInt)

// Calculate sum of products using foldLeft
def foldListsLeft2(xs: List[List[Int]]): List[Int] = xs match
    case Nil => Nil
    case y :: ys => y.foldLeft(1)(_ * _) :: foldListsLeft2(ys)

foldListsLeft2(myList9)

// ---------------------
// foldRight
// ---------------------

// Define a list of integer values
val myList10: List[Int] = List(1, 2, 3, 4)

// Compare between both foldLeft & foldRight
myList10.foldLeft(0)(_ - _)
myList10.foldRight(0)(_ - _)

// ---------------------
// reduceLeft
// ---------------------

def concatList(xs: List[Char]): String = xs match
    case Nil => ""
    case y :: ys => y.toString + concatList(ys)

val myList11: List[Char] = List('S', 'c', 'a', 'l', 'a')

concatList(myList11)

myList11.map(a => a.toString).reduceLeft(_ + _)


// ---------------------
// reduceRight
// ---------------------

myList11.map(a => a.toString).reduceRight(_ + _)

val myList12: List[Char] = List('a', 'l', 'a', 'c', 'S')

myList12.map(a => a.toString).reduceRight((a, b) => b + a)

// ---------------------
// scanLeft
// ---------------------

val myList13: List[Int] = List(2, 2, 2, 2, 2, 2, 2)

myList13.scanLeft(2)(_ * _)

myList13.scanLeft(1)(_ * _)


def computePower(x: Int, y: Int): Int =
    val myCollection: List[Int] = List.fill(y)(x)
    myCollection.scanRight(1)(_ * _).head

computePower(2, 3)

// ---------------------
// zip
// ---------------------

def zipCollections(xs: List[Int], ys: List[Int]): List[List[Int]] = (xs, ys) match
    case (Nil, Nil) => Nil
    case (Nil, z :: zs) => Nil
    case (z :: zs, Nil) => Nil
    case (z :: zs, d :: ds) => List(z, d) :: zipCollections(zs, ds)

val myList14: List[Int] = List(1, 2, 3, 4)
val myList15: List[Int] = List(4, 3, 2, 1)

zipCollections(myList14, myList15)

myList14.zip(myList15)

// ---------------------
// zipWithIndex
// ---------------------

val myList16: List[String] = List("Carolina", "Emma", "Diego", "Will", "Charles")
myList16.zipWithIndex(0)

// Using map
myList16.zipWithIndex.map(x => x)

// Using foreach
myList16.zipWithIndex.foreach(x => println(x))

// ---------------------
// forall
// ---------------------

val myList17: List[Int] = List(1, 2, 3, 4, 5)
val myList18: List[Int] = List(2, 4, 6, 8)

myList17.forall(x => x % 2 == 0)
myList18.forall(x => x % 2 == 0)

// Implementing forall using a recursive function
def compliesAll(xs: List[Int]): Boolean = xs match
    case Nil => throw Error("Nothing")
    case y :: Nil => (y % 2 == 0)
    case y :: ys => (y % 2 == 0) & compliesAll(ys)

compliesAll(List(2, 2, 1, 3))
compliesAll(List(2, 2, 4, 6))
compliesAll(List(1, 2, 2))
compliesAll(List(1))
compliesAll(List(0))
// compliesAll(List())

// ---------------------
// exists
// ---------------------

val myList19: List[Int] = List(1, 2, 3, 4, 5)

myList19.exists(x => (x % 2 == 0))

// Implementing exists using a recursive function
def compliesOne(xs: List[Int]): Boolean = xs match
    case Nil => throw Error("Nothing")
    case y :: Nil => (y % 2 == 0)
    case y :: ys => (y % 2 == 0) | compliesOne(ys)

compliesOne(List(1, 3, 5, 7, 9))
compliesOne(List(2, 2, 4, 6))
compliesOne(List(1, 2, 2))
compliesOne(List(1))
compliesOne(List(0))
// compliesOne(List())

val myList20: List[Int] = List(1, 3, 5, 7, 9)
val myList21: List[Int] = List(2, 4, 6, 8)

myList20.exists(x => x % 2 == 0)
myList21.exists(x => x % 2 == 0)


// ---------------------
// groupBy
// ---------------------

// Define a discriminator function
def groupNumbers(x: Int): Int =
    if (x % 2 == 0) 1
    else 2

val myList22: List[Int] = List(1, 2, 3, 4, 5, 6, 7, 8, 9)

// Group by using discriminator function
myList22.groupBy(groupNumbers)

// Define a discriminator function now returning a string as key
def groupNumbersStringKey(x: Int): String =
    if (x % 2 == 0) "Even"
    else "Odd"

// Group by using discriminator function
val groupedInts = myList22.groupBy(groupNumbersStringKey)
groupedInts("Odd")

// ---------------------
// sort
// ---------------------

val myList23: List[Int] = List(5, 2, 3, 1, 4)

// Calling sorted without parameters
myList23.sorted

// Calling sorted with ord parameter
myList23.sorted(Ordering.Int.reverse)

// ---------------------
// sortBy
// ---------------------

// Declare a Doggo class
case class Doggo(name: String, age: Int, city: String, owner: String, breed: String)

// Create some instances
val Tommy: Doggo = new Doggo("Tommy", 12, "Budapest", "Laszlo", "Borzoi")
val Borys: Doggo = new Doggo("Borys", 10, "Warsaw", "Bartosz", "Husky")
val Ramon: Doggo = new Doggo("Ramon", 15, "San Juan", "Alondra", "Labradoodle")
val Fumiko: Doggo = new Doggo("Fumiko", 15, "Tokyo", "Keiko", "Shiba Inu")

// Create a list of Doggos
val listOfDoggos: List[Doggo] = List(Tommy, Borys, Ramon, Fumiko)
println(listOfDoggos)

// Sort by one attribute
listOfDoggos.sortBy(_.name)

// Sort by two attributes
listOfDoggos.sortBy(doggo => (doggo.age, doggo.name))

// ---------------------
// sortWith
// ---------------------

def noiseLevel(breed: String): Int = breed match
    case "Husky" => 10
    case "Shiba Inu" => 8
    case "Labradoodle" => 4
    case "Borzoi" => 3

listOfDoggos.sortWith((x, y) => (noiseLevel(x.breed) > noiseLevel(y.breed)))

// ---------------------
// minBy, maxBy
// ---------------------

listOfDoggos.minBy(x => noiseLevel(x.breed))
listOfDoggos.maxBy(x => noiseLevel(x.breed))


// ---------------------
// A generic higher-order collection function
// ---------------------

def genericMap[T](xs: List[T], f: T => T): List[T] = xs match
    case Nil => Nil
    case y :: ys => f(y) :: genericMap(ys, f)

val myListInts: List[Int] = List(1, 2, 3, 4)
val myListStrings: List[String] = List("1", "2", "3", "4")
val myListDoubles: List[Double] = List(1.0, 2.0, 3.0, 4.0)

genericMap(myListInts, x => x * 2)
genericMap(myListStrings, x => x * 2)
genericMap(myListDoubles, x => x * 2)

// ---------------------
// Chaining functions
// ---------------------

// map + reduce
def mapReduce(xs: List[List[Int]]): List[Int] = xs match
    case Nil => Nil
    case y :: ys => y.map(x => x * x).reduce(_ + _) :: mapReduce(ys)

val myList5: List[List[Int]] = List(List(1, 2, 3), List(4, 5, 6), List(7, 8, 9))

mapReduce(myList5)

// zip + flatten + order by
def zipFlattenOrderBy(x: List[List[String]]): List[Tuple] = x match 
    case Nil => Nil
    case y :: ys => y.zip(ys.flatten(x => x)).sortBy(_._1)

val writerNames: List[String] = List("Emily", "Leo", "Charles", "Oscar", "Alexander", "Henry")
val writerSurnames: List[String] = List("Brontë", "Tolstoy", "Dickens", "Wilde", "Pushkin", "James")

val writerList: List[List[String]] = List(writerNames, writerSurnames)

zipFlattenOrderBy(writerList)
