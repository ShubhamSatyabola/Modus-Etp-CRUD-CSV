import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [values, setValues] = useState({
        name:"",
        email:"",
        city:"",
        pin:"",
    })
    const navigate = useNavigate()
    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/post-user',values)
        .then(res=>{
            console.log(res)
            navigate('/')
        
        })
        .catch(err=>console.log(err))
    }
    const handleChange = (e) => setValues({...values,[e.target.name]:e.target.value})
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">PIN</label>
            <input
              type="text"
              name="pin"
              placeholder="Enter PIN"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default Create