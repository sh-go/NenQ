import React from 'react';

export default function ContentsListSkeleton(): React.JSX.Element {
        return (
                <div className="mb-20 overflow-hidden shadow-md dark:border-gray-700 animate-pulse">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                        <tr>
                                                <th className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        日付
                                                </th>
                                                <th className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        日数
                                                </th>
                                                <th className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        時間
                                                </th>
                                                <th className="p-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        種別
                                                </th>
                                                <th className="p-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400"></th>
                                        </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                                <tr
                                                        key={i}
                                                        className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                                                >
                                                        <td className="px-2 py-4">
                                                                <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600" />
                                                        </td>
                                                        <td className="p-4">
                                                                <div className="h-4 w-8 rounded bg-gray-300 dark:bg-gray-600" />
                                                        </td>
                                                        <td className="p-4">
                                                                <div className="h-4 w-8 rounded bg-gray-300 dark:bg-gray-600" />
                                                        </td>
                                                        <td className="p-4">
                                                                <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600" />
                                                        </td>
                                                        <td className="px-2 py-4"></td>
                                                </tr>
                                        ))}
                                </tbody>
                        </table>
                </div>
        );
}

