import React, {FC, useEffect, useState} from 'react'
import {PageTitle} from '../../../design/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'
import {ManageUsersWidget} from './ManageUsersWidget'

import {UsersState} from '../../../../store/ducks/users/types'
import {loadUsersRequest} from '../../../../store/ducks/users/actions'
import { useParams } from 'react-router-dom'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

type Props = {
  users: UsersState
  page?: string
  take?: string
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
}

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({users, page, take, setCurrentPage, currentPage}) => (
  <>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageUsersWidget users={users} className='card-xxl-stretch mb-5 mb-xxl-8' page={page} take={take} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </div>
    {/* end::Row */}
  </>
)

type ParamTypes = {
  take: string
  page: string
}

const ManageLeads: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const users = useSelector((state: ApplicationState) => state.users)
  const {page, take} = useParams<ParamTypes>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadUsersRequest(+page!,+take!))
  }, [dispatch, page, take])

  if (users.loading) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Usuários</PageTitle>
      <ManagePage users={users} page={page} take={take} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </>
  )
}
export default ManageLeads
