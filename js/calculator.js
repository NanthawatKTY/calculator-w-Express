const express = require("express")
const bodyParser = require("body-parser")

const app = express()

//When you're trying to grab the information that gets posted to your server from an HTML form.
//Setting extended option => true, that basically just allows us to nested obj.
//By using urlencoded we can get access to the form data, and can tap into each of these 
// as if they were just properties of the obj body ex. { num1: '1', num2: '2', submit: '' }
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000
const dirname = "/WORKS/Coding/Calculator"

app.get('/', (req, res) => {
    //Give yhe file path of the current file. Unless the root option is set in the options object, path must be an absolute path to the file.
    // res.sendFile(__dirname + "/index.html")
    res.sendFile(dirname + "/index.html")
    
})

app.post('/', (req, res) => {

  //By using Body Parser, we're able to parse(แยกวิเคราะห์) the HTTP req that we get.
  // console.log(req.body.num1)

  var num1 = Number(req.body.num1)
  var num2 = Number(req.body.num2)

  var result = num1 + num2
  res.send(`The result is ${result}`)
})

//BMI
app.get("/bmicalculator", (req, res) => {
  res.sendFile(dirname + "/bmiCalculator.html")
})

app.post("/bmicalculator", (req, res) => {
  var w = parseFloat(req.body.weight)
  var h = parseFloat(req.body.height)

  var resultBMI = w / (h*h)
  var BMI = resultBMI.toFixed(2)
  var bmiDetail = bmi_detail(BMI)
  res.send(`Your BMI is ${BMI}. You are at ${bmiDetail}`)
})

//App listen
app.listen(port, () =>{
  console.log(`Your port now is ${port}`)  
})

//Function Check bni details
var bmi_detail = function bmiDetail(bmi) {
  if (bmi < 18.5) {
    return 'Underweight'
  } else if(bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal Weight'
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return 'Overweight'
  } else if(bmi >= 30.0){
    return 'Obese'
  }
}