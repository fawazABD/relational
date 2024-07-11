const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
const CONNECTION_URL = 'mongodb+srv://blogs:mongodb@cluster0.cjxtcqa.mongodb.net/database_name?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MONGODB CONNECTION SUCCESSFUL');
}).catch((error) => {
  console.log(error);
});

// Define the schemas
const hotelSchema = new mongoose.Schema({
  Hotel_Id: { type: Number, required: true, unique: true },
  Hotel_name: { type: String, required: true },
});

const employeeSchema = new mongoose.Schema({
  Employee_Id: { type: Number, required: true, unique: true },
  Employee_Name: { type: String, required: true },
  Employee_Speciality: { type: String, required: true },
  Hotel_Id: { type: Number, ref: 'Hotel' },
  Manager_Id: { type: Number, ref: 'Employee' },
});

const typeSchema = new mongoose.Schema({
  Type_Id: { type: Number, required: true, unique: true },
  Type_Name: { type: String, required: true },
});

const roomSchema = new mongoose.Schema({
  Room_Id: { type: Number, required: true, unique: true },
  Floor: { type: Number, required: true },
  Type_Id: { type: Number, ref: 'Type' },
  Category_Id: { type: Number, ref: 'Category' },
});

const categorySchema = new mongoose.Schema({
  Category_Id: { type: Number, required: true, unique: true },
  Category_Name: { type: String, required: true },
  Price: { type: Number, required: true },
  Beds_numbers: { type: Number, required: true },
});

const hotelTypeSchema = new mongoose.Schema({
  Hotel_Id: { type: Number, ref: 'Hotel' },
  Type_Id: { type: Number, ref: 'Type' },
});

// Define the models
const Hotel = mongoose.model('Hotel', hotelSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Type = mongoose.model('Type', typeSchema);
const Room = mongoose.model('Room', roomSchema);
const Category = mongoose.model('Category', categorySchema);
const HotelType = mongoose.model('HotelType', hotelTypeSchema);

// API endpoints to handle data submission
app.post('/hotels', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).send(hotel);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/types', async (req, res) => {
  try {
    const type = new Type(req.body);
    await type.save();
    res.status(201).send(type);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/hoteltypes', async (req, res) => {
  try {
    const hotelType = new HotelType(req.body);
    await hotelType.save();
    res.status(201).send(hotelType);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});