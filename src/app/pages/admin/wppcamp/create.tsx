import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap-v5'
import {useDispatch} from 'react-redux'

import {createCampRequest} from '../../../../store/ducks/wppcamp/actions'
import {Wppcamp} from '../../../../store/ducks/wppcamp/types'
// import {ApplicationState} from '../../../../store'
// import { Modal } from 'react-bootstrap'
// interface ParamTypes {
//   id: string
// }

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [maxclicks, setMaxclics] = useState<number>(0)

  const [validated, setValidated] = useState(false)
  // const {id} = useParams<ParamTypes>();
  // const history = useHistory();
  const dispatch = useDispatch()
  // const wppcamp = useSelector((state: ApplicationState) => state.wppcamp)

  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (name && description && slug && maxclicks) {
      var data = new Date()
      const component: Wppcamp = {
        name,
        description,
        //createdAt: data.getTime() / 1000,
        status: '1',
        slug,
        maxclicks: +maxclicks,
      }
      console.log('component to save:', component)
      dispatch(createCampRequest(component))
      handleClose()
      // history.goBack()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label>Nome da campanha</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e:any) => setName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
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
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição
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
            onChange={(e:any) => setMaxclics(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o max clicks
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Button size='sm' variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>
      </Form>
      {/* Deixar o button fora do form.. */}
    </>
  )
}
export default Create
