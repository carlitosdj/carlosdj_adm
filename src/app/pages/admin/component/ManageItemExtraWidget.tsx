/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {Link} from 'react-router-dom'
import {Component, ComponentState} from '../../../../store/ducks/component/types'
import {Extras} from '../../../../store/ducks/extras/types'
import {KTSVG} from '../../../design/helpers'
import {useDispatch} from 'react-redux'
import {
  // deleteComponentRequest,
  deleteExtraRequest,
  // updateComponentRequest,
} from '../../../../store/ducks/component/actions'
// import {useNavigate} from 'react-router-dom'

// import Create from './create'
// import Update from './update'

import CreateExtra from '../extra/create'
import CreateExtraImg from '../extra/create_img'
import CreateExtraVideo from '../extra/create_video'
import CreateExtraFile from '../extra/create_file'
import UpdateExtra from '../extra/update'
import CreateLink from '../extra/create_link'

type Props = {
  className: string
  comp: ComponentState
}

const ManageItemExtraWidget: React.FC<React.PropsWithChildren<Props>> = ({className, comp}) => {
  console.log('COMP AQUI', comp)
  const [show, setShow] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [child] = useState<Component>({})
  const [extra, setExtra] = useState<Extras>({})
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleClose = () => {
    setShow(false)
  }

  const createExtra = () => {
    setAction('createExtra')
    setShow(true)
  }

  const createLink = () => {
    setAction('createLink')
    setShow(true)
  }

  const createExtraImg = () => {
    setAction('createExtraImg')
    setShow(true)
  }

  const createExtraVideo = () => {
    setAction('createExtraVideo')
    setShow(true)
  }

  const createExtraFile = () => {
    setAction('createExtraFile')
    setShow(true)
  }

  const updateExtra = (extra: Extras) => {
    setAction('updateExtra')
    setShow(true)
    setExtra(extra)
  }

  // Deleta extra:
  const deleteExtra = (extra: Extras) => {
    console.log("xxxextra", extra)
    dispatch(deleteExtraRequest(extra.id!))
  }

  return (
    <>
      <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        enforceFocus={false}
        // centered
        backdrop='static'
        keyboard={false}
        fullscreen={'sm-down'}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {/* { (action === 'createComponent')?'Adicionar componente':'' }
          { (action === 'updateComponent')?'Editar componente':'' } */}
            {action === 'createExtra' ? 'Adicionar extra' : ''}
            {action === 'createLink' ? 'Adicionar extra - link' : ''}
            {action === 'createExtraImg' ? 'Adicionar extra - imagem' : ''}
            {action === 'createExtraFile' ? 'Adicionar extra - arquivo' : ''}
            {action === 'createExtraVideo' ? 'Adicionar extra - video' : ''}
            {action === 'updateExtra' ? 'Editar extra' : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* { (action === 'createComponent')?<Create handleClose={handleClose} />:'' }
          { (action === 'updateComponent')?<Update handleClose={handleClose} child={child} />:'' } */}
          {action === 'createExtra' ? <CreateExtra handleClose={handleClose} /> : ''}
          {action === 'createLink' ? <CreateLink handleClose={handleClose} /> : ''}
          {action === 'createExtraImg' ? <CreateExtraImg handleClose={handleClose} /> : ''}
          {action === 'createExtraFile' ? <CreateExtraFile handleClose={handleClose} /> : ''}
          {action === 'createExtraVideo' ? <CreateExtraVideo handleClose={handleClose} /> : ''}
          {action === 'updateExtra' ? <UpdateExtra handleClose={handleClose} child={extra} /> : ''}
        </Modal.Body>
      </Modal>

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Extra</span>
            <span className='text-muted mt-1 fw-bold fs-7'>Gerencie os atributos extras desse componente.</span>
          </h3>
          <div
            className='card-toolbar justify-content-between d-flex'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            style={{width: '100%'}}
          >
            <a href='#!' className='btn btn-sm w-100 btn-light-primary m-2' onClick={() => createExtra()}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo item
            </a>
            <a href='#!' className='btn btn-sm w-100 btn-light-primary m-2' onClick={() => createLink()}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo link
            </a>
            <a href='#!' className='btn btn-sm w-100 btn-light-primary m-2' onClick={() => createExtraVideo()}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo Vídeo
            </a>
            <a href='#!' className='btn btn-sm w-100 btn-light-primary m-2' onClick={() => createExtraImg()}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Nova imagem
            </a>
            <a href='#!' className='btn btn-sm w-100 btn-light-primary m-2' onClick={() => createExtraFile()}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Novo Arquivo
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
                  {/* <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-9-check'
                    />
                  </div>
                </th> */}
                  <th className='min-w-50px'>Tipo</th>
                  <th className='min-w-100px'>Descrição</th>
                  <th className='min-w-120px'></th>
                  <th className='min-w-50px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {comp.data.extras?.map((extra, index) => {
                  console.log("VER AQUI##", extra)
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
                            {/* <Link
                              to={'/manage/' + extra.id}
                              style={{display: 'flex'}}
                              className='text-dark fw-bolder text-hover-primary fs-6'
                            > */}
                              {extra.keyExtra}
                              
                            {/* </Link> */}
                            {/* <span className='text-muted fw-bold text-muted d-block fs-7'>
                            {child.description}
                          </span> */}
                          </div>
                        </div>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {extra.valueExtra?.substring(0, 15)}...
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a> */}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {(extra.keyExtra == "url")? 
                              <iframe
                              title='video'
                              className='embed-responsive-item rounded'
                              src={extra.valueExtra}
                              style={{width:150}}
                              height={75}
                              frameBorder={0}
                              // allow='autoplay; fullscreen'
                              // allowFullScreen
                            />
                              :''}
                        </span>
                      </td>
                      
                      {/* <td className='text-end'>
                      <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-muted me-2 fs-7 fw-bold'>50%</span>
                        </div>
                        <div className='progress h-6px w-100'>
                          <div
                            className='progress-bar bg-primary'
                            role='progressbar'
                            style={{width: '50%'}}
                          ></div>
                        </div>
                      </div>
                    </td> */}
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          {/* <a
                          href='#!'
                          onClick={() => history.push('/manage/'+child.id)} 
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen019.svg'
                            className='svg-icon-3'
                          />
                        </a> */}
                          <a
                            href='#!'
                            onClick={() => updateExtra(extra)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          <a
                            href='#!'
                            onClick={() => {
                              if (window.confirm('Are you sure you wish to delete this item?'))
                                deleteExtra(extra)
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

export {ManageItemExtraWidget}
