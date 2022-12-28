import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

import errorImage from '../../assets/errorPage.jpg';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>

            {
                error &&

                <section className="flex items-center h-screen p-16 text-gray-800">
                    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                        <div className="max-w-md text-center">
                            <img src={errorImage} alt="error" />
                            <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
                                <span className="sr-only">Error</span>
                                {error.status}
                            </h2>
                            <p className="text-2xl font-semibold md:text-3xl text-red-400">{error.statusText || error.message}</p>
                            <p className="mt-4 mb-8 text-gray-600">But don't worry, you can find plenty of other things on our homepage.</p>
                            <Link to="/" className="px-8 py-3 font-semibold rounded bg-green-600 text-gray-50">Back to homepage</Link>
                        </div>
                    </div>
                </section>
            }

        </div>
    );
};

export default ErrorPage;