import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {loadLastClassRequest} from '../../../../store/ducks/component/actions'
import {User} from '../../../../store/ducks/me/types'
import Loading from '../../../loading'
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
  let checkLastClass = component.lastclass?.extras?.filter(
    (extra: any) => extra.keyExtra === 'url'
  )[0] //Checa se tem o 'extra' de url.
  if (checkLastClass) urlLastClass = checkLastClass.valueExtra
  console.log('component', component)

  // var data = new Date(apiResponse.createdAt*1000);
  let createdAt = MOMENT(child.createdAt) //.format('DD/MM/YYYY HH:mm')
  var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
  var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
  var dst = '$1.$2.$3-$4'
  var cpfformat = child.cpf?.replace(src, dst)

  //return <div>oi</div>
  return (
    <>
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-4'>
          <img
            //src={users.user.image}
            //src={ image?.includes('https://') ? image : '../../files/' + image}
            src={
              child.image?.includes('https://')
                ? child.image
                : 'https://institutodefelicibus.com.br/files/' + child.image
            }
            style={{width: '100%'}}
            onError={({currentTarget}) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = 'https://labiopalatina.com.br/media/guestuser.jpg'
            }}
          />
        </div>
        <div className='col-xxl-8'>
          <h1>{child.name}</h1>
          <br />
          <div>
            <span className='text-dark fw-bolder fs-6'>Email:</span> {child.email}
          </div>
          <div>
            <span className='text-dark fw-bolder fs-6'>WhatsApp:</span> {child.whatsapp}
          </div>
          <div>
            <span className='text-dark fw-bolder fs-6'>CPF:</span> {cpfformat}
          </div>
          <div>
            <span className='text-dark fw-bolder fs-6'>Endereço:</span> {child.address},{' '}
            {child.addressNumber}, {child.addressDistrict} - {child.city?.name} /{' '}
            {child.state?.state} - {child.postalCode}
          </div>
          <br />
          <span className='text-dark fw-bolder fs-6'>Última renovação:</span>{' '}
          {createdAt.format('DD/MM/YYYY HH:mm')}
          {' / '}
          {now.diff(createdAt, 'years', true) > 1 ? 'RENOVAÇÃO' : 'NO PRAZO'}
          {' / '}
          {(now.diff(createdAt, 'years', true) * 100).toFixed(2)}%{/* {component.error} */}
          <br />
          <br />
          {component.loadingLastClass ? (
            <Loading />
          ) : (
            <div>
              <span className='text-dark fw-bolder fs-6'>Última aula assistida:</span>{' '}
              {component.lastclass?.parent?.parent?.name} - {component.lastclass?.parent?.name} -{' '}
              {component.lastclass?.name}
              <br />
              <br />
            </div>
          )}
          <span className='text-dark fw-bolder fs-6'>Último login:</span>{' '}
          {MOMENT(child.lastLoginAt).format('DD/MM/YYYY HH:mm')}
        </div>
      </div>
    </>
  )
}
export default InfoUser
