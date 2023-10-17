import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap-v5'
// import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../../store'
import {createExtraRequest} from '../../../../../store/ducks/component/actions'
import {Extras} from '../../../../../store/ducks/extras/types'
import axios from 'axios'
import api from '../../../../../services/api'
// type ParamTypes = {
//   id: string
// }

interface handleCloseProps {
  handleClose: () => void
}

const Extra = ({handleClose}: handleCloseProps) => {
  // const [sending, setSending] = useState(false)
  // const [key_extra, setKey_extra] = useState('image')
  // const [value_extra, setValue_extra] = useState('')
  const [validated, setValidated] = useState(false)

  const [selectedFile, setSelectedFile] = useState<any>()
  // const [isFilePicked, setIsFilePicked] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  // const {id} = useParams<ParamTypes>()
  // const history = useNavigate()
  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (selectedFile) {
      const formdata = new FormData()
      formdata.append('file', selectedFile, selectedFile.name)

      console.log('[formData]', formdata)
      console.log('selectedFile', selectedFile)

      // axios
      //   .post('https://institutodefelicibus.com.br/apiviolaofeeling/upload', formdata, {})
      api.post('/upload', formdata, {})
        .then((res) => {
          // then print response status
          console.log('RESSSS', res)
          var date = new Date()
          const extra: Extras = {
            key_extra: 'file',
            value_extra: res.data.filename,
            component_id: component.data.id,
            //created_at: date.getTime() / 1000,
            status: 1,
          }
          console.log('extra to save:', extra)
          console.log('component:', component)

          dispatch(createExtraRequest(extra))
          handleClose()
        })
        .catch(error => console.log("error", error))
    }
  }

  // const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0])
    setIsSelected(true)
  }

  return (
    <>
      {/* <Form noValidate validated={validated} onSubmit={handleSubmit} encType={'multipart/form-data'}>  */}
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            required
            name='file'
            id='exampleFormControlFile1'
            type='file'
            // label="Selecione um arquivo"
            onChange={changeHandler}
          />
          <Form.Control.Feedback type='invalid'>Selecione um arquivo</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button size='sm' variant='primary' type='submit'>
          Salvar
        </Button>
      </Form>
      <br />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>lastModifiedDate: {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
    </>
  )
}
export default Extra
