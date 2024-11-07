import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('orders');

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Topbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex flex-col w-full p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Manage Your Profile
                    </h1>
                    <div className="mb-4">
                        <div className="flex border-b border-gray-300">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`py-2 px-4 text-lg font-medium ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('recipes')}
                                className={`py-2 px-4 text-lg font-medium ${activeTab === 'recipes' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            >
                                Recipes
                            </button>
                            <button
                                onClick={() => setActiveTab('schedule')}
                                className={`py-2 px-4 text-lg font-medium ${activeTab === 'schedule' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            >
                                Schedule
                            </button>
                        </div>
                        <div className="mt-4">
                            {/* {activeTab === 'orders' && (
                                <Orders />
                            )}
                            {activeTab === 'recipes' && (
                                <Recipes />
                            )}
                            {activeTab === 'schedule' && (
                                <Schedule />
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
