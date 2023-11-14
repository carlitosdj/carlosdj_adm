import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap-v5'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {updateComponentRequest} from '../../../../store/ducks/component/actions'
import {CKEditor} from 'ckeditor4-react'
import {Component} from '../../../../store/ducks/component/types'

const MOMENT = require('moment')
require('moment-duration-format')

interface handleCloseProps {
  handleClose: () => void
  child: Component
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const component = useSelector((state: ApplicationState) => state.component)
  const [name, setName] = useState<string | undefined>('')
  const [tags, setTags] = useState<string | undefined>('')
  const [description, setDescription] = useState<string | undefined>('')
  const [order, setOrder] = useState<string | undefined>('')
  const [orderby, setOrderby] = useState<string | undefined>('')
  const [status, setStatus] = useState<number | boolean>(1)
  const [duration, setDuration] = useState<string | undefined>('')
  const [ckEditor, setCkEditor] = useState(false)

  useEffect(() => {
    setName(child.name)
    setDescription(child.description)
    setOrder(child.order)
    setTags(child.tags)
    setStatus(child.status!)
    setOrderby(child.orderby)
    setDuration(MOMENT.duration(child.duration, 'seconds').format('hh:mm:ss', {trim: false}))
  }, [child.name, child.description, child.order, child.duration])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', component.data.id)
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (name && description) {
      //var data = new Date()
      const componentToUpdate = {
        id: child.id,
        name,
        description,
        order,
        //createdAt: (data.getTime() / 1000).toString(), //updated_at
        status,
        duration: MOMENT.duration(duration).asSeconds(),
        tags,
        orderby,
      }

      console.log('------------------ COMPONENT TO UPDATE', componentToUpdate)
      dispatch(updateComponentRequest(componentToUpdate))
      handleClose()
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
            onChange={(e: any) => setName(e.target.value)}
            name='name'
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do produto
          </Form.Control.Feedback>
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
              onChange={(e: any) => setDescription(e.target.value)}
              as='textarea'
              rows={3}
              name='description'
            />
            <Form.Control.Feedback type='invalid'>
              Por favor informe a descrição do produto
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
          <Form.Control
            placeholder=''
            value={order}
            onChange={(e: any) => setOrder(e.target.value)}
            name='order'
          />
          <Form.Control.Feedback type='invalid'>Por favor informe a ordem</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Duração</Form.Label>
          <Form.Control
            placeholder=''
            value={duration}
            onChange={(e: any) => setDuration(e.target.value)}
            name='duration'
          />
          <Form.Control.Feedback type='invalid'>Por favor informe a duração</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            placeholder=''
            value={tags}
            onChange={(e: any) => setTags(e.target.value)}
            name='tags'
          />
          <Form.Control.Feedback type='invalid'>Por favor informe as tags</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>OrderBy</Form.Label>
          <Form.Control
            placeholder=''
            value={orderby}
            onChange={(e: any) => setOrderby(e.target.value)}
            name='tags'
          />
          <Form.Control.Feedback type='invalid'>Por favor informe as tags</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Status</Form.Label>
          <Form.Control
            placeholder=''
            value={status.toString()}
            onChange={(e: any) => setStatus(e.target.value)}
            name='tags'
          />
          <Form.Control.Feedback type='invalid'>Por favor informe as tags</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>
      </Form>
    </>
  )
}
export default Update
