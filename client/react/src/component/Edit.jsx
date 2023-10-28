import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const {id} = useParams()
    // console.log(id);
    const [values, setValues] = useState({
      name: "",
      email: "",
      city: "",
      pin: "",
    });
    useEffect(() => {
      // Fetch the existing data for the record with the given ID
      axios
        .get(`http://localhost:5000/getUser/${id}`) // Adjust the URL as needed
        .then((response) => {
            // console.log(response)
           
          setValues({
            ...values,
            name: response.data.data[1],
            email: response.data.data[2],
            city: response.data.data[3],
            pin: response.data.data[4],
          }); // Set the form values with the existing data
        })
        .catch((error) => {
          console.error(error);
        });
    }, [id]);
     const navigate = useNavigate();
    const handleUpdate = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:5000/edit/${id}`, values)
        .then(res=>{
            console.log(res);
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    const handleChange = (e) =>
      setValues({ ...values, [e.target.name]: e.target.value });
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Update Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Update Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-control"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Update City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              className="form-control"
              value={values.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Update PIN</label>
            <input
              type="text"
              name="pin"
              placeholder="Enter PIN"
              className="form-control"
              value={values.pin}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Edit