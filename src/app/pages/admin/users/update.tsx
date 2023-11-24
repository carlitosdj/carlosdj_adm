import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap-v5'

// import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {updateUserRequest} from '../../../../store/ducks/users/actions'
// import {ApplicationState} from '../../../../store'

import {User} from '../../../../store/ducks/me/types'

interface handleCloseProps {
  handleClose: () => void
  child: User
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const [name, setName] = useState<string | undefined>('')
  //const [username, setUsername] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')

  const [oldpasswordhash, setOldpasswordhash] = useState<string | undefined>('')

  const [whatsapp, setWhatsapp] = useState<string | undefined>('')
  const [cpf, setCpf] = useState<string | undefined>('')
  const [address, setAddress] = useState<string | undefined>('')

  const [number, setNumber] = useState<string | undefined>('')
  const [bairro, setBairro] = useState<string | undefined>('')
  const [city, setCity] = useState<string | undefined>('')
  const [state, setState] = useState<string | undefined>('')
  const [country, setCountry] = useState<string | undefined>('')
  const [cep, setCep] = useState<string | undefined>('')

  const [endereco, setEndereco] = useState<string | undefined>('')

  const [addressCEP, setAddressCEP] = useState<string | undefined>('')

  const [addressNumber, setAddressNumber] = useState<string | undefined>('')
  const [addressDistrict, setAddressDistrict] = useState<string | undefined>('')
  const [addressCity, setAddressCity] = useState<string | undefined>('')
  const [addressState, setAddressState] = useState<string | undefined>('')
  const [addressCountry, setAddressCountry] = useState<string | undefined>('')

  const [numTurma, setNumTurma] = useState<number | undefined>()
  const [role, setRole] = useState<string | undefined>('')

  const [validated, setValidated] = useState<boolean>(false)

  // const navigate = useNavigate()
  // const users = useSelector((state: ApplicationState) => state.users)

  const dispatch = useDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    console.log('handle submit')
    setValidated(true)
    //if (name && username && email && whatsapp && cpf && address) {
    console.log('handle submit2')

    console.log('Update User')
    const userToUpdate = {
      id: child.id,
      email,
      newPassword: password,
      numTurma: +numTurma!,
      name,
      whatsapp,
      cpf,
      address,
      addressNumber,
      addressDistrict,
      cityId: addressCity,
      stateId: addressState,
      //addressCountry,
      postalCode: addressCEP,
      roles:role

      //},
    }

    console.log('user to save', userToUpdate)
    dispatch(updateUserRequest(userToUpdate))
    handleClose()
    //}
  }

  useEffect(() => {
    console.log("CHILD - VER AQUI", child)
    setName(child.name)
    setEmail(child.email)
    setOldpasswordhash(child.password_hash)
    setWhatsapp(child.whatsapp)
    setCpf(child.cpf)
    setAddress(child.address)

    //setNumber(child.addressNumber)
    //setBairro(child.addressDistrict)
    // setCity(child.cityId)
    // setState(child.stateId)
    //setCountry(child.addressCountry)
    setCep(child.postalCode)

    setName(child.name)
    //setUsername(child.username)
    setEmail(child.email)
    setWhatsapp(child.whatsapp)
    setCpf(child.cpf)
    //setAddress(child.endereco)

    //setImage(child.image)

    setEndereco(child.endereco)

    setAddressNumber(child.addressNumber)
    setAddressDistrict(child.addressDistrict)
    setAddressCity(child.cityId)
    setAddressState(child.stateId)
    //setAddressCountry(child.addressCountry)
    setAddressCEP(child.postalCode)
    setNumTurma(child.numTurma)
    setRole(child.roles)
  }, [])

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o email</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            placeholder='Deixe em branco para não editar a senha atual do usuário'
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe a senha</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Whatsapp</Form.Label>
          <Form.Control
            placeholder=''
            value={whatsapp}
            onChange={(e: any) => setWhatsapp(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o número de whatsapp
          </Form.Control.Feedback>
        </Form.Group>

        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>CPF</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={cpf}
            onChange={(e: any) => setCpf(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o cpf</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={address}
            onChange={(e: any) => setAddress(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o endereco</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Número</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressNumber}
            onChange={(e: any) => setAddressNumber(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o numero</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>CEP</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressCEP}
            onChange={(e: any) => setAddressCEP(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o cep</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressDistrict}
            onChange={(e: any) => setAddressDistrict(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o bairro</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressCity}
            onChange={(e: any) => setAddressCity(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe a cidade</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Estado</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressState}
            onChange={(e: any) => setAddressState(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o estado</Form.Control.Feedback>
        </Form.Group>
        <br />

        {/* <Form.Group controlId='fromName'>
          <Form.Label>País</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressCountry}
            onChange={(e: any) => setAddressCountry(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o país</Form.Control.Feedback>
        </Form.Group>
        <br /> */}

        <Form.Group controlId='fromName'>
          <Form.Label>Turma</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={numTurma}
            onChange={(e: any) => setNumTurma(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o país</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group controlId='fromName'>
          <Form.Label>Papel (producer, consumer)</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={role}
            onChange={(e: any) => setRole(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o papel</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      {/* Deixar o button fora do form.. */}
    </>
  )
}
export default Update
