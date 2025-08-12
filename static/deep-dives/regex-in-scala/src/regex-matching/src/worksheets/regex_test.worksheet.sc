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

val namePattern: String = """([A-Za-z]+), ?"""
val surnamePattern: String = """([A-Za-z]+), ?"""
val addressPattern: String = """([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+), ?"""
val professionPattern: String = """([A-Za-z ]+), ?"""
val agePattern: String = """(\d+|Immortal), ?"""
val emailPattern: String = """([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+), ?"""
val phonePattern: String = """((\d{1,2}-)?\d{3}-\d{3}-\d{4})"""

val completePattern: String = namePattern + surnamePattern + addressPattern + professionPattern + agePattern + emailPattern + phonePattern
val regexPattern: Regex = completePattern.r

//val regexPattern: Regex = """([A-Za-z]+), ?([A-Za-z]+), ?([A-Za-zÀ-úÀ-ÿÀ-ÖØ-öø-ÿ ']+), ?([A-Za-z ]+), ?(\d+|Immortal), ?([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+), ?((\d{1,2}-)?\d{3}-\d{3}-\d{4})""".r

val matches = regexPattern.findAllIn(myText).matchData

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