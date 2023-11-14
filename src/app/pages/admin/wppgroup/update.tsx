import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap-v5'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'

import {Wppgroup} from '../../../../store/ducks/wppgroup/types'

import {updateWppgroupRequest} from '../../../../store/ducks/wppgroup/actions'

interface handleCloseProps {
  handleClose: () => void
  child: Wppgroup
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const wppgroup = useSelector((state: ApplicationState) => state.wppgroup)
  const [name, setName] = useState<string | undefined>('')
  const [url, setUrl] = useState<string | undefined>('')
  const [clicks, setClicks] = useState<number | undefined>(0)

  useEffect(() => {
    console.log('CHILD', child)
    setName(child.name)
    setUrl(child.url)
    setClicks(child.clicks)
    // setOrder(child.order)
  }, [child])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', wppgroup)
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (name && url) {
      var data = new Date()
      const componentToUpdate: Wppgroup = {
        id: child.id,
        name,
        url,
        //createdAt: data.getTime() / 1000, //updated_at
        status: 1,
        clicks,
      }

      console.log('------------------ COMPONENT TO UPDATE', componentToUpdate)
      dispatch(updateWppgroupRequest(componentToUpdate))
      handleClose()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label>Nome do grupo</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e:any) => setName(e.target.value)}
            name='name'
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do grupo
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='formDescription'>
          <Form.Label>Url</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={url}
            onChange={(e:any) => setUrl(e.target.value)}
            // as="textarea" rows={3}
            name='description'
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a url do grupo
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='formDescription'>
          <Form.Label>Cliques</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={clicks}
            onChange={(e:any) => setClicks(+e.target.value)}
            // as="textarea" rows={3}
            name='clicks'
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o numero de cliques
          </Form.Control.Feedback>
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
