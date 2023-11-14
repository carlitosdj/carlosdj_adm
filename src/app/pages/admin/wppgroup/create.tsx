import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap-v5'

import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

// import {ApplicationState} from '../../../../store'
import {Wppgroup} from '../../../../store/ducks/wppgroup/types'
import {createWppgroupRequest} from '../../../../store/ducks/wppgroup/actions'
// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string
}

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const [validated, setValidated] = useState(false)
  const {id} = useParams<ParamTypes>()
  // const history = useHistory();
  const dispatch = useDispatch()
  // const wppgroup = useSelector((state: ApplicationState) => state.wppgroup)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (name && url) {
      var data = new Date()
      const component: Wppgroup = {
        name,
        camp_id: +id!,
        url,
        clicks: 0,
        //createdAt: data.getTime() / 1000,
        status: 1,
      }
      console.log('component to save:', component)
      dispatch(createWppgroupRequest(component))
      handleClose()
      // history.goBack()
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
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
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
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição
          </Form.Control.Feedback>
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
