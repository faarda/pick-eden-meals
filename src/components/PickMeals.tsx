import React, { FunctionComponent, useState } from 'react'
import Logo from '../assets/images/logo.svg'
import MealsTable from './MealsTable';
import SelectedMeals from './SelectedMeals';

interface PickMealsProps {
  meals: string[][];
  headers: string[] | undefined;
  setViewState: (state: string) => void
}

const PickMeals: FunctionComponent<PickMealsProps> = ({meals, headers, setViewState}) => {
  const [selectedMealsId, setSelectedMealsId] = useState<number[]>([]);
  const [selectedMealsList, setSelectedMealsList] = useState<string[]>([]);

  const isInList = (id: number) => {
    return selectedMealsId?.includes(id);
  }

  const getMealsList = (ids: number[]) => {
    return ids.map((id) => {
      const meal = meals[id];
      return [...meal].reverse().reduce((mealText, food, index) => {
        const foodIsNone = food.toLocaleLowerCase() === 'none';
        if(mealText === ''){
          return  foodIsNone ? '' : ` & ${food}`;
        }else {
          return foodIsNone ? mealText : `${index < meal.length - 1 ? ', ' : ''}${food}${mealText}`
        }
      }, '');
    });
  }

  const addItemToList = (id: number) => {
    let newSelectedMealsId: number[] = [...selectedMealsId];

    if(selectedMealsId.includes(id)){
      const itemIndex = selectedMealsId.indexOf(id);
      newSelectedMealsId.splice(itemIndex, 1);
    }else{
      newSelectedMealsId.push(id);
    }

    setSelectedMealsId(newSelectedMealsId);
    setSelectedMealsList(getMealsList(newSelectedMealsId));
  }

  return (
    <div className="flex h-screen overflow-hidden content-start">
      <div className="p-6.25 sm:p-8 md:p-12.5 h-full flex-1 flex flex-col min-w-0">
        <figure className="h-7" >
          <img src={Logo} className="h-full" alt="Eden Logo"/>
        </figure>
        <div className="text-red-200 text-base md:text-lg font-display mt-4">
          <span className="text-black cursor-pointer" onClick={() => setViewState('pre-load')}>Home</span>
          <span className="text-gray-400"> / </span>
          <span className="text-red-200">Select Meals</span>
        </div>

        <div className="overflow-auto mt-10 flex-auto h-full">
          <MealsTable {...{headers, meals, isInList, addItemToList}} />
        </div>
      </div>
      <SelectedMeals selectedMealsList={selectedMealsList} />
    </div>
  )
}

export default PickMeals
