/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'

import {KTSVG} from '../../../design/helpers'
import {useDispatch} from 'react-redux'

import Create from './create'
import Update from './update'
import {Wppgroup, WppgroupState} from '../../../../store/ducks/wppgroup/types'
import {deleteWppgroupRequest} from '../../../../store/ducks/wppgroup/actions'

type Props = {
  className: string
  wppgroup: WppgroupState
}

const ManageWppGroupWidget: React.FC<React.PropsWithChildren<Props>> = ({className, wppgroup}) => {
  console.log('COMP AQUI', wppgroup)
  const [show, setShow] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [child, setChild] = useState<Wppgroup>({})
  // const [extra, setExtra] = useState<Extras>({});
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleClose = () => {
    setShow(false)
  }

  const createComponent = () => {
    setAction('createComponent')
    setShow(true)
  }

  const updateComponent = (child: Wppgroup) => {
    setAction('updateComponent')
    setShow(true)
    setChild(child)
  }

  // Deleta componente: CHILD
  const deleteComponent = (group: Wppgroup) => {
    dispatch(deleteWppgroupRequest(group.id!))
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'createComponent' ? 'Adicionar grupo' : ''}
            {action === 'updateComponent' ? 'Editar grupo' : ''}
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
            <span className='card-label fw-bolder fs-3 mb-1'>Grupos na campanha </span>
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
              Novo grupo
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
                  <th className='min-w-150px'>Nome</th>
                  <th className='min-w-140px'>Cliques</th>
                  <th className='min-w-120px'>Url</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {wppgroup.data?.map((child, index) => {
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
                            {/* <Link to={'/wppgroup/' + child.id} style={{display:'flex' }} className='text-dark fw-bolder text-hover-primary fs-6'> */}
                            {child.name}
                            {/* </Link> */}
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
                          {child.clicks}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          <a
                            href={child.url}
                            target='_blank'
                            className='text-dark fw-bolder text-hover-primary d-block fs-6'
                          >
                            {child.url}
                          </a>
                        </span>
                      </td>

                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
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

export {ManageWppGroupWidget}
