/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../../store'

type Props = {
  changeMenu: React.Dispatch<React.SetStateAction<string>>
}

export function AsideMenuMain({changeMenu}: Props) {
  const intl = useIntl()
  const me = useSelector((state: ApplicationState) => state.me)

  return (
    <>
      {me.me.flags === 1 ? ( //If user is admin, show de change menu button
        // <button type='button' className="btn-block btn btn-light-primary m-2" onClick={() => changeMenu('user')}>Change to user</button>
        <div onClick={() => changeMenu('admin')}>
          <AsideMenuItem
            to='#!'
            icon='/media/icons/duotune/art/art002.svg'
            title={intl.formatMessage({id: 'MENU.CHANGETOADM'})}
            fontIcon='bi-app-indicator'
          />
        </div>
      ) : (
        ''
      )}
      <AsideMenuItem
        to='/onlinecourses'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.ONLINECOURSES'})}
      />
      {/* <AsideMenuItem 
        to="/modules/106" 
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title="Modules" 
      />
      <AsideMenuItem 
        to="/class" 
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title="Class" 
      /> */}
      {/* <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      /> */}
      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Links</span>
        </div>
      </div>
      <AsideMenuItem
        to='/annotation'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.MYANNOTATIONS'})}
      />
      <AsideMenuItem
        to='/agenda/819'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.AGENDA'})}
      />
      <AsideMenuItem
        to='/modules/808'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.REPLAY'})}
      />
      {/*
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      */}

      {/* <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Suporte</span>
        </div>
      </div>
      <AsideMenuItem
        to='/mysupport'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-app-indicator'
        title={intl.formatMessage({id: 'MENU.SUPPORT'})}
      />
      {/* <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub> */}
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
          <span className='menu-title'>{intl.formatMessage({id: 'MENU.CHANGELOG'})} {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}
