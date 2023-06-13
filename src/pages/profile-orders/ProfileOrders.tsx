import React, {useEffect} from 'react';
import OrderList from '../../components/order-list/OrderList';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {userOrdersConnect, userOrdersDisconnect} from '../../services/actions/userOrders';
import {WEB_SOCKET_BASE} from '../../constants';

const ProfileOrders = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const userData = useAppSelector(state => state.userOrders.orders);

    const token: string | undefined = localStorage
        .getItem('accessToken')
        ?.split('Bearer ')[1];

    useEffect(() => {
        dispatch(userOrdersConnect(WEB_SOCKET_BASE.USER_ORDERS + `?token=${token ?? ''}`));

        return () => {
            dispatch(userOrdersDisconnect());
        }
    }, [dispatch, token])

    return (
        <div>
            <OrderList ordersFeedData={userData !== undefined ? userData : null}/>
        </div>
    );
};

export default ProfileOrders;

