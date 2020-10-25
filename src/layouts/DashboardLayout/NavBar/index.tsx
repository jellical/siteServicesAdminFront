import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles
} from '@material-ui/core';
import {
  BookOpen as BookOpenIcon
} from 'react-feather';
import NavItem from './NavItem';

import {useTranslation} from 'react-i18next'

function renderNavItems({
  items,
  pathname,
  depth = 0
}:{
  items: any,
  pathname: string,
  depth?:number
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc:any[], item:any) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth
}:{
  acc:any[],
  pathname:string,
  item: any,
  depth: number
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 200
  },
  desktopDrawer: {
    width: 200,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }:{onMobileClose:any, openMobile:boolean}) => {
  const classes = useStyles();
  const location = useLocation();


  const {t} = useTranslation()


  const sections = [
    {
      subheader: t('List'),
      items: [
        {
          title: t('Websites'),
          icon: BookOpenIcon,
          href: '/websites'
        }
      ]
    }
  ];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>

        <Box p={2}>
          {sections.map((section,index) => (
            <List
              key={index}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {section.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />

      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}


export default NavBar