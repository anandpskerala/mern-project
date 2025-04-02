import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup';
import { loginUser } from '../redux/actions/auth/loginUser';
import { signupUser } from '../redux/actions/auth/signupUser';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../components/PasswordInput';

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        name: false
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();


    const loginSchema = yup.object().shape({
        email: yup.string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: yup.string()
            .required('Password is required')
    });

    const signupSchema = yup.object().shape({
        firstName: yup.string()
            .required('First name is required'),
        lastName: yup.string()
            .required('Last name is required'),
        email: yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Please enter a valid email with a proper domain (e.g., example@domain.com)'
            )
            .required('Email is required'),
        password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        confirmPassword: yup.string()
            .required('Please confirm your password')
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    useEffect(() => {
        const validateForm = async () => {
            const schema = isLogin ? loginSchema : signupSchema;
            const formData = {
                email,
                password,
                firstName,
                lastName,
                confirmPassword
            };

            try {
                await schema.validate(formData, { abortEarly: false });
                setErrors({});
                setIsFormValid(true);
            } catch (validationErrors) {
                const newErrors = {};
                validationErrors.inner.forEach(error => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
                setIsFormValid(false);
            }
        };

        validateForm();
    }, [email, password, confirmPassword, firstName, lastName, isLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({
            email: true,
            password: true,
            confirmPassword: true,
            firstName: true,
            lastName: true
        });

        if (isFormValid) {
            let res;
            if (isLogin) {
                res = await dispatch(loginUser({ email, password }));
            } else {
                res = await dispatch(signupUser({ firstName, lastName, email, password }));
            }

            if (res && res.meta.requestStatus == "fulfilled") {
                navigate("/")
            }
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setRememberMe(false);
        setTouched({
            email: false,
            password: false,
            confirmPassword: false,
            firstName: false,
            lastName: false
        });
        setErrors({});
    };

    const handleBlur = (field) => {
        setTouched({
            ...touched,
            [field]: true
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-lg w-full">
                <div className="flex text-sm">
                    <button
                        className={`flex-1 py-4 font-medium ${isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'} cursor-pointer`}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`flex-1 py-4 font-medium ${!isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'} cursor-pointer`}
                        onClick={() => setIsLogin(false)}
                    >
                        Create Account
                    </button>
                </div>

                <div className="p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </h1>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <div className='flex items-center justify-between gap-2'>
                                    <div className="flex flex-col">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            id="first-name"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            onBlur={() => handleBlur('firstName')}
                                            className={`w-full px-4 py-2 border ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                                            placeholder="Enter first name"
                                            required={!isLogin}
                                        />
                                        <p className="mt-1 text-sm text-red-600">
                                            {touched.firstName && errors.firstName && (
                                                errors.firstName
                                            )}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            id="last-name"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            onBlur={() => handleBlur('lastName')}
                                            className={`w-full px-4 py-2 border ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                                            placeholder="Enter last name"
                                            required={!isLogin}
                                        />
                                        <p className="mt-1 text-sm text-red-600">
                                            {touched.lastName && errors.lastName && (
                                                errors.lastName
                                            )}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => handleBlur('email')}
                                className={`w-full px-4 py-2 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} outline-none rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                                placeholder="you@example.com"
                                required
                            />
                            {touched.email && errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <PasswordInput
                                name="password"
                                password={password}
                                setPassword={setPassword}
                                handleBlur={handleBlur}
                                touched={touched}
                                errors={errors}
                                placeholder={"Enter password"}
                            />
                            {touched.password && errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="mb-6">
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <PasswordInput
                                    name="confirmPassword"
                                    password={confirmPassword}
                                    setPassword={setConfirmPassword}
                                    handleBlur={handleBlur}
                                    touched={touched}
                                    errors={errors}
                                    placeholder={"Confirm password"}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex justify-between items-center mb-6 px-1">
                                <div className='flex items-center'>
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`w-full ${isFormValid && !loading ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer' : 'bg-indigo-400 cursor-not-allowed'} text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors`}
                            disabled={!isFormValid}
                        >
                            {loading ? (isLogin ? 'Logging...' : 'Creating...') : (isLogin ? 'Login' : 'Create Account')}
                        </button>
                    </form>
                    <p className="mt-8 text-center text-sm text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                        >
                            {isLogin ? 'Create an account' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}