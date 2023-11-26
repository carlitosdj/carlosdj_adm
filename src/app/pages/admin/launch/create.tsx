import React, {useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap-v5'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import {createComponentRequest} from '../../../../store/ducks/component/actions'
import {Component as Comp} from '../../../../store/ducks/component/types'
import {ApplicationState} from '../../../../store'
import {CKEditor} from 'ckeditor4-react'
import ptBR from 'date-fns/locale/pt-BR'
import {registerLocale, setDefaultLocale} from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const MOMENT = require('moment')
require('moment-duration-format')

registerLocale('ptBR', ptBR)

// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string
}

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [eventName, setEventName] = useState('')
  const [expert, setExpert] = useState('')
  const [startSalesDate, setStartSalesDate] = useState(new Date())
  const [endSalesDate, setEndSalesDate] = useState(new Date())

  const [startSubscribeDate, setStartSubscribeDate] = useState(new Date())
  const [endSubscribeDate, setEndSubscribeDate] = useState(new Date())

  const [datacpl1, setDatacpl1] = useState(new Date())
  const [datacpl2, setDatacpl2] = useState(new Date())
  const [datacpl3, setDatacpl3] = useState(new Date())

  const [validated, setValidated] = useState(false)

  // const {id} = useParams<ParamTypes>()
  const id = '3'
  // const history = useHistory();
  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)

  useEffect(() => {
    setDates(new Date())
  }, [])

  console.log('Component inside - create', component)

  const setDates = (date: Date) => {
    ////////////////START END - CARRINHO////////////////
    setStartSalesDate(date)

    var endDate = new Date(date)
    endDate.setDate(date.getDate() + 1)
    setEndSalesDate(endDate)
    /////////////////CPLS////////////////

    console.log('Date', date)
    var datacpl1 = new Date(date)
    datacpl1.setDate(date.getDate() - 7)
    setDatacpl1(datacpl1)

    var datacpl2 = new Date(date)
    datacpl2.setDate(date.getDate() - 5)
    setDatacpl2(datacpl2)

    var datacpl3 = new Date(date)
    datacpl3.setDate(date.getDate() - 3)
    setDatacpl3(datacpl3)
    /////////////////SUBSCRIBE////////////////

    var startSubscribeDate = new Date(date)
    //startSubscribeDate.setDate(startSubscribeDate.getDate() - 21);
    startSubscribeDate.setDate(startSubscribeDate.getDate() - 60)
    setStartSubscribeDate(startSubscribeDate)

    var endSubscribeDate = new Date(date)
    endSubscribeDate.setDate(endSubscribeDate.getDate() - 1)
    setEndSubscribeDate(endSubscribeDate)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (name) {
      var data = new Date()

      const component: any = {
        name,
        description,
        componentId: +id!,
        status: '1',
        children: {
          create: [
            {
              name: 'Captação de lead',
              description: slug,
              //createdAt: (data.getTime() / 1000).toString(),
              status: '1',
              extras: {
                create: [
                  {
                    keyExtra: 'name',
                    valueExtra: eventName,
                  },
                  {
                    keyExtra: 'headline',
                    valueExtra: 'Faça suas primeiras vendas online. Evento online e gratuito.',
                  },
                  {
                    keyExtra: 'description',
                    valueExtra: 'Aprenda o passo a passo para a atração de clientes em potencial para seu negócio. O evento acontece no dia 08/09/2023 às 20h.',
                  },
                  {
                    keyExtra: 'group_link',
                    valueExtra: 'https://evento.labiopalatina.com.br/viawhats/' + slug,
                  },
                  {
                    keyExtra: 'data_inicio',
                    valueExtra: MOMENT(datacpl1).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'data_fim',
                    valueExtra: MOMENT(datacpl3).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'inscricao_inicio',
                    valueExtra: MOMENT(startSubscribeDate).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'inscricao_fim',
                    valueExtra: MOMENT(endSubscribeDate).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'btn',
                    valueExtra: 'Quero aprender a tocar violão sem stress',
                  },
                  {
                    keyExtra: 'img',
                    valueExtra: '1671667103392-violaosemstress.png',
                  },
                  {
                    keyExtra: 'title_email',
                    valueExtra: 'Preciso da sua ajuda - ' + eventName,
                  },
                  {
                    keyExtra: 'email',
                    valueExtra:
                      '<p>Ol&aacute; {name}, e ai, tudo bem?</p>' +
                      '<p>Aqui &eacute; o ' +
                      expert +
                      ', e eu estou passando para te dar os parab&eacute;ns por ter realizado a sua inscri&ccedil;&atilde;o para o evento <strong>' +
                      eventName +
                      '</strong>.<br />' +
                      '<br />' +
                      'Tenho certeza que nesse evento voc&ecirc; vai aprender o caminho para reduzir o stress e ansiedade estudando viol&atilde;o por 30 minutos por dia. Voc&ecirc; vai ficar surpreso com muita coisa.<br />' +
                      '<br />' +
                      'Nesse exato momento, eu e a minha equipe estamos cuidando de todos os preparativos para realizar o ' +
                      eventName +
                      '<br />' +
                      '<br />' +
                      'Estamos nos esfor&ccedil;ando ao m&aacute;ximo para produzir o melhor conte&uacute;do pra voc&ecirc; e &eacute; exatamente por isso que eu preciso da sua ajuda.<br />' +
                      '<br />' +
                      'Para ser mais exato, preciso que voc&ecirc; me ajude com duas coisas muito importantes.<br />' +
                      '<br />' +
                      'A primeira coisa &eacute;: eu gostaria muito de saber quais s&atilde;o as principais dificuldades e necessidades que voc&ecirc; tem enfrentando neste momento para aprender a tocar viol&atilde;o.<br />' +
                      '<br />' +
                      'A sua resposta vai me ajudar a garantir que esse evento supere as suas expectativas.<br />' +
                      '<br />' +
                      'Logo abaixo, tem um link com uma pesquisa pra voc&ecirc; responder.<br />' +
                      '<br />' +
                      'Com base nas suas respostas, pode ser que eu consiga adaptar ou at&eacute; mesmo produzir um conte&uacute;do espec&iacute;fico pra voc&ecirc;. Ent&atilde;o reserve um tempinho na sua agenda e responda essa pesquisa com o m&aacute;ximo de aten&ccedil;&atilde;o poss&iacute;vel, ok ?<br />' +
                      '<br />' +
                      '<a href="https://forms.gle/dwSQCHmegb1weVGn8"><strong>RESPONDER A PESQUISA</strong></a><br />' +
                      '<br />' +
                      'E o meu segundo pedido &eacute; o seguinte.<br />' +
                      '<br />' +
                      'Da &uacute;ltima vez que eu fiz um evento assim, muitas pessoas ficaram chateadas porque n&atilde;o receberam meus e-mails e, por conta disso, n&atilde;o tiveram acesso a todos os conte&uacute;dos que eu enviei..<br />' +
                      '<br />' +
                      'Dessa vez, eu quero ter a certeza que minhas mensagens v&atilde;o chegar at&eacute; voc&ecirc;.<br />' +
                      '<br />' +
                      'Mas pra isso, eu preciso que voc&ecirc; confirme sua inscri&ccedil;&atilde;o clicando no link abaixo.<br />' +
                      '<br />' +
                      '<a href="https://evento.labiopalatina.com.br/confirm/{list}/{email}" target="_blank"><strong>CLIQUE AQUI PARA CONFIRMAR INSCRI&Ccedil;&Atilde;O</strong></a><br />' +
                      '<br />' +
                      'Assim, eu vou saber que est&aacute; tudo ok com seu acesso e posso ficar tranquilo por ter a certeza de que voc&ecirc; n&atilde;o vai perder nenhum conte&uacute;do.<br />' +
                      '<br />' +
                      'Ent&atilde;o, &eacute; isso a&iacute;, n&atilde;o ignora esse e-mail, t&aacute;? Espero de verdade poder contar com a sua ajuda.<br />' +
                      '<br />' +
                      'A gente se fala novamente em breve.<br />' +
                      '<br />' +
                      'Grande abra&ccedil;o,<br />' +
                      expert +
                      '</p>',
                  },
                  {
                    keyExtra: 'title_email_d2',
                    valueExtra: 'Tudo que você precisa saber para acessar o evento ' + eventName,
                  },
                  {
                    keyExtra: 'email_d2',
                    valueExtra:
                      '<p>Ol&aacute; {name}, tudo bem?</p>' +
                      '<p>Aqui &eacute; ' +
                      expert +
                      ', eu vi que ontem voc&ecirc; se inscreveu para participar do ' +
                      eventName +
                      ' e que sua inscri&ccedil;&atilde;o j&aacute; foi confirmada!</p>' +
                      '<p>Pensando em tornar sua experi&ecirc;ncia ainda melhor, n&oacute;s criamos um grupo exclusivo no Whatsapp para quem se inscreveu no evento.</p>' +
                      '<p>Nesse grupo, voc&ecirc; vai receber todos os links de acesso e conte&uacute;dos extras do ' +
                      eventName +
                      '.</p>' +
                      '<p>L&aacute; no grupo de Whatsapp, a entrega dos conte&uacute;dos &eacute; imediata. Assim, voc&ecirc; n&atilde;o corre o risco de alguma mensagem n&atilde;o chegar ou cair no SPAM, como pode acontecer com o e-mail, &agrave;s vezes.</p>' +
                      '<p>Ah, pode ficar despreocupado porque o grupo &eacute; altamente moderado e apenas administradores podem enviar mensagens.</p>' +
                      '<p>Eu te garanto que por l&aacute; voc&ecirc; vai receber apenas mensagens oficiais do evento, t&aacute;?</p>' +
                      '<p>Ent&atilde;o para n&atilde;o perder absolutamente nada desse evento, eu recomento que voc&ecirc; participe agora mesmo do grupo de whatsapp, &eacute; s&oacute; clicar no link abaixo:</p>' +
                      '<p><a href="https://evento.labiopalatina.com.br/viawhats/' +
                      slug +
                      '"><strong>PARTICIPAR DO WHATSAPP</strong></a></p>' +
                      ' <p>Abra&ccedil;o,<br />' +
                      expert +
                      '.</p>',
                  },
                ], //esse
              },
            },
            {
              name: 'Evento',
              description: 'imersao-' + slug,
              //createdAt: (data.getTime() / 1000).toString(),
              status: '1',
              extras: {
                create: [
                  {
                    keyExtra: 'data_inicio',
                    valueExtra: MOMENT(datacpl1).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'data_fim',
                    valueExtra: MOMENT(datacpl3).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'data_cpl1',
                    valueExtra: MOMENT(datacpl1).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'data_cpl2',
                    valueExtra: MOMENT(datacpl2).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'data_cpl3',
                    valueExtra: MOMENT(datacpl3).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'data_cpl4',
                    valueExtra: MOMENT(startSalesDate).format('DD/MM/YYYY'),
                  },
                  {
                    keyExtra: 'cpl1',
                    valueExtra: 'https://www.youtube.com/embed/9i8WXdU9-U4?start=5378',
                  },
                  {
                    keyExtra: 'cpl2',
                    valueExtra: 'https://www.youtube.com/embed/eba0aPjWh6c?start=803',
                  },
                  {
                    keyExtra: 'cpl3',
                    valueExtra: 'https://www.youtube.com/embed/dLZRomd1dUk?start=1596',
                  },
                  {
                    keyExtra: 'cpl4',
                    valueExtra: 'https://player.vimeo.com/video/786710754?h=1dd52c4690',
                  },
                  {
                    keyExtra: 'img',
                    valueExtra: '1671667103392-violaosemstress.png',
                  },
                  {
                    keyExtra: 'link_grupo',
                    valueExtra: 'https://evento.labiopalatina.com.br/viawhats/' + slug,
                  },
                ],
              },
            },
            {
              name: 'Vendas',
              description: 'violaofeeling-' + slug,
              //createdAt: (data.getTime() / 1000).toString(),
              status: '1',
              extras: {
                create: [
                  {
                    keyExtra: 'data_inicio',
                    valueExtra: MOMENT(startSalesDate).format('DD/MM/YYYY HH:mm'),
                  },
                  {
                    keyExtra: 'data_fim',
                    valueExtra: MOMENT(endSalesDate).format('DD/MM/YYYY HH:mm'),
                  },
                  {
                    keyExtra: 'numTurma',
                    valueExtra: '10',
                  },
                  {
                    keyExtra: 'page_checkout',
                    valueExtra: 'https://pay.kiwify.com.br/fhTQpmR',
                  },
                  {
                    keyExtra: 'video_url',
                    valueExtra: 'https://player.vimeo.com/video/786710754',
                  },
                  {
                    keyExtra: 'preco',
                    valueExtra: '12x R$79,90',
                  },
                  {
                    keyExtra: 'desconto',
                    valueExtra: '1',
                  },
                  {
                    keyExtra: 'link_faleconosco',
                    valueExtra:
                      'https://api.whatsapp.com/send?phone=5534992301304&text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20o%20treinamento%20Viol%C3%A3o%20Feeling',
                  },
                  {
                    keyExtra: 'texto_desconto',
                    valueExtra: 'De R$ 1299,00 por 12x R$ 79,90 (38% de desconto)',
                  },
                  {
                    keyExtra: 'upsell',
                    valueExtra: '0',
                  },
                  {
                    keyExtra: 'link_grupo_espera',
                    valueExtra: 'https://evento.labiopalatina.com.br/viawhats/espera',
                  },
                ],
              },
            },
          ], //esse
        },
      }
      console.log('component to save:', component)
      dispatch(createComponentRequest(component))
      handleClose()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label>Nome do lançamento</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='formDescription'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            placeholder=''
            //required
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            as='textarea'
            rows={2}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Slug. Ex: mai23</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={slug}
            onChange={(e: any) => setSlug(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o slug</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Nome do evento</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={eventName}
            onChange={(e: any) => setEventName(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do evento
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Nome do expert</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={expert}
            onChange={(e: any) => setExpert(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do expert
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Data de abertura do carrinho</Form.Label>
          {/* <Form.Control
            as={DatePicker}
            placeholder=''
            required
            value={startDate}
            onChange={(e:any) => setStartDate(e.target.value)}
          /> */}
          <DatePicker
            locale='ptBR'
            showTimeSelect
            dateFormat='dd/MM/yyyy HH:mm'
            //dateFormat="dd/MM/yyyy hh:mm"
            className='form-control'
            selected={startSalesDate}
            onChange={(date: any) => setDates(date)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a data de abertura do carrinho
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='fromName'>
          <Form.Label>Data de fechamento do carrinho</Form.Label>
          {/* <Form.Control
            placeholder=''
            required
            value={endDate}
            onChange={(e:any) => setEndDate(e.target.value)}
          /> */}
          <DatePicker
            locale='ptBR'
            showTimeSelect
            dateFormat='Pp'
            //dateFormat="dd/MM/yyyy hh:mm"
            className='form-control'
            selected={endSalesDate}
            onChange={(date: any) => setEndSalesDate(date)}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a data de encerramento do carrinho
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        Início Inscrição Lead: {MOMENT(startSubscribeDate).format('DD/MM/YYYY')}
        <br />
        Fechamento Inscrição Lead: {MOMENT(endSubscribeDate).format('DD/MM/YYYY')}
        <br />
        <br />
        CPL1: {MOMENT(datacpl1).format('DD/MM/YYYY')}
        <br />
        CPL2: {MOMENT(datacpl2).format('DD/MM/YYYY')}
        <br />
        CPL3: {MOMENT(datacpl3).format('DD/MM/YYYY')}
        <br />
        <br />
        Abertura Carrinho: {MOMENT(startSalesDate).format('DD/MM/YYYY HH:mm')} <br />
        Fechamento Carrinho: {MOMENT(endSalesDate).format('DD/MM/YYYY HH:mm')}
        <br />
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
