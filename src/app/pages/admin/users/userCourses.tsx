import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {
  createComponentAccessRequest,
  createComponentAccessSuccess,
  loadComponentWithAccessRequest,
  loadLastClassRequest,
} from '../../../../store/ducks/component/actions'
import {User} from '../../../../store/ducks/me/types'
import Loading from '../../../loading'
import {Button, Col, Form} from 'react-bootstrap-v5'
import {Component} from '../../../../store/ducks/component/types'
import {getAllJSDocTagsOfKind} from 'typescript'

const MOMENT = require('moment')

interface handleCloseProps {
  handleClose: () => void
  child: User
}

const UserCourses = ({handleClose, child}: handleCloseProps) => {
  // const {id} = useParams();
  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)
  const [componentsSelected, setComponentsSelected] = useState<any[]>([])

  useEffect(() => {
    //dispatch(loadLastClassRequest(child.id!))
    dispatch(loadComponentWithAccessRequest('2', child.id?.toString()!, 'desc'))
    // setCount((prev) => {
    //   return prev + 1
    // })
  }, [])

  useEffect(() => {
    setComponentsSelected(
      component.data.children
        ?.filter((comp) => comp.access?.length > 0)
        ?.map((comp) => ({userId: child.id, componentId: comp.id, status: '1'}))!
    )
  }, [component.data.id])

  const handleSubmit = () => {
    //console.log("componentsSelected", componentsSelected)
    componentsSelected.map((access) => {
      console.log('ACCESS', access)
      dispatch(createComponentAccessRequest(access))
      handleClose()
    })
  }

  const checkArrayInArray = (arr: any, farr: any) => {
    if (JSON.stringify(arr).includes(JSON.stringify(farr))) return true
    return false
  }

  console.log('componentsSelected', componentsSelected)
  const handleMultiSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    componentSelected: Component
  ) => {
    console.log('component-selected', componentSelected)
    if (event.target.checked) {
      //setComponentsSelected([...componentsSelected, componentSelected])
      //Verifica se existe o par ComponentId e UserId dentro de componentsSelected

      if (
        checkArrayInArray(componentsSelected, {
          userId: child.id,
          componentId: componentSelected.componentId,
          status: 0,
        })
      ) {
        setComponentsSelected((current: any) =>
          Object.assign([], current, {
            ...current.map((item: any) => {
              if (item.componentId === componentSelected.componentId) {
                console.log('ACHEI', componentSelected)
                return {userId: child.id, componentId: componentSelected.componentId, status: '1'}
              }
              return item
            }),
          })
        )
      } else {
        setComponentsSelected([
          ...componentsSelected,
          {userId: child.id, componentId: componentSelected.componentId, status: '1'},
        ])
      }

      //console.log("CHECK2",checkArrayInArray(componentsSelected,{ userId: child.id, componentId: componentSelected.componentId, status: '1' }))
      // console.log("Check 2",{ userId: child.id, componentId: componentSelected.componentId, status: '1' })
      // console.log("exists2",exists2)
    } else {
      setComponentsSelected((current: any) =>
        Object.assign([], current, {
          ...current.map((item: any) => {
            if (item.componentId === componentSelected.componentId) {
              console.log('ACHEI', componentSelected)
              return {userId: child.id, componentId: componentSelected.componentId, status: 0}
            }
            return item
          }),
        })
      )
    }
  }

  let urlLastClass: string | undefined = ''
  let checkLastClass = component.lastclass?.extras?.filter(
    (extra: any) => extra.keyExtra === 'url'
  )[0] //Checa se tem o 'extra' de url.
  if (checkLastClass) urlLastClass = checkLastClass.valueExtra
  console.log('component', component)

  // var data = new Date(apiResponse.createdAt*1000);
  // let createdAt = MOMENT(child.createdAt) //.format('DD/MM/YYYY HH:mm')
  // var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
  // var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
  // var dst = '$1.$2.$3-$4'
  // var cpfformat = child.cpf?.replace(src, dst)

  //return <div>oi</div>
  return (
    <>
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-4'>
          <img
            //src={users.user.image}
            //src={ image?.includes('https://') ? image : '../../files/' + image}
            src={
              child.image?.includes('https://')
                ? child.image
                : 'https://carlosdj.com.br/files/' + child.image
            }
            style={{width: '100%'}}
            onError={({currentTarget}) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = 'https://carlosdj.com.br/files/guestuser.jpg'
            }}
          />
        </div>
        <div className='col-xxl-8'>
          <h1>{child.name}</h1>
          <span>{child.email}</span>
          <br />
          <br />
          {component.loadingAccess ? (
            <Loading />
          ) : (
            <div>
              <Form.Group as={Col} controlId='my_multiselect_field'>
                {component.data.children?.map((child, index) => {
                  return (
                    <div className='p-2' key={index}>
                      <input
                        className='form-check-input widget-9-check'
                        type='checkbox'
                        id={child.id?.toString()}
                        style={{backgroundColor: 'rgb(112 107 107)', color: 'black'}}
                        defaultChecked={child.access ? (child.access.length ? true : false) : false}
                        onChange={(e) => {
                          handleMultiSelect(e, {componentId: child.id, status: '1'})
                        }}
                        //onChange={(e: any) => selectAll(e)}
                      />
                      {' ' + child.name}
                    </div>
                  )
                })}
              </Form.Group>
            </div>
          )}
        </div>
        <br />
        <Button variant='primary' type='button' onClick={handleSubmit}>
          Salvar
        </Button>
      </div>
    </>
  )
}
export default UserCourses
