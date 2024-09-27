import React from 'react'

function PrimaryTable({ data, onEdit }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-md text-black uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Schedule Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(schedule => [
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {schedule?.userEmail}
                                </th>
                                <td className="px-6 py-4">
                                    {schedule?.scheduledDate?.replace("T", " ")?.replace(".000Z", "")}
                                </td>
                                <td className="px-6 py-4">
                                    <p className={`bg-orange-400 rounded px-3 py-2 font-medium inline text-white ${schedule?.status=='confirmed' && 'bg-green-500'} ${schedule?.status=='cancelled' && 'bg-red-500'}`}>
                                    {schedule?.status}
                                    </p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onEdit(schedule)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ])
                    }
                    {(!data?.length) ? <tr>
                        <td>
                            <div className='text-center py-2 px-3 w-full'>No Schedule Listed</div>
                        </td>
                    </tr> : ""}
                </tbody>
            </table>
        </div>
    )
}

export default PrimaryTable
