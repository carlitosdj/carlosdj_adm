/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {Link} from 'react-router-dom'

import {KTSVG} from '../../../design/helpers'
import {useDispatch} from 'react-redux'

import {useNavigate} from 'react-router-dom'

import Create from './create'
import Update from './update'
import {Wppcamp, WppcampState} from '../../../../store/ducks/wppcamp/types'
import {deleteCampRequest} from '../../../../store/ducks/wppcamp/actions'

type Props = {
  className: string
  wppcamp: WppcampState
}

const ManageWppCampWidget: React.FC<React.PropsWithChildren<Props>> = ({className, wppcamp}) => {
  const [show, setShow] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [child, setChild] = useState<Wppcamp>({})
  // const [extra, setExtra] = useState<Extras>({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    setShow(false)
  }

  const createComponent = () => {
    setAction('createComponent')
    setShow(true)
  }

  const updateComponent = (child: Wppcamp) => {
    setAction('updateComponent')
    setShow(true)
    setChild(child)
  }

  // Deleta componente: CHILD
  const deleteComponent = (component: Wppcamp) => {
    dispatch(deleteCampRequest(component.id!))
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'createComponent' ? 'Adicionar campanha' : ''}
            {action === 'updateComponent' ? 'Editar campanha' : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'createComponent' ? <Create handleClose={handleClose} /> : ''}
          {action === 'updateComponent' ? <Update handleClose={handleClose} child={child} /> : ''}
        </Modal.Body>
      </Modal>

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>
              Gerenciador de grupos de whatsapp
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>Campanhas criadas</span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <a
              href='#'
              className='btn btn-sm btn-light-primary'
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
              onClick={() => createComponent()}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Nova campanha
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
                  <th className='min-w-150px'>Componente</th>
                  <th className='min-w-140px'>Descrição</th>
                  <th className='min-w-120px'>Url</th>
                  <th className='min-w-120px'>Max</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {wppcamp.data?.map((child, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                      </div>
                    </td> */}
                      <td>
                        <div className='d-flex align-items-center'>
                          {/* <div className='symbol symbol-45px me-5'>
                          <img src={toAbsoluteUrl('/media/avatars/150-11.jpg')} alt='' />
                        </div> */}
                          <div className='d-flex justify-content-start flex-column'>
                            <Link
                              to={'/wppgroup/' + child.id}
                              style={{display: 'flex'}}
                              className='text-dark fw-bolder text-hover-primary fs-6'
                            >
                              {child.name}
                            </Link>
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
                          {child.description}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {/* <a href={window.location.protocol + "//" + window.location.hostname + '/viawhats/' + child.slug} target="_blank" className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          {window.location.protocol + "//" + window.location.hostname + '/viawhats/' + child.slug}
                        </a> */}
                          {/* <a href={'https://evento.labiopalatina.com.br/viawhats/' + child.slug} target="_blank" className='text-dark fw-bolder text-hover-primary d-block fs-6'> */}
                          {'https://evento.labiopalatina.com.br/viawhats/' + child.slug}
                          {/* </a> */}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {/* <a href={window.location.protocol + "//" + window.location.hostname + '/viawhats/' + child.slug} target="_blank" className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          {window.location.protocol + "//" + window.location.hostname + '/viawhats/' + child.slug}
                        </a> */}
                          {/* <a href={'https://evento.labiopalatina.com.br/viawhats/' + child.slug} target="_blank" className='text-dark fw-bolder text-hover-primary d-block fs-6'> */}
                          {child.maxclicks}
                          {/* </a> */}
                        </span>
                      </td>

                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <a
                            // href='#'
                            onClick={() => navigate('/wppgroup/' + child.id)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          <a
                            href='#'
                            onClick={() => updateComponent(child)}
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
                              if (window.confirm('Deseja realmente excluir: ' + child.name + '?'))
                                deleteComponent(child)
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
    </>
  )
}

export {ManageWppCampWidget}
