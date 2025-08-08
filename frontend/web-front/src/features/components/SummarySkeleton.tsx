import React from 'react';

export default function SummarySkeleton(): React.JSX.Element {
        return (
                <div className="overflow-hidden rounded-lg border shadow-md dark:border-gray-700 animate-pulse">
                        <div className="grid grid-cols-3 gap-4 p-6">
                                <div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
                                <div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
                                <div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t border-gray-200 p-6 dark:border-gray-700">
                                <div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
                                <div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
                                <div className="h-6 rounded bg-gray-300 dark:bg-gray-600" />
                        </div>
                </div>
        );
}

