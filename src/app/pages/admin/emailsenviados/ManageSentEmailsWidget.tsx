/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {KTSVG} from '../../../design/helpers'
import {EmailToListState} from '../../../../store/ducks/email/types'
import CreateEmail from './create'

type Props = {
  className: string
  emailList: EmailToListState
}

const ManageSentEmailsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  emailList,
}) => {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = () => {
    setShow(false)
  }

  const createEmail = () => {
    setShow(true)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        enforceFocus={false} //ckeditor link hack
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEmail handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Usuários</span>
            <span className='text-muted mt-1 fw-bold fs-7'>Usuários na plataforma</span>
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
              onClick={() => createEmail()}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo e-mail
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
                  <th className='min-w-150px'>Lista</th>
                  <th className='min-w-140px'>Email</th>
                  <th className='min-w-120px'>Whatsapp</th>
                  <th className='min-w-120px'>CreatedAt</th>
                  <th className='min-w-120px'>Flags</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {emailList.data.map((child, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            {child.list}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {child.subject}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {child.message}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {child.createdAt}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {child.quantity}
                        </span>
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

export {ManageSentEmailsWidget}
