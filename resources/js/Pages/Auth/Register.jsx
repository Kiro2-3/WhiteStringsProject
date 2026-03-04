import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

// Modern minimalist registration page for brand new users.
// The form is managed by Inertia's `useForm` hook.
export default function Register() {
    // useForm hook manages all form state and submission logic
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            // clear password fields after attempt for security
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
            <Head title="Register" />

            {/* Main registration card container */}
            <div className="w-full max-w-md">
                {/* Header section with title and description */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                    <p className="mt-2 text-sm text-gray-600">Join us to get started</p>
                </div>

                {/* White card with subtle shadow and border */}
                <div className="rounded-lg bg-white px-8 py-8 shadow-sm ring-1 ring-gray-200">
                    <form onSubmit={submit} className="space-y-5">
                        {/* Full name input field */}
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* Email input field */}
                        <div>
                            <InputLabel htmlFor="email" value="Email Address" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Password input field */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Password confirmation field */}
                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                placeholder="••••••••"
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1"
                            />
                        </div>

                        {/* Register button - shows loading state while processing */}
                        <PrimaryButton
                            className="w-full py-2.5 font-medium"
                            disabled={processing}
                        >
                            {processing ? 'Creating account...' : 'Create Account'}
                        </PrimaryButton>
                    </form>

                    {/* Footer section - link back to login */}
                    <div className="mt-6 border-t border-gray-200 pt-6">
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer disclaimer text */}
                <p className="mt-6 text-center text-xs text-gray-500">
                    By creating an account, you agree to our terms of service
                </p>
            </div>
        </div>
    );
}
