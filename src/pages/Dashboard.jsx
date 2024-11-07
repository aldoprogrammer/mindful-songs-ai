import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { Chip } from '@material-tailwind/react';
import MindfulSong from '../components/dashboard/MindfulSong';

const Dashboard = () => {
    const [tab, setTab] = useState(0);
 
    return (
        <div className="flex flex-col h-screen">
            <Topbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex flex-col w-full p-5 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Mindeful Songs: Solution That Meet You Where You Are and Help You Find Peace
                    </h1>
                    <div className="mb-6">
                        <div className="flex gap-4 mb-4 cursor-pointer">
                            <Chip
                                color={tab === 0 ? 'blue' : 'gray'}
                                onClick={() => setTab(0)}
                                value="Safe YOU"
                            />
                        </div>
                    </div>
                    <div className="food-container flex flex-col flex-grow overflow-y-auto border rounded-md border-gray-200 p-4 mb-6 shadow-lg">
                        {tab === 0 && (
                          <MindfulSong />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
