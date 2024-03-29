import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { loadLastClassRequest } from '../../../../store/ducks/component/actions'
import {User} from '../../../../store/ducks/me/types'
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint'




const MOMENT = require('moment')

interface handleCloseProps {
  handleClose: () => void
}

const ExportUser = ({handleClose}: handleCloseProps) => {
  
  // const {id} = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    
  }, [])
  const users = useSelector((state: ApplicationState) => state.users)
  console.log("user", users)
  
  const componentRef = useRef(null);
  const pageStyle = `{ size: 2.5in 4in }`;

  return (
    <>
      {/* <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} /></div>
      <button onClick={handlePrint}>Print this out!</button> */}
      <ReactToPrint
        trigger={() => <button className='btn btn-primary'>Imprimir</button>}
        content={() => componentRef.current}
        pageStyle={pageStyle}
      />
      <br/>
      <div style={{ display: 'none'}}><ComponentToPrint ref={componentRef} data={users.selectedUsers} /></div>
      <br/>
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-12'>

          <span>Dados: {users.selectedUsers.length}</span>
          <br/><br/>
          {/* <span className='text-dark fw-bolder fs-6'>Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}</span>
          <br/> */}
          {users.selectedUsers.map((user => {
            // var data = new Date(apiResponse.createdAt*1000);
            let createdAt = MOMENT(Number(user.createdAt) * 1000) //.format('DD/MM/YYYY HH:mm')
            var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
            var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
            var dst = '$1.$2.$3-$4'
            var cpfformat = user.cpf?.replace(src, dst)
            return (
              <div>
                
                  
              <h1>{user.name}</h1>
              <span className='text-dark fw-bolder fs-6'>Email: {user.email}</span>
              <br/>
              <span className='text-dark fw-bolder fs-6'>Whatsapp: {user.whatsapp}</span>
              <br/>
              <span className='text-dark fw-bolder fs-6'>CPF: {cpfformat}</span>
              <br/>
              <span className='text-dark fw-bolder fs-6'>Endereço: {user.address}, {user.addressNumber}, {user.addressDistrict} - {user.addressCity} / {user.addressState} / {user.addressCountry} - {user.postalCode}</span>
              <br/>
              <span className='text-dark fw-bolder fs-6'>Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}</span>
              <br/><br/><br/>

              {/* Última renovação: {createdAt.format('DD/MM/YYYY HH:mm')} */}
              </div>
            )
          }))}
        
          {/* <p></p> */}
          {/* <p>Está em quais cursos: </p> */}
        </div>
      </div>
      
      
    </>
  )
}
export default ExportUser
