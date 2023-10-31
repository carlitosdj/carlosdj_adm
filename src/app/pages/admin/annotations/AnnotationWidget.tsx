/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {KTSVG} from '../../../design/helpers'
import {User} from '../../../../store/ducks/me/types'
// import CreateEmail from './create'
// import {Support, SupportState} from '../../../../store/ducks/support/types'

import Info from './info'
// import Create from './create'
import Update from './update'
import {useIntl} from 'react-intl'
import { AnnotationsState } from '../../../../store/ducks/annotations/types'

type Props = {
  className: string
  annotations: AnnotationsState
}

const AnnotationWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  annotations,
}) => {
  const MOMENT = require('moment')
  const intl = useIntl()

  const [show, setShow] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [child, setChild] = useState<User>({})

  // const infoSupport = (support: Support) => {
  //   setAction('infoSupport')
  //   setShow(true)
  //   setChild(support)
  // }
  // const updateSupport = (support: Support) => {
  //   setAction('editSupport')
  //   setShow(true)
  //   setChild(support)
  // }

  const handleClose = () => {
    setShow(false)
  }
  console.log("Annotations", annotations)
  return (
    <>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'infoSupport' ? 'Informações do chamado' : ''}
            {action === 'editSupport' ? 'Responder chamado' : ''}
            {/* { (action === 'createUser')?'Adicionar usuário':'' } */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'infoSupport' ? <Info handleClose={handleClose} child={child} /> : ''}
          {action === 'editSupport' ? <Update handleClose={handleClose} child={child} /> : ''}
          {/* { (action === 'createUser')?<Create handleClose={handleClose}/>:'' } */}
        </Modal.Body>
      </Modal>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>
              {/* {intl.formatMessage({id: 'MENU.SUPPORT'})} */}
              Anotações
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>Anotações na plataforma</span>
          </h3>
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
                  <th className='min-w-50px'>Id</th>
                  <th className='min-w-140px'>Criado em</th>
                  <th className='min-w-120px'>Aula</th>
                  <th className='min-w-120px'>Anotação</th>
                  <th className='min-w-120px'>Usuário</th>
                  {/* <th className='min-w-120px'>Status</th>
                  <th className='min-w-100px text-end'>Actions</th> */}
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {annotations.data.map((annotation: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            {annotation.id}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {MOMENT(Number(annotation.created_at) * 1000).format('DD/MM/YYYY HH:mm')}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {annotation.parentComponent.parent.name} - {annotation.parentComponent.name}
                        </span>
                      </td>
                      <td>
                        <span className='fw-bold d-block fs-7'>
                          {annotation.message}
                        </span>
                      </td>
                      
                      <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {annotation.parentUser.name}
                        </span>
                      </td>
                      {/* <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {support.status}
                        </span>
                      </td> */}

                      
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

export {AnnotationWidget}
