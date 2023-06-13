import React, {ChangeEvent, SyntheticEvent, useEffect, useMemo, useState} from "react";
import styles from "../../pages/profile-page/profile-page.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {updateUser} from "../../services/actions/user";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";

const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    const email = null === user ? '' : user.email;
    const name = null === user ? '' : user.name;
    const password = null === user ? '' : user.password;

    const [form, setForm] = useState({
        email,
        name,
        password,
    });

    useEffect(() => {
        setForm({
            name,
            email,
            password,
        });
    }, [dispatch, name, email, password]);

    const isChanged = useMemo(() => {
        return email !== form.email
            || name !== form.name
            || password !== form.password;
    }, [
        email,
        form,
        name,
        password,
    ]);

    function onFormChange(event: ChangeEvent<{name: string, value: string}>): void {
        const fieldName = event
            .target
            .name;
        const fieldValue = event
            .target
            .value;

        setForm({
            ...form,
            [fieldName]: fieldValue,
        });
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        dispatch(updateUser({
            email: form.email,
            name: form.name,
            password: form.password
        }));
    };

    function onReset(event: SyntheticEvent): void {
        event.preventDefault();

        setForm({
            email,
            name,
            password,
        });
    }

    return (
        <section className={styles.form}>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <Input
                    onChange={onFormChange}
                    name={'name'}
                    icon="EditIcon"
                    placeholder="Имя"
                    value={form.name}
                />
                <EmailInput
                    name={'email'}
                    placeholder="Логин"
                    /** @ts-ignore */
                    icon="EditIcon"
                    onChange={onFormChange}
                    value={form.email}
                />
                <PasswordInput
                    onChange={onFormChange}
                    name={'password'}
                    icon="EditIcon"
                    value={form.password}
                />
                <Button
                    htmlType="submit"
                    size="medium"
                    type="primary"
                >
                    Сохранить
                </Button>
                {
                    isChanged
                        ? (
                            <Button
                                htmlType={'button'}
                                onClick={onReset}
                                size="large"
                                type="secondary"
                            >
                                Отмена
                            </Button>
                        )
                        : null
                }
            </form>
        </section>
    );
};

export default ProfileForm;
