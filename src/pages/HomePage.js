import React, {useEffect , useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd'
import EmpList from '../components/EmpList'
import './../styles/LayoutStyles.css'

const HomePage = () => {

  const [doctors , setDoctors]= useState([])
  //Login User Data
const getUserData = async() => {
try {
  const res = await axios.get('/api/v1/user/getAllEmp',{
    headers:{
      Authorization : "Bearer " + localStorage.getItem("token"),
    }
  })

  if(res.data.success){
    setDoctors(res.data.data)
  }
} catch (error) {
  console.log(error)
}
}

// useEffect(() => {
//   getUserData();
// }, []);

// // Check if the user is an admin
// const isAdmin = () => {
//   // Replace the following condition with your actual logic to determine if the user is an admin
//   const userRole = localStorage.getItem('userRole'); // Assuming you store the user's role in localStorage
//   return userRole === 'admin';
// };

// // Render the component only for non-admin users
// if (isAdmin()) {
//   return (
//     <Layout>
//       <h1 className='text-center'>HomePage</h1>
//       <Row>
//         {doctors &&
//           doctors.map((doctor) => <EmpList doctor={doctor} />)}
//       </Row>
//     </Layout>
//   );
// } else {
//   return <div>You are not authorized to view this page.</div>;
// }
// }



useEffect(() => {
  getUserData()
}, [])
  return (
    <Layout>
      <h1 className='text-center'>HomePage</h1>
      <Row>
        {doctors && doctors.map((doctor) => 
          <EmpList doctor={doctor}/>
        )}
      </Row>
    </Layout>
  )
}

export default HomePage
