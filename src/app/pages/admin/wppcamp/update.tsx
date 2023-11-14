import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap-v5'

import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'

import {Wppcamp} from '../../../../store/ducks/wppcamp/types'
import {updateCampRequest} from '../../../../store/ducks/wppcamp/actions'

interface handleCloseProps {
  handleClose: () => void
  child: Wppcamp
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const wppcamp = useSelector((state: ApplicationState) => state.wppcamp)
  const [name, setName] = useState<string | undefined>('')
  const [description, setDescription] = useState<string | undefined>('')
  const [slug, setSlug] = useState<string | undefined>('')
  const [maxclicks, setMaxclicks] = useState<number | undefined>(0)

  useEffect(() => {
    setName(child.name)
    setDescription(child.description)
    setSlug(child.slug)
    setMaxclicks(child.maxclicks)
    // setOrder(child.order)
  }, [child.name, child.description, child.slug, child.maxclicks])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', wppcamp)
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (name && description && slug && maxclicks) {
      var data = new Date()
      const componentToUpdate: Wppcamp = {
        id: child.id,
        name,
        description,
        //createdAt: data.getTime() / 1000, //updated_at
        status: 1,
        maxclicks: +maxclicks,
        slug,
      }

      console.log('------------------ COMPONENT TO UPDATE', componentToUpdate)
      dispatch(updateCampRequest(componentToUpdate))
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
            onChange={(e:any) => setName(e.target.value)}
            name='name'
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome da campanha
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group controlId='formDescription'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={description}
            onChange={(e:any) => setDescription(e.target.value)}
            as='textarea'
            rows={3}
            name='description'
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição da campanha
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group controlId='fromSlug'>
          <Form.Label>Slug</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={slug}
            onChange={(e:any) => setSlug(e.target.value)}
            name='name'
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o slug</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group controlId='fromMaxclicks'>
          <Form.Label>Max cliques</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={maxclicks}
            onChange={(e:any) => setMaxclicks(e.target.value)}
            name='maxclicks'
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o max clicks
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Button variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>
      </Form>
    </>
  )
}
export default Update
