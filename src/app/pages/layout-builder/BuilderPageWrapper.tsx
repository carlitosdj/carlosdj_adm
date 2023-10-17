import React, {FC} from 'react'
import {PageTitle} from '../../design/layout/core'
import {BuilderPage} from './BuilderPage'

const BuilderPageWrapper: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
