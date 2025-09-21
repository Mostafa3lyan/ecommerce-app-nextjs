import UserProfile from '@/components/userProfile/userProfile';
import getUserInfo from '@/utilities/getUserInfo';
import React from 'react';

const Profile = async () => {
    const userInfo = await getUserInfo();
    const user = userInfo?.user || null;


    return (
        <>
            <UserProfile user={user} />

        </>
    );
}

export default Profile;
