import React from 'react';

const UserProfile = React.lazy(() => import('./views/Users/Profile'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const SmsTemplate = React.lazy(() => import('./views/Messaging/SmsTemplate'));
const Message = React.lazy(() => import('./views/Messaging/Message'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/profile/me', name: 'Profile', component: UserProfile },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/messaging/sms-template', exact: true, name: 'SMS Template', component: SmsTemplate },
  { path: '/messaging/send-sms', exact: true, name: 'Send SMS', component: Message },
  
];

export default routes;
