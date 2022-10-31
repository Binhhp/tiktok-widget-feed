import { FeedbackBox, SidebarWrapper, SupportLink } from './SidebarStyle';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MenuList from './MenuList';
import { useSelector } from 'react-redux';
import { RootReducer } from 'stores/Admin/reducers';
import { ChatMajor } from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';
import FeedBack from './FeedBack';

function Sidebar() {
  const appReducer = useSelector((state: RootReducer) => state.appReducer);
  return (
    <SidebarWrapper active={appReducer.mobileMenuView}>
      <BrowserView>
        <PerfectScrollbar
          component='div'
          style={{
            height: 'calc(100% - 60px)',
          }}>
          <MenuList></MenuList>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <MenuList></MenuList>
      </MobileView>

      <SupportLink>
        <FeedBack />
        <div className='link-sp'>
          <Icon source={ChatMajor} color='base' />
          <span>Live Chat Support</span>
        </div>
      </SupportLink>
    </SidebarWrapper>
  );
}

export default Sidebar;
