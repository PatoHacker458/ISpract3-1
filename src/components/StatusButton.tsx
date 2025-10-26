import React from 'react';

type FilterStatus = 'all' | 'pending' | 'completed';

interface StatusButtonProps {
    status: FilterStatus;
    label: string;
    filterStatus: FilterStatus;
    setFilterStatus: (status: FilterStatus) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({ 
    status, 
    label, 
    filterStatus, 
    setFilterStatus 
}) => {
    
    const isActive = filterStatus === status;
    let baseClasses = 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-md transform hover:scale-[1.01]';
    let activeClasses = '';
    
    if (status === 'all') {
        activeClasses = isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    } else if (status === 'pending') {
        activeClasses = isActive ? 'bg-red-500 text-white' : 'bg-gray-100 text-red-500 hover:bg-gray-200';
    } else { // 'completed'
        activeClasses = isActive ? 'bg-green-600 text-white' : 'bg-gray-100 text-green-600 hover:bg-gray-200';
    }
    
    return (
        <button 
            // Llama al setter del hook
            onClick={() => setFilterStatus(status)}
            className={`${baseClasses} ${activeClasses}`}
        >
            {label}
        </button>
    );
};

export default StatusButton;