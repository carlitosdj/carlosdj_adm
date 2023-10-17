import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../design/layout/core'
// import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {loadComponentRequest} from '../../../../store/ducks/component/actions'
import {ComponentState} from '../../../../store/ducks/component/types'
import Loading from '../../../loading'

import {ManageItemWidget} from './ManageItemWidget'
import {ManageItemExtraWidget} from './ManageItemExtraWidget'
import {Alert} from 'react-bootstrap-v5'

type ParamTypes = {
  id: string
}

type Props = {
  comp: ComponentState
}

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({comp}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-9'>
        <ManageItemWidget comp={comp} className='card-xxl-stretch mb-5 mb-xxl-7' />
      </div>
      <div className='col-xxl-3'>
        <ManageItemExtraWidget comp={comp} className='card-xxl-stretch mb-5 mb-xxl-5' />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)
  let {id} = useParams<ParamTypes>()

  useEffect(() => {
    dispatch(loadComponentRequest(id!, 'DESC')) //Puxa componentes com seus filhos primários
  }, [id, dispatch])

  if (component.loading && component.data) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>{component.data.name}</PageTitle>
      {component.error && <Alert variant='danger'>{JSON.stringify(component.error)};</Alert>}
      <ManagePage comp={component} />
      
    </>
  )
}
export default Manage
