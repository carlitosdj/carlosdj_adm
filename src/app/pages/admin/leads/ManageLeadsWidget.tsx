/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Button, FormControl, InputGroup} from 'react-bootstrap-v5'
// import {Link} from 'react-router-dom'

// import {KTSVG} from '../../../design/helpers'
import {useDispatch} from 'react-redux'

// import {useNavigate} from 'react-router-dom'
// import Create from './create'
// import Update from './update'
// import {Wppcamp, WppcampState} from '../../../../store/ducks/wppcamp/types'
// import {deleteCampRequest} from '../../../../store/ducks/wppcamp/actions'
import {LeadsState} from '../../../../store/ducks/leads/types'
import {loadLeadsRequest, searchLeadsRequest} from '../../../../store/ducks/leads/actions'
// import _ from "lodash";
// import { Link } from 'react-router-dom'
import Pagination from '../../../../customHooks/Pagination';

type Props = {
  className: string
  leads: LeadsState
  page?: string
  take?: string
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
}

const ManageLeadsWidget: React.FC<React.PropsWithChildren<Props>> = ({className, leads, page, take, setCurrentPage, currentPage}) => {
  const [search, setSearch] = useState('')
  
  console.log("PARAMS: page", page)
  console.log("PARAMS: take", take)
  console.log("Current PAGE", currentPage)
  // useEffect(() => {
  //   setCurrentPage(+page!)
  // }, [setCurrentPage, currentPage])

  // const [extra, setExtra] = useState<Extras>({});
  const dispatch = useDispatch()
  // const history = useHistory();

  const searchLeads = () => {
    console.log('search', search)
    if (search) 
      dispatch(searchLeadsRequest(search))
    else 
      dispatch(loadLeadsRequest(+page!,+take!))
  }
  console.log('leads', leads)
  let count = leads.count
  // let pages = Math.ceil(+count! / +take!)
  let length = leads?.data?.length
  return (
    <div>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Pesquise por e-mail, nome, ...'
          aria-label='Pesquisa'
          aria-describedby='basic-addon2'
          value={search}
          onChange={(e:any) => setSearch(e.target.value)}
        />
        {/* <InputGroup.Append> */}
        <Button variant='outline-secondary' onClick={searchLeads}>
          Pesquisar
        </Button>
        {/* </InputGroup.Append> */}
      </InputGroup>
      <div style={{marginLeft: 5}}>A pesquisa retornou: {count} dados</div> 
      {!search?
        <div style={{marginLeft: 5}}>Mostrando: {(+page! - 1) * (+take!) + 1} - {(+page! - 1) * (+take!) + +length!}</div>
        : ''
      }
      
      <br />
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Leads</span>
            <span className='text-muted mt-1 fw-bold fs-7'>Leads gerados</span>
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
                  <th className='min-w-150px'>Nome</th>
                  <th className='min-w-140px'>Email</th>
                  <th className='min-w-120px'>Lista</th>
                  <th className='min-w-120px'>CreatedAt</th>
                  <th className='min-w-120px'>Confirmado</th>
                  <th className='min-w-120px'>ConfirmedAt</th>
                  <th className='min-w-120px'>Não perturbe</th>
                  <th className='min-w-120px'>Origem</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {leads.data?.map((child, index) => {
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
                            {child.name}
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
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.email}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.list}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.createdAt}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.confirm}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.confirmedAt}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.naoperturbe}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.origin}
                        </span>
                      </td>

                      {/* <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <a
                            href='#!'
                            onClick={() => history.push('/wppgroup/'+child.id)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          <a
                            href='#!'
                            onClick={() => updateComponent(child)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                          </a>
                          <a
                            href='#!'
                            onClick={() => { if (window.confirm('Deseja realmente excluir: ' + child.name + '?')) deleteComponent(child)  } }
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        </div>
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

      {!search?   
      <Pagination
        className=""
        currentPage={currentPage!}
        totalCount={count}
        pageSize={take}
        onPageChange={(page:any) => setCurrentPage(page)}
        link="leads"
      />
      :''}
    </div>
  )
}

export {ManageLeadsWidget}
