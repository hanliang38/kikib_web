import React from 'react';
import * as BsIcons from 'react-icons/bs';
export const SidebarData = [
  {
    title: '메인페이지',
    path: '/main',
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text',
  },
  {
    title: '근무일정관리',
    path: '/ToExamine',
    icon: <BsIcons.BsFillCalendarCheckFill />,
    cName: 'nav-text',
  },
  {
    title: '운행관리',
    path: '/About',
    icon: <BsIcons.BsFillBriefcaseFill />,
    cName: 'nav-text',
  },
  {
    title: '관리자 문의하기',
    path: '/Contact',
    icon: <BsIcons.BsFillChatDotsFill />,
    cName: 'nav-text',
  },
];
