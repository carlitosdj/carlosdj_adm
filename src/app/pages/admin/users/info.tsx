import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { loadLastClassRequest } from '../../../../store/ducks/component/actions'
import {User} from '../../../../store/ducks/me/types'
const MOMENT = require('moment')

interface handleCloseProps {
  handleClose: () => void
  child: User
}

const InfoUser = ({handleClose, child}: handleCloseProps) => {
  // const {id} = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadLastClassRequest(child.id!))
  }, [])
  const component = useSelector((state: ApplicationState) => state.component)
  let urlLastClass: string | undefined = ''
  let checkLastClass = component.lastclass?.extras?.filter((extra: any) => extra.keyExtra === 'url')[0] //Checa se tem o 'extra' de url.
  if (checkLastClass) urlLastClass = checkLastClass.valueExtra
  console.log("component",component)

  // var data = new Date(apiResponse.created_at*1000);
  let created_at = MOMENT(Number(child.created_at) * 1000) //.format('DD/MM/YYYY HH:mm')
  var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
  var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
  var dst = '$1.$2.$3-$4'
  var cpfformat = child.profile?.cpf?.replace(src, dst)

  return (
    <>
      {/* <h1>{child.username}</h1> */}

      
      {/* <p>Email: {child.email}</p>
      <p>CPF: {child.profile?.cpf}</p>
      <p>Whatsapp: {child.profile?.whatsapp}</p>
      {/* <p>{child.profile?.endereco}</p> *x/}
      <p>Endereço: {child.profile?.address}</p>
      <p>Número: {child.profile?.addressNumber}</p>
      <p>Bairro: {child.profile?.addressDistrict}</p>
      <p>CEP: {child.profile?.postalCode}</p>
      <p>Cidade: {child.profile?.addressCity}</p>
      <p>Estado: {child.profile?.addressState}</p>
      <p>País: {child.profile?.addressCountry}</p> */}
      {/* <span className='text-dark fw-bolder fs-6'>Nome: {child.profile?.name}</span>
      <br/><br/> */}
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-4'>
          <img 
            //src={users.user.profile?.image} 
            //src={ image?.includes('https://') ? image : '../../files/' + image}
            src={ child.profile?.image?.includes('https://') ? child.profile?.image : 'https://labiopalatina.com.br/files/' + child.profile?.image}
            style={{width: '100%'}}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://labiopalatina.com.br/media/guestuser.jpg";
            }}
          />
        </div>
        <div className='col-xxl-8'>
          <h1>{child.profile?.name}</h1>
          <span className='text-dark fw-bolder fs-6'>Email: {child.email}</span>
          <br/><br/>
          <span className='text-dark fw-bolder fs-6'>Whatsapp: {child.profile?.whatsapp}</span>
          <br/><br/>
          <span className='text-dark fw-bolder fs-6'>CPF: {cpfformat}</span>
          <br/><br/>
          <span className='text-dark fw-bolder fs-6'>Endereço: {child.profile?.address}, {child.profile?.addressNumber}, {child.profile?.addressDistrict} - {child.profile?.addressCity} / {child.profile?.addressState} / {child.profile?.addressCountry} - {child.profile?.postalCode}</span>
          <br/><br/>
          {/* <span className='text-dark fw-bolder fs-6'>Última renovação: {created_at!.format('DD/MM/YYYY HH:mm')}</span>
          <br/> */}

          Última renovação: {created_at.format('DD/MM/YYYY HH:mm')}
          {' / '}
          {now.diff(created_at, 'years', true) > 1? 'RENOVAÇÃO' : 'NO PRAZO'}
          {' / '}
          {(now.diff(created_at, 'years', true)*100).toFixed(2)}%
          <h6>{/* Criado em: {data.toLocaleDateString('pt-BR')} */}</h6>
          {component.error}
          Última aula assistida: {component.lastclass?.parent?.parent?.name} - {component.lastclass?.parent?.name} - {component.lastclass?.name}
          {/* <p></p> */}
          {/* <p>Está em quais cursos: </p> */}
        </div>
      </div>
      
      
    </>
  )
}
export default InfoUser
