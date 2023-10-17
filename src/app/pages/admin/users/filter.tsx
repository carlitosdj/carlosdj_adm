import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { loadLastClassRequest } from '../../../../store/ducks/component/actions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {User} from '../../../../store/ducks/me/types'
import { Button, Form } from 'react-bootstrap-v5'
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import { filterUserRequest, selectUsersRemoveRequest } from '../../../../store/ducks/users/actions'

registerLocale('ptBR', ptBR)
const MOMENT = require('moment')

interface handleCloseProps {
  handleClose: () => void
}

const Filter = ({handleClose}: handleCloseProps) => {
  // const {id} = useParams();
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateInt, setStartDateInt] = useState(0);
  const [endDateInt, setEndDateInt] = useState(0);
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    console.log('handleSubmit')
    console.log("Filters", { startDateInt, endDateInt})

    dispatch(filterUserRequest(startDateInt, endDateInt))

    //Assim que selecionar um filtro: remove os usuarios que estao marcados
    users.data.map((child)=>{
      dispatch(selectUsersRemoveRequest(child))
    })

    handleClose()

  }
  const setStartDateFunc = (data:any) => {
    console.log("dataStart",data)
    const d1 = new Date(data);
    console.log(d1);

    // converting to number
    const result = d1.getTime()/1000;
    setStartDateInt(result)
    setStartDate(data)
  }
  const setEndDateFunc = (data:any) => {
    console.log("dataEnd",data)
    const d1 = new Date(data);
    console.log(d1);

    // converting to number
    const result = d1.getTime()/1000;
    console.log("dataEnd",result)
    setEndDateInt(result)
    setEndDate(data)
  }

  useEffect(() => {

    //Se nao tiver dados da redux: seta ontem e hoje como data range:
    if(users.filterStartDate && users.filterEndDate) {

      setStartDate(new Date(users.filterStartDate * 1000))
      setStartDateInt(users.filterStartDate)
      setEndDate(new Date(users.filterEndDate * 1000))
      setEndDateInt(users.filterEndDate)

    } else {
      const d1 = new Date();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setStartDate(yesterday)
      setStartDateInt(Math.floor(yesterday.getTime()/1000))
      setEndDate(d1)
      setEndDateInt(Math.floor(d1.getTime()/1000))
    }


  }, [])
  const users = useSelector((state: ApplicationState) => state.users)
  console.log("user", users)
  return (
    <>
     <Form validated={validated} onSubmit={handleSubmit}>
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-12'>
          {/* <span className='text-dark fw-bolder fs-6'>Última renovação: {created_at!.format('DD/MM/YYYY HH:mm')}</span>
          <br/> */}
          Data início:
          <DatePicker 
            locale="ptBR"
            //showTimeSelect
            //dateFormat="Pp" 
            dateFormat="dd/MM/yyyy"
            className='form-control' 
            selected={startDate} 
            onChange={(date:any) => setStartDateFunc(date)} 
          />
          {/* {startDateInt} {users.filterStartDate} */}
          <br/><br/>
          Data Fim:
          <DatePicker 
            locale="ptBR"
            //showTimeSelect
            //dateFormat="Pp" 
            dateFormat="dd/MM/yyyy"
            className='form-control' 
            selected={endDate} 
            onChange={(date:any) => setEndDateFunc(date)} 
          />
          {/* {endDateInt} {users.filterEndDate} */}
          <br/><br/>
          <Button variant='primary' type='submit'>
            Filtrar
          </Button>
        </div>
      </div>
      </Form>
      
      
    </>
  )
}
export default Filter
