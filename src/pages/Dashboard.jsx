import React from 'react'
import { Link } from 'react-router-dom'



export const Dashboard = () => {
   return (
      <div id='layoutSidenav_content'>
         <main>
            <div className='container-fluid px-4 mt-4'>
               <div className='row'>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     
                     <div class="card bg-success text-white mb-4">
                        <div class="card-body"><i className="fas fa-shopping-cart"></i> Orders</div>
                           
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link"  to="orders"> View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     <div class="card bg-success text-white mb-4">
                        <div class="card-body"><i className="fas fa-helicopter"></i> Flights</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link" to="flights">View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     <div class="card bg-success text-white mb-4">
                        <div class="card-body"> <i className="fas fa-plane"></i> Airports</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link" to="airports">View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     <div class="card bg-success text-white mb-4">
                        <div class="card-body"><i className="fas fa-user-cog"></i> Admin Register</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link  "  to="admin" >View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}
