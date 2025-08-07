// --------------------------
// Type classes in Scala
// Author: Pablo Aguirre
// --------------------------

// Defining a type-specific function
def addIntegers(xs: List[Int]): Int = {
    xs.reduceLeft(_ + _)
}

val myListIntegers: List[Int] = List(1, 2, 3, 4, 5, 6, 7, 8, 9)

addIntegers(myListIntegers)

// Try same operation with list of strings
// val myListStrings: List[String] = List("1", "2", "3", "4", "5", "6", "7", "8", "9")

// addIntegers(myListStrings)

// Defining a generic method
// def addGeneric[T](xs: List[T]): T = ???

// Defining implicits
def myExplicitMethod(x: Int): Int = 
    x * x

myExplicitMethod(7)

def myInferringMethod(implicit x: Int): Int = 
    x * x

implicit val myInt1: Int = 7

myInferringMethod

// Type classes & implicits together
trait SumOfLists[T]:
    def sumElements(xs: List[T]): T

implicit object SumOfInts extends SumOfLists[Int]:
    override def sumElements(xs: List[Int]): Int = xs.reduceLeft(_ + _)

implicit object SumOfFloats extends SumOfLists[Double]:
    override def sumElements(xs: List[Double]): Double = xs.reduceLeft(_ + _)
implicit object SumOfStrings extends SumOfLists[String]:
    override def sumElements(xs: List[String]): String = xs.mkString("")

def addGeneric[T](xs: List[T])(implicit addElements: SumOfLists[T]): T = 
    addElements.sumElements(xs)

val myListInts: List[Int] = List(1, 2, 3, 4, 5, 6)
val myListFloats: List[Double] = List(1.1, 2.2, 3.3, 4.4, 5.5, 6.6)
val myListStrings: List[String] = List("1", "2", "3", "4", "5", "6", "7", "8", "9")

addGeneric(myListInts)
addGeneric(myListFloats)
addGeneric(myListStrings)
// addGeneric(List(true, true, false))

// Example 1

// Example data structures
val exampleStructureOne = List(
    List(7, 14, 21, 28, 35),
    List(5, 1, 78, 43, 21)
    )

val exampleStructureTwo = List(
    List("Janusz", "Martha", "Emma"),
    List("Juarez", "Joan", "Dillon", "Leo")
)

val exampleStructureThree = Map(
    "Item 1" -> List(1, 2, 3, 4, 5),
    "Item 2" -> List(1, 2, 3, 4, 5),
    "Item 3" -> List(1, 2, 3, 4, 5),
    "Item 4" -> List(1, 2, 3, 4, 5),
    "Item 5" -> List(1, 2, 3, 4, 5)
)

val exampleStructureFour = Map(
    "Item 1" -> List("Virginia", "Woolf"),
    "Item 2" -> List("James", "Baldwin"),
    "Item 3" -> List("Thomas", "Hardy"),
    "Item 4" -> List("Clarice", "Lispector"),
    "Item 5" -> List("Edward", "Gibbon")
)

// Define a type class
trait parseData[T, S]:
    def extractData(obj: T): S

implicit object parseListInt extends parseData[List[List[Int]], List[Int]]:
    override def extractData(obj: List[List[Int]]): List[Int] = obj.flatten(x => x)

implicit object parseListString extends parseData[List[List[String]], List[String]]:
    override def extractData(obj: List[List[String]]): List[String] = obj.flatten(x => x)

implicit object parseMapInt extends parseData[Map[String, List[Int]], List[Int]]:
    override def extractData(obj: Map[String, List[Int]]): List[Int] = obj.values.flatMap(x => x).toList

implicit object parseMapString extends parseData[Map[String, List[String]], List[String]]:
    override def extractData(obj: Map[String, List[String]]): List[String] = obj.values.flatMap(x => x).toList

def getExtData[T, S](r: T)(implicit extractMethod: parseData[T, S]): S = 
    extractMethod.extractData(r)

getExtData(exampleStructureOne)
getExtData(exampleStructureTwo)
getExtData(exampleStructureThree)
getExtData(exampleStructureFour)

// Example 2

// Define classes
case class Rational(numer: Int, denom: Int)
case class Address(name: String, addr: String)

// Create instances
val myRationals = List(Rational(1,2), Rational(5,4), Rational(7,11))
val myAddressBook = List(Address("John", "Vienna"), Address("Emma", "Stockholm"), Address("Paul", "Budapest"))

trait Ordering[T]:
    def order(x: List[T]): List[T]

implicit object orderAddresses extends Ordering[Address]:
    override def order(x: List[Address]): List[Address] = 
        x.sortBy(y => y._2)

implicit object orderRationals extends Ordering[Rational]:
    override def order(x: List[Rational]): List[Rational] =
        x.sortBy(y => y.numer/y.denom)

def sortElements[T](element: List[T])(implicit orderingMethod: Ordering[T]): List[T] =
    orderingMethod.order(element)

sortElements(myAddressBook)
sortElements(myRationals)