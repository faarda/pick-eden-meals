import React, { FunctionComponent, useState } from 'react'

interface SelectedMealsProps {
  selectedMealsList: string[];
  gardenerPhone: string;
}

const SelectedMeals: FunctionComponent<SelectedMealsProps> = ({selectedMealsList, gardenerPhone}) => {
  const [ isBottomSheetOpen, setIsBottomSheetOpen ] = useState(false);

  const emptyMeals = selectedMealsList.length < 1;

  const selectedMealsText = () => {
    return selectedMealsList.reduce((meals, meal, index) => { return `${meals} \n ${index + 1}. ${meal}`}, '')
  }

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = selectedMealsText();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <aside className={`transition-transform duration-300 ease-out transform md:mb-0 md:translate-y-0 ${isBottomSheetOpen ? 'translate-y-0 mb-0' : 'translate-y-5 mb-5'} flex flex-col min-w-0 aside  md:h-full border-0 md:border-l border-gray-200 px-6.25 py-5 md:pt-12.5 md:p-6.25 fixed md:relative bg-white bottom-0 rounded-tl-md rounded-tr-md md:rounded-none shadow-custom-negative-sm md:shadow-none`}>
    <div 
      className="flex justify-between items-center outline-none focus:outline-none" 
      onClick={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
    >
      <h4 className="text-red-200 text-base md:text-md font-display">
        {selectedMealsList.length} meals selected
      </h4>
      
      <button className={`outline-none focus:outline-none color-black md:hidden transform transition-transform duration-75 ${isBottomSheetOpen ? 'rotate-180' : 'rotate-0'}`}>
        <svg width="12" height="6" viewBox="0 0 38 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37 1L19 18L1 0.999998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>

    <ul className={`mt-5 flex-1 overflow-y-auto md:block ${ isBottomSheetOpen ? '' : 'hidden'}`}>
      {
        selectedMealsList.map((meal, id) => {
          return <li className="text-sm py-3.5 text-gray-500 border-b last:border-0 border-gray-100" key={id}>
            <span className="font-bold text-gray-600">{id + 1}. &nbsp;</span>
            {meal}
          </li>
        })
      }
    </ul>

    <div className="flex">
      <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?phone=${gardenerPhone.replace('0', '+234')}&text=${selectedMealsText()}`} onClick={e => emptyMeals ? e.preventDefault() : ''}
        className={`flex-1 mr-2 outline-none focus:outline-none mt-5 flex h-12 rounded-lg bg-primary text-white text-sm font-medium justify-center items-center ${emptyMeals ? 'opacity-70' : 'opacity-100'}`}>
        Send to Gardner
      </a>
      <button 
        onClick={() => copyToClipboard()} disabled={emptyMeals}
        className="outline-none focus:outline-none mt-5 px-3.5 flex h-12 rounded-lg bg-white disabled:opacity-70 text-gray-500 border border-gray-400 disabled:cursor-not-allowed hover:text-primary hover:border-primary  text-sm font-medium justify-center items-center">
        Copy Meals
      </button>
    </div>
  </aside>
  )
}

export default SelectedMeals
