const fs = require("fs");
const csv = require("csv-parser");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { v4: uuidv4 } = require("uuid");

exports.getUser = async (req, res, next) => {
   try {
    const path = 'data.csv'; 

    if (!fs.existsSync(path)) {
      return res.status(404).json({ success: false, message: "No user to display please add user" });
    }

    // Create an empty array to store parsed records
    const records = [];

    // Read the CSV file using a readable stream
    fs.createReadStream(path)
      .pipe(csv({ headers: false })) // Use { headers: false } if the file doesn't have headers
      .on('data', (data) => {
        // Process each record here
        // console.log(data)
        records.push(data);
      })
      .on('end', () => {
        res.status(200).json({ success: true, user: records });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
 } 
;

exports.postUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { name, email, city, pin } = req.body;

    if (!name || !email || !city || !pin) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const path = "data.csv";
     const uniqueID = uuidv4();
     const dataToAdd = {
       id: uniqueID, // Assign the generated ID
       name,
       email,
       city,
       pin
     };


    const csvWriter = createCsvWriter({
      path: path,
      header: [
    {id:'id',title:'ID'},
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "city", title: "City" },
        { id: "pin", title: "Pin" },
      ],
      append: true
    });

    // Write the data to the CSV file
    csvWriter
      .writeRecords([dataToAdd])
      .then(() => {
        // console.log("Data written to CSV file",dataToAdd);
        res.status(200).json({ success: true, message: "Data written to CSV" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

exports.getOneUser = async (req,res) => {
     try{
        const path = "data.csv"; // Replace with the path to your CSV file
        const requestedId = req.params.id; 
// console.log(requestedId);
        if (!fs.existsSync(path)) {
          return res
            .status(404)
            .json({ success: false, message: "CSV file not found" });
        }

        // Create a readable stream to read the CSV file
        const stream = fs.createReadStream(path);

        let foundUser = null;

        // Create a CSV parser
        stream
          .pipe(csv({ headers: false })) // Use { headers: true } if the file has headers
          .on("data", (data) => {
            // console.log(data[0])
            if (data[0] === requestedId) {
              // Check if the ID matches the requested ID
              foundUser = data;
            //   console.log(foundUser);
              res.status(200).json({ success: true, data: foundUser });
              stream.destroy(); // Stop parsing after finding the user
            }
          })
          .on("end", () => {   
            res.status(404)
                .json({ success: false, message: "User not found" });
            
          });
     }
    catch(err){
        console.log(err)
         res.status(500).json({ success: false, message: "An error occurred" });
    }
}

exports.editUser = async (req, res, next) => {
  try {
    const path = "data.csv"; // Replace with the path to your CSV file
    const {name,email,city,pin} = req.body
    const requestedId = req.params.id; 
    // console.log(requestedId);

    if (!fs.existsSync(path)) {
      return res
        .status(404)
        .json({ success: false, message: "CSV file not found" });
    }

     const updatedData = {
       0: requestedId, // Assign the generated ID
       1:name,
      2:email,
       3:city,
       4:pin,
     }; // The updated data received from the frontend

    const records = [];

    // Create a readable stream to read the CSV file
    const readStream = fs.createReadStream(path);

    readStream
      .pipe(csv({ headers: false }))
      .on("data", (data) => {
        if (data[0] === requestedId) {
          // If the ID matches the requested ID, update the record in memory
          records.push(updatedData);
        //   console.log(records);
          
        } else {
          records.push(data);
        }
      })
      .on("end", () => {
        // Write the updated records to the CSV file
    const writeStream = fs.createWriteStream(path);
//    console.log(records,"updated");
        // Write the CSV header
        // writeStream.write('id,name,email,city,pin\n');

        // Write each record to the CSV file
        records.forEach((record) => {
            // console.log(record , "record");
        writeStream.write(
          `${record[0]},${record[1]},${record[2]},${record[3]},${record[4]},\n`
        );
        });

        writeStream.end();
        res.status(200).json({ success: true, message: "Record updated successfully" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

exports.deleteUser = (req,res) => {
   try {
    const path = "data.csv"; // Replace with the path to your CSV file
    const requestedId = req.params.id; // Assuming the ID is passed as a URL parameter
    // console.log(requestedId);

    if (!fs.existsSync(path)) {
      return res
        .status(404)
        .json({ success: false, message: "CSV file not found" });
    }

    

    const records = [];

    // Create a readable stream to read the CSV file
    const readStream = fs.createReadStream(path);

    readStream
      .pipe(csv({ headers: false }))
      .on("data", (data) => {
        if (data[0] !== requestedId) {
          // If the ID matches the requested ID, update the record in memory
         records.push(data);
        //   console.log(records);
        }  
     
      })
      .on("end", () => {
        // Write the updated records to the CSV file
    const writeStream = fs.createWriteStream(path);

        // Write the CSV header
        // writeStream.write('id,name,email,city,pin\n');

        // Write each record to the CSV file
        records.forEach((record) => {
            // console.log(record , "record");
        writeStream.write(
          `${record[0]},${record[1]},${record[2]},${record[3]},${record[4]},\n`
        );
        });

        writeStream.end();
        res.status(200).json({ success: true, message: "Record deleted successfully" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};


