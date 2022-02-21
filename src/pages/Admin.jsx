import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { adminApi } from '../api/adminApi'



const Admin = () => {

   const[username, setUsername] = useState('')
   const[fullName, setFullName] = useState('')
   const[password, setPassword] = useState('')
   const[role, setRole] = useState('')
   // const[data, setData] = useState([])
   // const[isLoading, setIsLoading] = useState (false)
   // const[searchFilter, setSearchFilter] =useState ('')

   // const getAll = async () => {
   //    try {
   //       const res = await adminApi.getAll()
   //       res.data.register ? setData(res.data.register.reverse()): setData([])
   //       setIsLoading(true)
   //    } catch (err) {
   //       setData([])
   //    }
   // }

   // useEffect(() => {
   //    getAll()
   // }, [])

   const  createAdmin = async (e) =>{
      e.preventDefault()
      
      const check = {
         username: username.trim().length === 0,
         fullName:fullName.length === 0,
         password:password.length === 0,
         role:role.length ==0

      }

      if(check.username || check.fullName || check.password || check.role){
         toast.error("Barcha ma`lumotlarni to`ldirish shart!")
         return
      }
      const params = {
         username,
         fullName:fullName,
         password:password,
         role:Number(role)
      }
      try {
         await adminApi.create(params)
         toast.success("Admin  Yaratildi!")
         setUsername('')
         setFullName(' ')
         setRole('')
         setPassword('')
         getAll()
         
      } catch (err) {
         console.log(err.response);
      }
   }


   

  return (
      <div id='layoutSidenav_content'>
         <main>
            <div className="container">
                  <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                     <div className="card-header"><h3 className="text-center font-weight-light my-4"><i className="fas fa-user-cog"></i> Admin qo`shish</h3></div>
                     <div className="card-body">
                        <form onSubmit={createAdmin}>
                           <div className="form-floating  mb-3">
                              <input className="form-control" id="inputEmail" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                              <label htmlFor="inputEmail">Username</label>
                           </div>
                           <div className="form-floating mb-3 ">
                              <input className="form-control" type="text" placeholder="fullName" value={fullName} onChange={e => setFullName(e.target.value)} />
                              <label htmlFor="inputPassword">Full Name</label>
                           </div>
                           <div className="select-floating mb-3">
                           <select class="form-select" value={role} onChange={e => setRole(e.target.value)}>
                              <option selected>Role</option>
                              <option value="100">100</option>
                              <option value="99">99</option>
                              <option value="98">98</option>
                           </select>
                           </div>
                           <div className="form-floating mb-3">
                              <input className="form-control" id="inputPassword" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                              <label htmlFor="inputPassword">Password</label>
                           </div>
                           <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                              <button className="btn btn-primary"> <i className='fas fa-plus'></i> Create</button>
                           </div>
                     </form>
                  </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   </div>
  )
}

export default Admin;
