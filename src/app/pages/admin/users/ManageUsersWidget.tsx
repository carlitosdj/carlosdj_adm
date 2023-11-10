/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Button, Form, FormControl, InputGroup, Modal} from 'react-bootstrap-v5'

import {KTSVG} from '../../../design/helpers'
import {useDispatch} from 'react-redux'

// import {loadLeadsRequest, searchLeadsRequest} from '../../../../store/ducks/leads/actions'
import {UsersState} from '../../../../store/ducks/users/types'
import {User} from '../../../../store/ducks/me/types'
import {
  deleteUserRequest,
  loadUsersRequest,
  searchUserRequest,
  selectUsersAddRequest,
  selectUsersRemoveRequest,
} from '../../../../store/ducks/users/actions'

import Info from './info'
import Create from './create'
import Update from './update'
import Pagination from '../../../../customHooks/Pagination'
import ExportUser from './export'
import Filter from './filter'
const MOMENT = require('moment')

type Props = {
  className: string
  users: UsersState
  page?: string
  take?: string
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
}

const ManageUsersWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  users,
  page,
  take,
  setCurrentPage,
  currentPage,
}) => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [child, setChild] = useState<User>({})
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)

  console.log('users', users)
  // const [extra, setExtra] = useState<Extras>({});
  const dispatch = useDispatch()
  // const history = useHistory();

  // const searchLeads = () => {
  //   console.log('search', search)
  //   if (search) dispatch(searchLeadsRequest(search))
  //   else dispatch(loadLeadsRequest())
  // }

  const handleClose = () => {
    setShow(false)
  }

  const createUser = () => {
    setAction('createUser')
    setShow(true)
  }

  const exportUsers = () => {
    setAction('showExport')
    setShow(true)
  }
  const filter = () => {
    setAction('showFilter')
    setShow(true)
  }

  const updateUser = (user: User) => {
    setAction('editUser')
    setShow(true)
    setChild(user)
  }

  const infoUser = (user: User) => {
    setAction('infoUser')
    setShow(true)
    setChild(user)
  }

  const deleteUser = (user: User) => {
    console.log('deletar', user.id)
    dispatch(deleteUserRequest(user.id!))
  }

  const searchUser = () => {
    console.log('search', search)
    if (search) dispatch(searchUserRequest(search))
    else dispatch(loadUsersRequest(+page!, +take!))
  }

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsAllChecked(true)
      users.data.map((child) => {
        dispatch(selectUsersRemoveRequest(child)) //Remove antes, pra nao dar duplicação
        dispatch(selectUsersAddRequest(child))
      })
    } else {
      setIsAllChecked(false)
      users.data.map((child) => {
        dispatch(selectUsersRemoveRequest(child))
      })
    }
  }

  const setSelected = (e: React.ChangeEvent<HTMLInputElement>, child: User) => {
    //console.log("CHILD!", child)
    //dispatch(selectUsersAddRequest(child))
    console.log('event', e.target.checked)
    console.log('child', child)
    if (e.target.checked) dispatch(selectUsersAddRequest(child))
    else dispatch(selectUsersRemoveRequest(child))
  }

  let count = users.count
  // let pages = Math.ceil(+count! / +take!)
  let length = users.data?.length
  return (
    <div>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'infoUser' ? 'Informações do usuário' : ''}
            {action === 'editUser' ? 'Editar usuário' : ''}
            {action === 'createUser' ? 'Adicionar usuário' : ''}
            {action === 'showExport' ? 'Exportar' : ''}
            {action === 'showFilter' ? 'Filtro' : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'infoUser' ? <Info handleClose={handleClose} child={child} /> : ''}
          {action === 'editUser' ? <Update handleClose={handleClose} child={child} /> : ''}
          {action === 'createUser' ? <Create handleClose={handleClose} /> : ''}
          {action === 'showExport' ? <ExportUser handleClose={handleClose} /> : ''}
          {action === 'showFilter' ? <Filter handleClose={handleClose} /> : ''}
        </Modal.Body>
      </Modal>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Pesquise por e-mail, nome, ...'
          aria-label='Pesquisa'
          aria-describedby='basic-addon2'
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        {/* <InputGroup.Append> */}
        <Button variant='outline-secondary' onClick={searchUser}>
          Pesquisar
        </Button>
        {/* </InputGroup.Append> */}
      </InputGroup>
      <div style={{marginLeft: 5}}>A pesquisa retornou: {count} dados</div>
      {!search ? (
        <div style={{marginLeft: 5}}>
          Mostrando: {(+page! - 1) * +take! + 1} - {(+page! - 1) * +take! + +length!}
        </div>
      ) : (
        ''
      )}
      <div>{users.error ? 'Tem erro' : ''}</div>
      <br />
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Usuários</span>
            <span className='text-muted mt-1 fw-bold fs-7'>Usuários na plataforma</span>
          </h3>
          <div
            className='card-toolbar justify-content-between d-flex'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            //style={{width: '100%'}}
          >
            <a
              href='#'
              className='btn btn-sm btn-light-success'
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
              onClick={() => createUser()}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo usuário
            </a>
            &nbsp;&nbsp;
            <a
              href='#'
              className='btn btn-sm btn-light-primary'
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
              onClick={() => filter()}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Filtro
            </a>
            &nbsp;&nbsp;
            <a
              href='#'
              className='btn btn-sm btn-light-info'
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
              onClick={() => exportUsers()}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Exportar selecionados
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='kt_settings_notification_email'
                      style={{backgroundColor: 'rgb(112 107 107)', color: 'black'}}
                      onChange={(e: any) => selectAll(e)}
                    />
                  </th>
                  <th>Id</th>
                  <th>Imagem</th>
                  <th className='min-w-150px'>Nome</th>
                  <th className='min-w-140px'>Email</th>
                  <th className='min-w-120px'>Whatsapp</th>
                  <th className='min-w-120px'>Criação</th>
                  <th className='min-w-120px'>Último Login</th>
                  {/* <th className='min-w-120px'>Última aula assistida</th> */}
                  <th className='min-w-120px'>Status</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {users.data?.map((child, index) => {
                  var created_at = MOMENT(Number(child.created_at) * 1000) //.format('DD/MM/YYYY HH:mm')
                  var last_login_at = child.last_login_at
                    ? MOMENT(Number(child.last_login_at) * 1000)
                    : '' //.format('DD/MM/YYYY HH:mm')
                  var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
                  const regex = /\('([^']+)',\)/g
                  const whats = '55' + child.profile?.whatsapp?.replace(/[|&;$%@"<>()+,-]/g, '')
                  let check = users.selectedUsers?.filter((item) => item.id === child.id)
                  let defaultChecked = check.length || isAllChecked ? true : false

                  return (
                    <tr key={index}>
                      {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                        </div>
                      </td> */}

                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            {/* <img src={'https://labiopalatina.com.br/files/1678819623100-vf.jpg'} alt='' /> */}
                            <input
                              className='form-check-input'
                              type='checkbox'
                              id='selectusers'
                              style={{backgroundColor: 'rgb(112 107 107)', color: 'black'}}
                              //defaultChecked={defaultChecked}
                              checked={defaultChecked}
                              onChange={(e: any) => setSelected(e, child)}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            {/* <img src={'https://labiopalatina.com.br/files/1678819623100-vf.jpg'} alt='' /> */}
                            {child.id}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            {/* <img src={'https://labiopalatina.com.br/files/1678819623100-vf.jpg'} alt='' /> */}
                            <img
                              //src={users.user.profile?.image}
                              //src={ image?.includes('https://') ? image : '../../files/' + image}
                              src={
                                child.image?.includes('https://')
                                  ? child.image
                                  : 'https://labiopalatina.com.br/files/' + child.image
                              }
                              style={{width: '100%'}}
                              onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src =
                                  'https://labiopalatina.com.br/media/guestuser.jpg'
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          {/* <div className='symbol symbol-45px me-5'>
                            <img src={toAbsoluteUrl('/media/avatars/150-11.jpg')} alt='' />
                          </div> */}
                          <div className='d-flex justify-content-start flex-column'>
                            {child.name}
                            {/* <span className='text-muted fw-bold text-muted d-block fs-7'>
                              {child.description}
                            </span> */}
                          </div>
                        </div>
                      </td>
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {child.email}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          <a href={'https://api.whatsapp.com/send?phone=' + whats} target='_blank'>
                            {child.whatsapp}
                          </a>
                        </span>
                      </td>
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {created_at.format('DD/MM/YYYY HH:mm')}
                          {' / '}
                          {now.diff(created_at, 'years', true) > 1 ? (
                            <span className='text-danger'>RENOVAÇÃO</span>
                          ) : (
                            <span className='text-success'>NO PRAZO</span>
                          )}
                          {' / '}
                          {(now.diff(created_at, 'years', true) * 100).toFixed(2)}%
                        </span>
                      </td>
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {last_login_at ? last_login_at?.format('DD/MM/YYYY HH:mm') : ''}
                        </span>
                      </td>
                      {/* <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> *x/}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          Ultima aula assistida
                        </span>
                      </td> */}
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {child.num_turma}
                        </span>
                      </td>

                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <a
                            href='#'
                            onClick={() => infoUser(child)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          <a
                            href='#'
                            onClick={() => updateUser(child)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          <a
                            href='#'
                            onClick={() => {
                              if (
                                window.confirm('Deseja realmente excluir: ' + child.username + '?')
                              )
                                deleteUser(child)
                            }}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
      {/* teste
      {currentPage!}
      {count}
      {take} */}
      {users.showPagination ? (
        <Pagination
          className=''
          currentPage={currentPage!}
          totalCount={count}
          pageSize={take}
          onPageChange={(page: any) => setCurrentPage(page)}
          link='users'
        />
      ) : (
        ''
      )}
    </div>
  )
}

export {ManageUsersWidget}
