import UserOrders from '@/components/userOrders/userOrders';
import getUserInfo from '@/utilities/getUserInfo';

const Allorders = async () => {
    const userInfo = await getUserInfo();
    const userId = userInfo?.sub || null;

    return (
        <>
            <h2 className="font-semibold text-xl mb-4 text-center py-3">Orders History</h2>
            <UserOrders id={userId} />
        </>
    );
};

export default Allorders;
