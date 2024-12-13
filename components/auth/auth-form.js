import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import classes from './auth-form.module.css';
import { AuthContext } from '@/pages/store/auth-context';

function AuthForm() {
    const eref = useRef();
    const pref = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const authContext = useContext(AuthContext);

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(event) {
        event.preventDefault();
        const email = eref.current.value;
        const pass = pref.current.value;

        if (isLogin) {
            const result = await authContext.login(email, pass);
            if (result.success) {
                router.push('/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } else {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: pass }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok && data.message === 'User created successfully!') {
                alert('Signup successful! Please log in.');
                setIsLogin(true);
            } else {
                alert(data.message || 'Signup failed. Please try again.');
            }
        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={eref} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={pref} />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;