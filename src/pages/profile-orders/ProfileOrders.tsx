import React, {useEffect} from 'react';
import OrderList from '../../components/order-list/OrderList';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {userOrdersConnect, userOrdersDisconnect} from '../../services/actions/userOrders';
import {WEB_SOCKET_BASE} from '../../constants';
import {ordersConnect} from "../../services/actions/orders";

const ProfileOrders = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const userData = useAppSelector(state => state.userOrders.orders);

    const token: string | undefined = localStorage
        .getItem('accessToken')
        ?.split('Bearer ')[1];

    const executedRef = React.useRef(false);

    useEffect(() => {
        if (!executedRef.current) {
            executedRef.current = true;
            dispatch(userOrdersConnect(WEB_SOCKET_BASE.USER_ORDERS + `?token=${token ?? ''}`));
        }

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

