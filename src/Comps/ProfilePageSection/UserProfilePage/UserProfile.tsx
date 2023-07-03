import LandOwnerProfile from '../LandOwnerProfile';
import InvestorProfilePage from '../InvestorProfilePage';
import GoProjectDevProfilePage from '../GoProjectDevProfilePage';
import PlanationProfilePage from '../PlanationProfilePage';
import VVBProfilePage from '../VVBProfilePage';
import CRICarbonProfilePage from '../CRICarbonProfilePage';
import GovtAgencyProfile from '../GovtAgencyProfile';
import AdminProfilePage from '../AdminProfilePage';
import BuyerProfilePage from '../BuyerProfilePage';

export default function UserProfile() {

    const  UserProfileType: string | null = localStorage.getItem('UserProfileType') ?? '';

  return (
    <div>
        {
              UserProfileType === 'Land owner' && <LandOwnerProfile />
        }
        {
            UserProfileType === 'Investor' && <InvestorProfilePage />
        }
        {
            UserProfileType === 'GoGreenverz or Project Developer' && <GoProjectDevProfilePage />
        }
        {
            UserProfileType === 'Plantation Partner' && <PlanationProfilePage />
        }
        {
            UserProfileType === 'Verification and Validation Body' && <VVBProfilePage />
        }
        {
            UserProfileType === 'Carbon Registry of India' && <CRICarbonProfilePage />
        }
        {
            UserProfileType === 'Government Agencies' && <GovtAgencyProfile />
        }
        {
            UserProfileType === 'Admin' && <AdminProfilePage />
        }
        {
            UserProfileType === 'Buyers' && <BuyerProfilePage />
        }
    </div>
  )
}
