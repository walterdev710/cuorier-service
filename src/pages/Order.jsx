import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import {orderApi} from '../api/orderApi'
import {clientApi} from '../api/clientApi'
import {warehouseApi} from '../api/warehouseApi'

const Order = () => {
  const[barcode, setBarcode] = useState('')
  const[weight, setWeight] = useState('')
  const[client, setClient] = useState('')
  const[warehouse, setWarehouse] = useState('') 
  const[status, setStatus] = useState ('')
  const[data, setData] = useState([])
  const[isLoading, setIsLoading] = useState('')
//   const[updateClient, setUpdateClient] = useState('')
//   const[updateWarehouse, setUpdateWarehouse] =useState('')
  const[updateBarcode, setUpdateBarcode] = useState('')
  const[updateWeight, setUpdateWeight] = useState('')
  const[updateStatus, setUpdateStatus] = useState('')
  const[searchFilter, setSearchFilter] = useState('')
  const[clients, setClients] = useState([])
  const[isClients, setIsClients] = useState (false)
  const[warehouses, setWarehouses] = useState ([])
  const[isWarehouses, setIsWarehouses] =useState(false)




  
   //getAll clients
   const getClients = async () => {
      try {
         const res = await clientApi.getAll()
         setClients(res.data.clients)
         setIsClients(true)
      }catch (err) {
         console.log(err.response)
      }
   }

   useEffect(() => {
      getClients()
   }, [])

   // getAll warehouses

   const getWarehouses = async () => {
      try {
         const res = await warehouseApi.getAll()
         setWarehouses(res.data.warehouses)
         setIsWarehouses(true)
      } catch (err) {
         console.log(err.response)
      }
   }

   useEffect(() => {
      getWarehouses()
   }, [])


  
  // get all Order
 const getAll = async () => {
    try {
       const res = await orderApi.getAll()
       res.data.orders ? setData(res.data.orders.reverse()): setData([])
       setIsLoading(true)
    } catch (err) {
       setData([])
    }
 }

 useEffect(() => {
    getAll()
 }, [])

//  create order
const  createOrder = async (e) =>{
  e.preventDefault()

  const check = {
    barcode:barcode.trim().length === 0,
    weight:weight.length === 0,
    client:client.length === 0,
    warehouse:warehouse.length === 0,
    status:status.length === 0
    // status:status.length === 0

  }

  if(check.barcode || check.weight ||check.status ){
     toast.error("Barcha ma`lumotlarni to`ldirish shart!")
     return
  }
  const params = {
     barcode:barcode,
     weight:Number(weight),
     client:client,
     warehouse:warehouse,
     status:Number(status)
  }
  try {
     await orderApi.create(params)
     toast.success("Buyurtma yaratildi!")
     setBarcode('')
     setWeight('')
     setStatus('')
   //   setClient('')
   //   setWarehouse('')
     getAll()
  } catch (err) {
     console.log(err.response);
  }
}

// delete order

const deleteOrder = async (e, id) =>{
  try {
     await orderApi.delete(id)
     toast.success("Buyurtma  o`chirildi!")
     getAll()
  } catch (err) {
     console.log(err)
  }
}

// Update Order

const updateOrder = async (e, id) => {
  e.preventDefault()
  const check = {
    barcode:updateBarcode.trim().length === 0,
    weight:updateWeight.length === 0,
   //  client:updateClient.trim().length ===0,
   //  warehouse:updateWarehouse.length ===0
    
    status:updateStatus.length === 0

  }

  if(check.barcode || check.weight  ){
     toast.error("Barcha ma`lumotlarni to`ldirish shart!")
     return
  }
  const params = {
     barcode:Number(updateBarcode),
     weight:Number(updateWeight),
     status:Number(status)
     
  }
  try {
     await orderApi.update(params)
     toast.success("Buyurtma muvaffaqiyatli tahrirlandi!")
     window.location.reload()
  } catch (err) {
     console.log(err.response);
  }
}


  
  return (
    <div id='layoutSidenav_content'>
      <main>
        <div className="container-fluid px-4 mt-4">
          <h3 className='fw-bold text-uppercase'> <i className="fas fa-shopping-cart"></i> Orders</h3>
              <form className='row' onSubmit={createOrder}>
              <div className='col-lg-6 col-md-6 col-12 mb-3'>
               <input type="text" className='form-control' placeholder='Barcode' value={barcode} onChange={e => setBarcode(e.target.value)} />
               </div>
               <div className='col-lg-6 col-md-6 col-12 mb-3'>
               <input type="number" className='form-control' placeholder='Weight' value={weight} onChange={e => setWeight(e.target.value)} />
               </div>
                <div className='col-lg-6 col-md-6 mb-3'>
               <select className="form-control" value={client} onChange={e => setClient(e.target.value)}>
                  <option value="">Client Number</option>
                  {isClients && (
                     clients.map((item, index) => (
                        <option key={index} value={item._id} > {item.number}</option>
                     ))
                     
                  )}
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 mb-3">
                <select className="form-control" value={warehouse} onChange={e=> setWarehouse(e.target.value)}>
                  <option value="">Warehouse Name</option>
                  {isWarehouses && (
                     warehouses.map((item, index) => (
                        <option key={index} value={item._id} > {item.name}</option>
                     ))
                  )}
                  </select>
                </div>
                <div className='col-lg-6 col-md-6 col-12 mb-3'>
               <input type="number" className='form-control' placeholder='status' value={status} onChange={e => setStatus(e.target.value)} />
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
                                          <th>Order Barcode</th>
                                          <th>Order Weight</th>
                                          <th>Client Number</th>
                                          <th>Warehouse Name</th>
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
                                                   <td>{item.barcode}</td>
                                                   <td>{item.weight}</td>
                                                   <td>{item.clients.number}</td>
                                                   <td>{item.warehouses.name}</td>
                                                   <td>
                                                      <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                         setUpdateBarcode(item.setClientId._id)
                                                         setUpdateWeight(item.weight)
                                                      }} >
                                                         <i className='fas fa-edit'></i>
                                                      </button>
   
                                                      <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                         <div className="modal-dialog">
                                                            <div className="modal-content">
                                                               <div className="modal-header">
                                                                  <h5 className="modal-title"                   id="exampleModalLabel">Update Order</h5>
                                                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                                               </div>
                                                               <div className="modal-body">
                                                                  <form>
                                                                     <div className='mb-3'>
                                                                        <input type="text" className='form-control' placeholder='Order Barcode' value={updateBarcode} onChange={e => setUpdateBarcode(e.target.value)} />
                                                                     </div>
                                                                     <div className='mb-3'>
                                                                        <input type="text" className='form-control' placeholder='Order Weight' value={updateWeight} onChange={e => setUpdateWeight(e.target.value)}  />
                                                                     </div>
                                                                     <div className='mb-3'>
                                                                        <button className='btn btn-success d-block' onClick={e => {
                                                                           updateOrder(e, item._id)
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
                                                         deleteOrder(e, item._id)
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
                                                <td>{item.barcode}</td>
                                                <td>{item.weight}</td>
                                                <td>
                                                   <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                      setUpdateBarcode(item.barcode)
                                                      setUpdateWeight(item.weight)
                                                      
                                                   }} >
                                                      <i className='fas fa-edit'></i>
                                                   </button>
   
                                                   <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                      <div className="modal-dialog">
                                                         <div className="modal-content">
                                                            <div className="modal-header">
                                                               <h5 className="modal-title" id="exampleModalLabel">Update Order</h5>
                                                               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                               <form>
                                                                  <div className='mb-3'>
                                                                     <input type="text" className='form-control' placeholder='Order Barcode' value={updateBarcode} onChange={e => setUpdateBarcode(e.target.value)} />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <input type="text" className='form-control' placeholder='Order Weight' value={updateWeight} onChange={e => setUpdateWeight(e.target.value)}  />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <button className='btn btn-success d-block' onClick={(e) => {
                                                                        updateOrder(e, item._id)
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
                                                      deleteOrder(e, item._id)
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


export default Order;