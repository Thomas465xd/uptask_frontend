import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6 rounded">
            
            <h1 className="text-3xl md:text-4xl font-bold text-red-700 underline mb-6">
                Error: 404
            </h1>

            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-red-400 mb-6">
                    Page Not Found
                </h2>
                <p className="text-lg text-gray-700">
                    If you think this is an error, please contact us.
                </p>
                <p className="mt-4 text-gray-600">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link 
                    to="/" 
                    className="mt-6 inline-block px-6 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
}
