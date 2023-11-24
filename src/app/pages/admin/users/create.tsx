import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap-v5'

import {useDispatch} from 'react-redux'
import {createUserRequest} from '../../../../store/ducks/users/actions'

import {User} from '../../../../store/ducks/me/types'

// var bcrypt = require('bcryptjs');

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  // const [sending, setSending] = useState(false);
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [whatsapp, setWhatsapp] = useState('')
  const [cpf, setCpf] = useState('')
  const [address, setAddress] = useState('')

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

  const [numTurma, setNumTurma] = useState<number | undefined>(1)
  const [role, setRole] = useState<string | undefined>('')

  // let history = useHistory();

  const dispatch = useDispatch()

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    console.log('handleSubmit')
    // if (
    //   name &&
    //   username &&
    //   email &&
    //   password &&
    //   whatsapp &&
    //   cpf &&
    //   address &&
    //   number &&
    //   bairro &&
    //   city &&
    //   state &&
    //   country
    // )
    {
      console.log('handleSubmit2')
      var data = new Date()
      const user: User = {
        email,
        name,
        newPassword: password,
        flags: 10,
        numTurma: numTurma,
        address,
        addressNumber,
        addressDistrict,
        addressCity,
        addressState,
        addressCountry,
        postalCode: addressCEP,
        whatsapp,
        cpf,
        roles: role
      }

      dispatch(createUserRequest(user))
      handleClose()
    }
  }

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

        <Form.Group controlId='fromName'>
          <Form.Label>País</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressCountry}
            onChange={(e: any) => setAddressCountry(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o país</Form.Control.Feedback>
        </Form.Group>
        <br />
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
export default Create
