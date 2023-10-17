import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap-v5'

// import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../../store'
import {updateExtraRequest} from '../../../../../store/ducks/component/actions'

import {Extras} from '../../../../../store/ducks/extras/types'
import {CKEditor} from 'ckeditor4-react'

interface handleCloseProps {
  handleClose: () => void
  child: Extras
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const [validated, setValidated] = useState(false)
  const component = useSelector((state: ApplicationState) => state.component)
  const [key_extra, setKey_extra] = useState<string | undefined>('')
  const [value_extra, setValue_extra] = useState<string | undefined>('')
  const [ckEditor, setCkEditor] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setKey_extra(child.key_extra)
    setValue_extra(child.value_extra)
  }, [child.key_extra, child.value_extra])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', component.data.id)
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (key_extra && value_extra) {
      var data = new Date()
      const extraToUpdate = {
        id: child.id,
        key_extra,
        value_extra,
        //created_at: (data.getTime() / 1000).toString(), //updated_at
        status: 1,
      }
      console.log('------------------ COMPONENT TO UPDATE', extraToUpdate)

      dispatch(updateExtraRequest(extraToUpdate))
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
            value={key_extra}
            onChange={(e:any) => setKey_extra(e.target.value)}
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
              value={value_extra}
              onChange={(e) => setValue_extra(e.target.value)}
              as='textarea'
              rows={3}
              name='description'
            />
            <Form.Control.Feedback type='invalid'>
              Por favor informe a descrição do produto
            </Form.Control.Feedback>
          </Form.Group>
        ) : (
          <CKEditor initData={value_extra} onChange={(e) => setValue_extra(e.editor.getData())} />
        )}

        <br />

        <Button size='sm' variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>
      </Form>
    </>
  )
}
export default Update
