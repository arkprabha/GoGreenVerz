import React from 'react'
import ProfileEmployeeDialog from './profile'
import LandOwnerProfile from './ProfilePage/LandOwnerProfile';
import InvestorProfilePage from './ProfilePage/InvestorProfilePage';

export default function UserProfile() {

 const UserProfileType = localStorage.getItem('UserProfileType');

  return (
    <div>
        {
            UserProfileType === 'Land owner' && <LandOwnerProfile />
        }
        {
            UserProfileType === 'Investor' && <InvestorProfilePage />
        }
    </div>
  )
}
