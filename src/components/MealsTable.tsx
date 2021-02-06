import React, { FunctionComponent } from 'react'

interface MealsTableInterface {
  headers: string[] | undefined;
  meals: string[][];
  addItemToList: (index: number) => void;
  isInList: (index: number) => boolean;
}

const MealsTable: FunctionComponent<MealsTableInterface> = ({headers, meals, addItemToList, isInList}) => {
  return (
    <table className="min-w-full leading-normal mb-40 md:mb-0">
      <thead>
        <tr>
          <th
            className="px-5 py-3 border-b border-gray-200">
          </th>
          {
            headers?.map((header, id) => {
              return <th key={id}
                className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                {header}
              </th>
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          meals.map((meal, index) => {
            const isLast = index === meals.length - 1;

            return <tr key={index}>
              <td className={`px-3 lg:px-5 py-5 border-gray-200 bg-white text-xs md:text-pre-xs lg:text-sm ${isLast ? 'border-0' : 'border-b'}`}>
                <label
                  onClick={() => addItemToList(index)}
                  className={`inline-flex items-center justify-center h-4 w-4 rounded-md-md border-2 transition-colors duration-200 cursor-pointer ${ isInList(index) ? 'border-primary bg-primary' : 'border-gray-300'}`}
                >
                  <svg width="12" height="8" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-opacity duration-150 ${isInList(index) ? 'opacity-1' : 'opacity-0'}`}>
                    <path d="M2 7.54264L8.6 13L20 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </label>
              </td>

              {
                meal.map((food, id) => {
                  return <td  key={id} className={`min-w-30 px-3 lg:px-5 py-5  border-gray-200 bg-white text-xs md:text-pre-xs lg:text-sm text-gray-600 text-left max-w-75 ${isLast ? 'border-0' : 'border-b'}`}>
                    { food }
                  </td>
                })
              }
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

export default MealsTable
