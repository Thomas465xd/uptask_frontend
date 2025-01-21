import { Link } from 'react-router-dom';

export default function NotFound() {
    return (

        // <!-- 404 Page -->
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center rounded p-10">
            
            <div>
                <h1 className='text-4xl font-bold mb-10 text-red-700 underline'>Error: 404</h1>
            </div>            

            <div className="p-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-red-400 mb-10">Page Not Found</h1>
                <p className="mt-2 text-xl text-gray-700">If you think this is an error, please contact us</p>
                <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="mt-6 inline-block px-6 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
}