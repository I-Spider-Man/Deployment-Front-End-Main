import React from 'react'
import { Tabs } from 'antd';
import UserOrganizedDetails from './UserOrganizedDetails';
import UserParticipantDetails from './UserParticipantDetails';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import BlockedList from './BlockedList';
import UpdateProfile from './UpdateProfile';
import Posts from './Posts';
function ProfileBottom({onRender}) {
  const { TabPane } = Tabs;
  const items = [
    {
      key:'1',
      label:'Posts',
      children: <Posts/>
    },
    {
      key: '2',
      label: 'Organized Details',
      children: <UserOrganizedDetails/>,
    },
    {
      key: '3',
      label: 'Participant Details',
      children: <UserParticipantDetails/>,
    },
    {
      key: '4',
      label: 'Followers',
      children: <FollowersList/>,
    },
    {
      key: '5',
      label: 'Following',
      children: <FollowingList/>,
    },
    {
      key: '6',
      label: 'Blocked',
      children: <BlockedList/>,
    },
    {
      key: '7',
      label: 'Update Profile',
      children: <UpdateProfile onRender={()=>onRender()}/>,
    },
  ];
  return (
    <Tabs defaultActiveKey="1">
      {items.map((item) => (
        <TabPane tab={item.label} key={item.key}>
          {item.children}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default ProfileBottom
