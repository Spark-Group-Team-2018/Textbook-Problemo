# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

dummy_manufacturer = Manufacturer.create(name: "none", description: "does not exist")

books = Book.create([
  {
   ISBN: 9780486404530,
   title: "Calculus: An Intuitive and Physical Approach (Second Edition) (Dover Books on Mathematics)",
   description: "A Calculus book"
  },
  {
    ISBN: 9780321573513,
    title: "Algorithms (4th Edition)",
    description: "You need this for Comp Sci"
  },
  {
    ISBN: 9781524710170,
    title: "Cracking the AP U.S. Government & Politics Exam 2018, Premium Edition (College Test Preparation)",
    description: "Useful for AP Gov"
  }
])
