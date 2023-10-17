import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../design/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'

import {ManageSupportsWidget} from './ManageSupportsWidget'
import {loadAllsupportsRequest} from '../../../../store/ducks/support/actions'
import {SupportState} from '../../../../store/ducks/support/types'
import { loadAllcontactsRequest, loadcontactsRequest } from '../../../../store/ducks/contact/actions'
import { ContactState } from '../../../../store/ducks/contact/types'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

// const MOMENT = require('moment')

type Props = {
  contactList: ContactState
}

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({contactList}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageSupportsWidget
          contactList={contactList}
          className='card-xxl-stretch mb-5 mb-xxl-8'
        />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const Contact: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const contact = useSelector((state: ApplicationState) => state.contact)
  console.log("Contact", contact)

  useEffect(() => {
    // console.log("DISPATCHINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
    dispatch(loadAllcontactsRequest())
  }, [dispatch])

  if (contact.loading) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Suporte</PageTitle>
      <ManagePage contactList={contact} />
    </>
  )
}
export default Contact
