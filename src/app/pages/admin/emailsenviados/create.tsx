import {useEffect, useState} from 'react'
import {InputGroup, FormControl, Form, Button} from 'react-bootstrap-v5'
import {ApplicationState} from '../../../../store'
import {useSelector, useDispatch} from 'react-redux'
import {loadListsRequest} from '../../../../store/ducks/lists/actions'
import {createEmailToListRequest} from '../../../../store/ducks/email/actions'
import {EmailTolist} from '../../../../store/ducks/email/types'
import Loading from '../../../loading'
import {CKEditor} from 'ckeditor4-react'

interface handleCloseProps {
  handleClose: () => void
}

const Leads = ({handleClose}: handleCloseProps) => {
  const dispatch = useDispatch()
  const lists = useSelector((state: ApplicationState) => state.lists)
  const me = useSelector((state: ApplicationState) => state.me)
  const [list, setList] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [ckEditor, setCkEditor] = useState(true)
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    dispatch(loadListsRequest())
  }, [dispatch])

  // console.log('listsxxx', lists)
  // console.log('emailToList', emailToList)
  // console.log('me', me)

  if (lists.loading) return <Loading />

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {

    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    console.log('send')
    console.log('list', list)
    console.log('subject', subject)
    console.log('message', message)
    var data = new Date()
    const emailToListNew: EmailTolist = {
      list,
      subject,
      message,
      parentUser: me.me.id,
      user_id: me.me.id,
      status: 1,
      //created_at: (data.getTime() / 1000).toString(),
    }
    dispatch(createEmailToListRequest(emailToListNew))
    handleClose()
  }

  return (
    <>
    <Form validated={validated} onSubmit={sendEmail}>
      <Form.Group>
        <Form.Control as='select' value={list} onChange={(e) => setList(e.target.value)}>
          <option>Selecione uma lista</option>
          <option disabled>--Tudo--</option>
          <option value="@all">Todos os usuários do sistema (leads, profissionais ativos, profissionais vencidos e pacientes)</option>
          <option disabled>--Usuários--</option>
          <option value="@patients">Todos os pacientes</option>
          <option value="@professionals">Todos os profissionais (ativos e vencidos)</option>
          {/* <option value="@activeprofessionals">Todos os profissionais ativos</option>
          <option value="@expiredprofessionals">Profissionais com renovação vencida</option> */}
          <option disabled>--Leads--</option>
          <option value="@allleads">Todos Leads</option>
          {lists.data.map((list) => {
            return <option>{list.list}</option>
          })}
        </Form.Control>
      </Form.Group>
      <br/>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Assunto'
          aria-label='Assunto'
          aria-describedby='basic-addon2'
          value={subject}
          onChange={(e:any) => setSubject(e.target.value)}
        />
      </InputGroup>

        {/* <Button size='sm' className='btn btn-info' onClick={() => setCkEditor(!ckEditor)}>
          Trocar editor
        </Button> */}
        {/* <br /> */}
        <br />
        {!ckEditor ? (
          <InputGroup>
            {/* <InputGroup.Prepend> */}
            <InputGroup.Text>Mensagem</InputGroup.Text>
            {/* </InputGroup.Prepend> */}
            <FormControl
              as='textarea'
              aria-label='With textarea'
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </InputGroup>
        ) : (
          <CKEditor
            initData={message}
            onChange={(e: any) => setMessage(e.editor.getData())}
          />
        )}

        
      
      <br />
        <Button size='sm' variant='primary' type='submit' className='float-right'>
          Enviar
        </Button>
    </Form>
    </>
  )
}

export default Leads
