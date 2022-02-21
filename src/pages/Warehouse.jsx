import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { warehouseApi } from '../api/warehouseApi';




const Warehouse = () => {
   const [name, setName] = useState('')
   const [address, setAddress]  = useState ('')
   const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [updateName, setUpdateName] = useState('')
   const [updateAddress, setUpdateAddress] = useState('')
   const [searchFilter, setSearchFilter] = useState('')
  


   const getAll = async () => {
      try {
         const res = await warehouseApi.getAll()
         res.data.warehouses ? setData(res.data.warehouses.reverse()): setData([])
         setIsLoading(true)
      } catch (err) {
         setData([])
      }
   }

   useEffect(() => {
      getAll()
   }, [])
   const  createWarehouse = async (e) =>{
      e.preventDefault()

      const check = {
         name: name.trim().length === 0,
         address:address.length === 0
      }

      if(check.name || check.address){
         toast.error("Barcha ma`lumotlarni to`ldirish shart!")
         return
      }
      const params = {
         name,
         address:String(address)
      }
      try {
         await warehouseApi.create(params)
         toast.success("Omborxona Yaratildi!")
         setName('')
         setAddress(' ')
         getAll()
      } catch (err) {
         console.log(err.response);
      }
   }
   const deleteWarehouse = async (e, id) =>{
      try {
         await warehouseApi.delete(id)
         toast.success("Omborxona Muvvafaqqiyatli O`chirildi!")
         getAll()
      } catch (err) {
         console.log(err)
      }
   }


   
   
      const updateWarehouse = async (e, id) => {
         e.preventDefault()
         const check = {
            name: updateName.trim().length === 0,
            address: updateAddress.length === 0
         }
   
         if (check.name || check.address) {
            toast.error("Barcha ma'lumotlar to'ldirishi shart")
            return
         }
   
         const params = {
            name: updateName,
            address: String(updateAddress)
         }
         try {
            await warehouseApi.update(id, params)
            toast.success("Omborxona tahrirlandi")
            window.location.reload()
         }catch (err) {
            console.log(err)
         }
         
      }
      
 const filter = data.filter(item => item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.address.toString().includes(searchFilter))
   return (
         <div id='layoutSidenav_content'>
            <main>
               <div className='container-fluid px-4 mt-4'>
                  <h3 className='fw-bold text-uppercase'><i className="fas fa-warehouse"></i> Warehouses</h3>
   
                  <form className='row' onSubmit={createWarehouse}>
                     <div className='col-lg-6 col-md-6 col-12 mb-3'>
                        <input type="text" className='form-control' placeholder='Warehouse name' value={name} onChange={e => setName(e.target.value)} />
                     </div>
                     <div className='col-lg-6 col-md-6 col-12 mb-3'>
                        <input type="text" className='form-control' placeholder='Warehouse Address' value={address} onChange={e => setAddress(e.target.value)}  />
                     </div>
                     <div className='col-lg-6 col-md-6 col-12 mb-3'>
                        <button className='btn btn-success'>
                           <i className='fas fa-plus'></i> Create
                        </button>
                     </div>
                  </form>
   
                  <div className='row'>
                     <div className="col-12">
                        <input type="text" className='form-control mb-3' placeholder='search warehouse name' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
                        {data.length > 0 ? (
                           <div className='table-responsive'>
                           {isLoading ? (
                                 <table className='table table-striped table-bordered table-hover text-center'>
                                    <thead>
                                       <tr>
                                          <th>#</th>
                                          <th>Warehouse Name</th>
                                          <th>Warehouse Address</th>
                                          <th>Update</th>
                                          <th>Delete</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {searchFilter.length > 0 ? (
                                          <>
                                             {filter.map((item, index) => (
                                                <tr key={index}>
                                                   <td>{index + 1}</td>
                                                   <td>{item.name}</td>
                                                   <td>{item.address}</td>
                                                   <td>
                                                      <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                         setUpdateName(item.name)
                                                         setUpdateAddress(item.address)
                                                      }} >
                                                         <i className='fas fa-edit'></i>
                                                      </button>
   
                                                      <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                         <div className="modal-dialog">
                                                            <div className="modal-content">
                                                               <div className="modal-header">
                                                                  <h5 className="modal-title"                   id="exampleModalLabel">Update Warehouses</h5>
                                                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                                               </div>
                                                               <div className="modal-body">
                                                                  <form>
                                                                     <div className='mb-3'>
                                                                        <input type="text" className='form-control' placeholder='Warehouse name' value={updateName} onChange={e => setUpdateName(e.target.value)} />
                                                                     </div>
                                                                     <div className='mb-3'>
                                                                        <input type="text" className='form-control' placeholder='Address' value={updateAddress} onChange={e => setUpdateAddress(e.target.value)}  />
                                                                     </div>
                                                                     <div className='mb-3'>
                                                                        <button className='btn btn-success d-block' onClick={e => {
                                                                           updateWarehouse(e, item._id)
                                                                        }}>
                                                                           <i className='fas fa-save'></i> Save
                                                                        </button>
                                                                     </div>
                                                                  </form>
                                                               </div>
                                                               <div className="modal-footer">
                                                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                               </div>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </td>
                                                   <td>
                                                      <button className='btn btn-danger mr-2' onClick={(e) => {
                                                         deleteWarehouse(e, item._id)
                                                      }}>
                                                         <i className='fas fa-trash'></i>
                                                      </button>
                                                   </td>
                                                </tr>
                                             ))}  
                                          </> 
                                       ): (
                                          <>
                                             {data.map((item, index) => (
                                             <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                   <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                      setUpdateName(item.name)
                                                      setUpdateAddress(item.address)
                                                   }} >
                                                      <i className='fas fa-edit'></i>
                                                   </button>
   
                                                   <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                      <div className="modal-dialog">
                                                         <div className="modal-content">
                                                            <div className="modal-header">
                                                               <h5 className="modal-title" id="exampleModalLabel">Update Warehouse</h5>
                                                               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                               <form>
                                                                  <div className='mb-3'>
                                                                     <input type="text" className='form-control' placeholder='Warehouse Name' value={updateName} onChange={e => setUpdateName(e.target.value)} />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <input type="text" className='form-control' placeholder='Warehouse address' value={updateAddress} onChange={e => setUpdateAddress(e.target.value)}  />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <button className='btn btn-success d-block' onClick={(e) => {
                                                                        updateWarehouse(e, item._id)
                                                                     }}>
                                                                        <i className='fas fa-save'></i> Save
                                                                     </button>
                                                                  </div>
                                                               </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </td>
                                                <td>
                                                   <button className='btn btn-danger mr-2' onClick={(e) => {
                                                      deleteWarehouse(e, item._id)
                                                   }}>
                                                      <i className='fas fa-trash'></i>
                                                   </button>
                                                </td>
                                             </tr>
                                          ))} 
                                          </> 
                                       )}
                                    </tbody>
                                 </table>
                              ): (
                                 <div>Loading...</div>
                              )}
                           </div>
                        ): (
                           <div className='alert alert-danger fw-bold text-center'>No data</div>
                        )}
                     </div>
                  </div>
               </div>
            </main>
         </div>
   )
                      
}


export default Warehouse;