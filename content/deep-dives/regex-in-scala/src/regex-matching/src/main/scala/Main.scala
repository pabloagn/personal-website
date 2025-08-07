import java.io.{File, FileWriter}
import org.apache.commons.csv.{CSVFormat, CSVParser}
import scala.util.matching.Regex
import scala.collection.JavaConverters._

@main def runMatcher: Unit = {
  // Define directories
  val rDir: String = "C:/Users/Pablo/OneDrive/Documents/Deep Dives/computer-science/regex-in-scala/regex-matching/utils/characters.csv"
  val wDir: String = "C:/Users/Pablo/OneDrive/Documents/Deep Dives/computer-science/regex-in-scala/regex-matching/utils/characters_processed.txt"
  
  // Define RegEx groups
  val namePattern: String = """([A-Za-z]+), ?"""
  val surnamePattern: String = """([A-Za-z]+), ?"""
  val addressPattern: String = """([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+), ?"""
  val professionPattern: String = """([A-Za-z ]+), ?"""
  val agePattern: String = """(\d+|Immortal), ?"""
  val emailPattern: String = """([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+), ?"""
  val phonePattern: String = """((\d{1,2}-)?\d{3}-\d{3}-\d{4})"""

  // Concatenate & build final RegEx
  val completePattern: String = namePattern + surnamePattern + addressPattern + professionPattern + agePattern + emailPattern + phonePattern
  val regexPattern: Regex = completePattern.r
//  val regexPattern: Regex = 
//  """([A-Za-z]+),\s*([A-Za-z]+),\s*([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+),\s*([A-Za-z ]+),\s*(\d+|Immortal),\s*([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+),\s*((\d{1,2}-)?\d{3}-\d{3}-\d{4})""".r
    
  writeData(rDir, wDir, regexPattern)
}

// Defining our reading function
def readCsvFile(readPath: String): List[String] = {
  val file = new File(readPath)
  val parser = CSVParser.parse(file, java.nio.charset.StandardCharsets.UTF_8, CSVFormat.DEFAULT)
  val records = parser.getRecords.asScala.toList
  parser.close()
  records.map(_.toString)
}

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

def writeData(readPath: String, writePath: String, regexPattern: Regex): Unit = {
  val data: List[String] = matchData(readPath, regexPattern)
  val fileWriter = new FileWriter(writePath)
  data.foreach(record => fileWriter.write(record + "\n"))
  fileWriter.close()
}