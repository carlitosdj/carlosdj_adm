import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap-v5'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import {createComponentRequest} from '../../../../store/ducks/component/actions'
import {Component as Comp} from '../../../../store/ducks/component/types'
import {ApplicationState} from '../../../../store'
import {CKEditor} from 'ckeditor4-react'

const MOMENT = require('moment')
require("moment-duration-format");

// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string
}

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState('')
  const [orderby, setOrderby] = useState('')
  const [tags, setTags] = useState('')
  const [duration, setDuration] = useState('00:00:00')
  const [ckEditor, setCkEditor] = useState(false)

  const [validated, setValidated] = useState(false)
  const {id} = useParams<ParamTypes>()
  // const history = useHistory();
  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)

  console.log('Component inside - create', component)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (name && description) {
      var data = new Date()
      const component: Comp = {
        name,
        description,
        order,
        componentId: + id!,
        //createdAt: (data.getTime() / 1000).toString(),
        status: "1",
        duration: MOMENT.duration(duration).asSeconds(),
        tags,
        orderby,
      }
      console.log('component to save:', component)
      dispatch(createComponentRequest(component))
      handleClose()
      // history.goBack()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label>Nome do componente</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e:any) => setName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Button size='sm' className='btn btn-info' onClick={() => setCkEditor(!ckEditor)}>
          Trocar editor
        </Button>
        <br />
        <br />
        {!ckEditor ? (
          <Form.Group controlId='formDescription'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              placeholder=''
              required
              value={description}
              onChange={(e:any) => setDescription(e.target.value)}
              as='textarea'
              rows={3}
            />
            <Form.Control.Feedback type='invalid'>
              Por favor informe a descrição
            </Form.Control.Feedback>
          </Form.Group>
        ) : (
          <CKEditor
            initData={description}
            onChange={(e: any) => setDescription(e.editor.getData())}
          />
        )}
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Ordem</Form.Label>
          <Form.Control placeholder='' value={order} onChange={(e:any) => setOrder(e.target.value)} />
          <Form.Control.Feedback type='invalid'>Por favor informe a ordem</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Duração</Form.Label>
          <Form.Control placeholder='' value={duration} onChange={(e:any) => setDuration(e.target.value)} />
          <Form.Control.Feedback type='invalid'>Por favor informe a duração</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Tags</Form.Label>
          <Form.Control placeholder='' value={tags} onChange={(e:any) => setTags(e.target.value)} />
          <Form.Control.Feedback type='invalid'>Por favor informe a duração</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Orderby</Form.Label>
          <Form.Control placeholder='' value={orderby} onChange={(e:any) => setOrderby(e.target.value)} />
          <Form.Control.Feedback type='invalid'>Informe o Orderby</Form.Control.Feedback>
        </Form.Group>
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
