/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
// import {KTSVG} from '../../../helpers'
// import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
// import {useSelector} from 'react-redux'
// import {ApplicationState} from '../../../../../store'
// import {Link} from 'react-router-dom'

// type Props = {
//   changeMenu: React.Dispatch<React.SetStateAction<string>>
// };

export function AsideMenuMainAdmin() {
  const intl = useIntl()
  // const me = useSelector((state: ApplicationState) => state.me)

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen001.svg'
        title={intl.formatMessage({id: 'MENUADMIN.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/manage/1'
        icon='/media/icons/duotune/abstract/abs037.svg'
        title={intl.formatMessage({id: 'MENUADMIN.ROOT'})}
        fontIcon='bi-app-indicator'
      />

      




      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>INFO-PRODUTOS</span>
        </div>
      </div>
      <AsideMenuItem
        to='/manage/2'
        icon='/media/icons/duotune/abstract/abs027.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.COURSES'})}
      />
      <AsideMenuItem
        to='/annotations'
        icon='/media/icons/duotune/art/art003.svg'
        fontIcon='bi-app-indicator'
        // title={intl.formatMessage({id: 'MENUADMIN.LEADS'})}
        title={'Anotações'}
      />
      <AsideMenuItem
        to='/annotations'
        icon='/media/icons/duotune/art/art003.svg'
        fontIcon='bi-app-indicator'
        // title={intl.formatMessage({id: 'MENUADMIN.LEADS'})}
        title={'Comentários'}
      />

      <AsideMenuItem
        to='/users/1/10'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.USERS'})}
      />

<div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>LAUNCHES</span>
        </div>
      </div>
      <AsideMenuItem
        //to='/manage/510'
        to='/launch'
        icon='/media/icons/duotune/general/gen002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.MYLAUNCHES'})}
      />
      <AsideMenuItem
        to='/leads/1/10'
        icon='/media/icons/duotune/general/gen022.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.LEADS'})}
      />
      <AsideMenuItem
        to='/wppcamp'
        icon='/media/icons/duotune/general/gen008.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.WHATSAPPGROUPS'})}
      />
      

      <AsideMenuItem
        to='/manage/5'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.PREEMAILS'})}
      />
      <AsideMenuItem
        to='/emailsenviados'
        icon='/media/icons/duotune/communication/com002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.EMAILS'})}
      />

      {/* <AsideMenuItem
        to='/manage/756'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.CLASS'})}
      /> */}

      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>REWARDS</span>
        </div>
      </div>
      <AsideMenuItem
        to='/manage/652'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.DIGITALREWARDS'})}
      /> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>LISTS</span>
        </div>
      </div> */}
      
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>E-MAILS</span>
        </div>
      </div> */}
      
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>SUPPORT</span>
        </div>
      </div>
      <AsideMenuItem
        to='/support'
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.SUPPORT'})}
      />
      <AsideMenuItem
        to='/contact'
        icon='/media/icons/duotune/communication/com010.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.CONTACT'})}
      />

      {/*
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>FAST LINKS</span>
        </div>
      </div>
       <AsideMenuItem 
        to="/item/guia-violao-iniciante/SITE" 
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.EBOOK'})}
      />
      <AsideMenuItem 
        to="/item/lives-de-quinta/SITE" 
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.LIVES'})}
      />
      <AsideMenuItem 
        to="/participe/inscricao-abr22/FB" 
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.LEADSCAPTURE'})}
      />
      <AsideMenuItem 
        to="/blog/imersao-abr22/aula01" 
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.BLOG'})}
      />
      <AsideMenuItem 
        to="/inscricao/turma-abr22" 
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENUADMIN.SALESPAGE'})}
      /> */}

      {/* <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>{intl.formatMessage({id: 'MENUADMIN.CHANGELOG'})} {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}
