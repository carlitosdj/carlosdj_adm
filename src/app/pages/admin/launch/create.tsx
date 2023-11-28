import React, {useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap-v5'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import {createComponentRequest, createLaunchRequest} from '../../../../store/ducks/component/actions'
import {Component as Comp, Launch} from '../../../../store/ducks/component/types'
import {ApplicationState} from '../../../../store'
import {CKEditor} from 'ckeditor4-react'
import ptBR from 'date-fns/locale/pt-BR'
import {registerLocale, setDefaultLocale} from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const MOMENT = require('moment')
require('moment-duration-format')

registerLocale('ptBR', ptBR)

// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string
}

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {

  const [name, setName] = useState('LANÇAMENTO SEMENTE #1')
  const [description, setDescription] = useState('Primeiro Lançamento - Carlitos')
  const [slug, setSlug] = useState('out23')

  const [eventName, setEventName] = useState('Conversão 360')
  const [eventHeadline, setEventHeadline] = useState('Do ZERO a agenda LOTADA em 30 dias. Evento Online e Gratuito.')
  const [eventDescription, setEventDescription] = useState('Aprenda o passo a passo para a atração de clientes em potencial para seu negócio. O evento acontece no dia 08/09/2023 às 20h.')
  const [expertName, setExpertName] = useState('Carlos Defelícibus Júnior')

  const [cartOpenDate, setCartOpenDate] = useState(new Date())
  const [cartCloseDate, setCartCloseDate] = useState(new Date())
 
  const [leadSignUpStartDate, setLeadSignUpStartDate] = useState(new Date())
  const [leadSignUpEndDate, setLeadSignUpEndDate] = useState(new Date())

  const [dateCpl1, setDateCpl1] = useState('')
  const [dateCpl2, setDateCpl2] = useState('')
  const [dateCpl3, setDateCpl3] = useState('')

  const [productName, setProductName] = useState('Agenda Full')
  const [productHeadline, setProductHeadline] = useState('Do ZERO a agenda LOTADA em 30 dias.')
  const [productDescription, setProductDescription] = useState('Aprenda o passo a passo para a atração de clientes em potencial para seu negócio.')
  const [productPrice, setProductPrice] = useState('12203')
  const [productInstallments, setProductInstallments] = useState('12')
  const [productVideo, setProductVideo] = useState('https://player.vimeo.com/video/786710754')
  const [productDiscount, setProductDiscount] = useState('1')
  const [productDiscountText, setProductDiscountText] = useState('De R$ 1299,00 por 12x R$ 79,90 (38% de desconto)')
  const [productWaitLink, setProductWaitLink] = useState('https://evento.violaofeeling.com.br/viawhats/espera')
  const [talktousLink, setTalktousLink] = useState('https://api.whatsapp.com/send?phone=5534992301304&text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20o%20treinamento%20Viol%C3%A3o%20Feeling.')

  const [validated, setValidated] = useState(false)

  // const {id} = useParams<ParamTypes>()
  const id = '3'
  // const history = useHistory();
  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)

  useEffect(() => {
    setDates(new Date())
  }, [])

  console.log('Component inside - create', component)

  const setDates = (date: Date) => {
    ////////////////START END - CARRINHO////////////////
    setCartOpenDate(date)

    var endDate = new Date(date)
    endDate.setDate(date.getDate() + 1)
    setCartCloseDate(endDate)
    /////////////////CPLS////////////////

    console.log('Date', date)
    var dateCpl1 = new Date(date)
    dateCpl1.setDate(date.getDate() - 7)
    setDateCpl1(dateCpl1.toString())

    var dateCpl2 = new Date(date)
    dateCpl2.setDate(date.getDate() - 5)
    setDateCpl2(dateCpl2.toString())

    var dateCpl3 = new Date(date)
    dateCpl3.setDate(date.getDate() - 3)
    setDateCpl3(dateCpl3.toString())
    /////////////////SUBSCRIBE////////////////

    var startSubscribeDate = new Date(date)
    //startSubscribeDate.setDate(startSubscribeDate.getDate() - 21);
    startSubscribeDate.setDate(startSubscribeDate.getDate() - 60)
    setLeadSignUpStartDate(startSubscribeDate)

    var endSubscribeDate = new Date(date)
    endSubscribeDate.setDate(endSubscribeDate.getDate() - 1)
    setLeadSignUpEndDate(endSubscribeDate)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (name) {
      //var data = new Date()
      // console.log('component to save:', component)
      // dispatch(createComponentRequest(component))
      const newLaunch: Launch = {
        name,
        description,
        slug,
        eventName,
        eventHeadline,
        eventDescription,
        expertName,
        cartOpenDate: MOMENT(cartOpenDate.toString()).format('DD/MM/YYYY HH:mm'),
        cartCloseDate: MOMENT(cartCloseDate.toString()).format('DD/MM/YYYY HH:mm'),
        leadSignUpStartDate: MOMENT(leadSignUpStartDate).format('DD/MM/YYYY HH:mm'),
        leadSignUpEndDate: MOMENT(leadSignUpEndDate).format('DD/MM/YYYY HH:mm'),
        dateCpl1: MOMENT(dateCpl1).format('DD/MM/YYYY HH:mm'),
        dateCpl2: MOMENT(dateCpl2).format('DD/MM/YYYY HH:mm'),
        dateCpl3: MOMENT(dateCpl3).format('DD/MM/YYYY HH:mm'),
        productName,
        productHeadline,
        productDescription,
        productPrice,
        productInstallments,
        productVideo,
        productDiscount,
        productDiscountText,
        productWaitLink,
        talktousLink,
        componentId: 3
      }
      console.log("newLaunch", newLaunch)
      dispatch(createLaunchRequest(newLaunch))
      handleClose()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label>Nome do lançamento</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='formDescription'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            placeholder=''
            //required
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            // as='textarea'
            // rows={2}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Slug. Ex: mai23</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={slug}
            onChange={(e: any) => setSlug(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o slug</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Nome do evento</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={eventName}
            onChange={(e: any) => setEventName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do evento
          </Form.Control.Feedback>
        </Form.Group>
        <br />


        <Form.Group controlId='fromName'>
          <Form.Label>eventHeadline</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={eventHeadline}
            onChange={(e: any) => setEventHeadline(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do evento
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        
        <Form.Group controlId='fromName'>
          <Form.Label>eventDescription</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={eventDescription}
            onChange={(e: any) => setEventDescription(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do evento
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Nome do expert</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={expertName}
            onChange={(e: any) => setExpertName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Data de abertura do carrinho</Form.Label>
          <DatePicker
            locale='ptBR'
            showTimeSelect
            dateFormat='dd/MM/yyyy HH:mm'
            //dateFormat="dd/MM/yyyy hh:mm"
            className='form-control'
            selected={cartOpenDate}
            onChange={(date: any) => setDates(date)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a data de abertura do carrinho
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Data de fechamento do carrinho</Form.Label>
          <DatePicker
            locale='ptBR'
            showTimeSelect
            dateFormat='Pp'
            //dateFormat="dd/MM/yyyy hh:mm"
            className='form-control'
            selected={cartCloseDate}
            onChange={(date: any) => setCartCloseDate(date)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a data de encerramento do carrinho
          </Form.Control.Feedback>
        </Form.Group>
        
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productName</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productName}
            onChange={(e: any) => setProductName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productHeadline</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productHeadline}
            onChange={(e: any) => setProductHeadline(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productDescription</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productDescription}
            onChange={(e: any) => setProductDescription(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productPrice</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productPrice}
            onChange={(e: any) => setProductPrice(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productInstallments</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productInstallments}
            onChange={(e: any) => setProductInstallments(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productVideo</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productVideo}
            onChange={(e: any) => setProductVideo(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productDiscount</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productDiscount}
            onChange={(e: any) => setProductDiscount(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productDiscountText</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productDiscountText}
            onChange={(e: any) => setProductDiscountText(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>productWaitLink</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={productWaitLink}
            onChange={(e: any) => setProductWaitLink(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>talktousLink</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={talktousLink}
            onChange={(e: any) => setTalktousLink(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        
        Início Inscrição Lead: {MOMENT(leadSignUpStartDate).format('DD/MM/YYYY')}
        <br />
        Fechamento Inscrição Lead: {MOMENT(leadSignUpEndDate).format('DD/MM/YYYY')}
        <br />
        <br />
        CPL1: {MOMENT(dateCpl1).format('DD/MM/YYYY')}
        <br />
        CPL2: {MOMENT(dateCpl2).format('DD/MM/YYYY')}
        <br />
        CPL3: {MOMENT(dateCpl3).format('DD/MM/YYYY')}
        <br />
        <br />
        Abertura Carrinho: {MOMENT(cartOpenDate).format('DD/MM/YYYY HH:mm')} <br />
        Fechamento Carrinho: {MOMENT(cartCloseDate).format('DD/MM/YYYY HH:mm')}
        <br />
        <br />
        <Button size='sm' variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>
      </Form>
      {/* Deixar o button fora do form.. */}
    </>
  )
}
export default Create
