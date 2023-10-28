import { useEffect,useState } from "react"
import axios from 'axios'
import { Link} from "react-router-dom"


const Home = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
             axios.get("http://localhost:5000/users").then((res)=>{
                 console.log(res)
                setData(res.data.user)
            
            }).catch(err=>console.log(err))

        
        
    },[])
    
    const deleteItem = (id) => {
      axios.delete(`http://localhost:5000/delete/${id}`)
      .then(res=>{
        // console.log(res)
        location.reload()
      })
      .catch(err=>console.log(err))
      
    }
  return (
    <div className="d-flex vw-100 vh-100 bg-primary justify-content-center align-items-center">
      <div className="bg-white rounded p-3">
        <div className="d-flex justify-content-end"> 
            <Link to="/create" className="btn btn-success">Add-User +</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Pin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user,index) => {
              return (
                <tr key={index}>
                  <td>{user[1]}</td>
                  <td>{user[2]}</td>
                  <td>{user[3]}</td>
                  <td>{user[4]}</td>
                  <td>
                    <Link to={`/edit/${user[0]}`}>
                      <button className="btn btn-sm btn-primary">EDIT</button>
                    </Link>

                    <button onClick={()=>{
                      deleteItem(user[0])}} className="btn btn-sm btn-danger">DELETE</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Home