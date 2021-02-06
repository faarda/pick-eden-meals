import React, { useState } from 'react';
import InputSpreadSheetLink from '../components/InputSpreadSheetLink';
import PickMeals from '../components/PickMeals';
import readXlsFile from 'read-excel-file'
// import Papa from 'papaparse'


const VIEW_STATES = {PRE_LOAD: 'pre-load', LOADING: 'loading', LOADED: 'loaded', ERROR: 'error'}

const App = () => {
  const [spreadSheetFile, setSpreadSheetFile] = useState('');
  const [ viewState, setViewState ] = useState(VIEW_STATES.PRE_LOAD);
  const [ headers, setHeaders ] = useState<string[] | undefined>([]);
  const [ meals, setMeals ] = useState<string[][]>([]);

  const goBack = () => {
    setViewState(VIEW_STATES.PRE_LOAD);
  }

  const removeCommas = (text: string) => {
    return text.split(",").join("").split("-").join("");
  }

  const fetchData = () => {
    setViewState(VIEW_STATES.LOADING);
    try{
      readXlsFile(spreadSheetFile)
      .then((rows: string[][]) => {
        const headers: string[] | undefined = rows.shift();
        setHeaders(headers);
        
        const newMeals: any[] = [];
  
        rows.forEach((meal, id) => {
          if(meal[0]){
            const menu = meal[0].toString().split("\n").join(" ");
            const proteins = meal[1].toString().split("\n");
            const mainSides = meal[2].toString().split("\n");
            const otherSides = meal[3].toString().split("\n");
  
            // const sidesArray
            const mealArrays = proteins.map(protein => {
              return [
                mainSides.map(mainSide => {
                  return otherSides.map(otherSide => {
                    return [removeCommas(menu), removeCommas(protein), removeCommas(mainSide) , removeCommas(otherSide)]
                  })
                })
              ]
            })
  
            newMeals.push(...mealArrays[0][0][0]);
          }
        });

        setMeals(newMeals);

        setTimeout(() => {
          setViewState(VIEW_STATES.LOADED)
        }, 1000)
        
      })
      .catch(() => {
        setViewState(VIEW_STATES.ERROR);
      })
    } catch {
      setViewState(VIEW_STATES.ERROR);
    }
  }

  return (
    <div className="app">
      {
        viewState === VIEW_STATES.PRE_LOAD &&
        <InputSpreadSheetLink {...{setSpreadSheetFile, spreadSheetFile, fetchData}} />
      }
      {
        viewState === VIEW_STATES.LOADED &&
        <PickMeals {...{meals, headers, setViewState}} />
      }
      {
        viewState === VIEW_STATES.LOADING &&
        <div className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center content-center">
          <figure className="block border-4 h-8 w-8 rounded-full loader animate animate-spin"></figure>
          <span className="text-gray-500 text-sm font-light inline-block mt-4">Loading Meals...</span>
        </div>
      }
      {
        viewState === VIEW_STATES.ERROR &&
        <div className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center content-center">
          <figure className="text-3xl mb-4">😢</figure>
          <div className="text-red-400 text-md font-bold font-display">Something went wrong, couldnt load meals</div>
          <button 
            onClick={() => goBack()}
            className="outline-none focus:outline-none mt-5 inline-flex h-10 rounded-lg px-4 bg-primary text-white text-sm font-medium justify-center items-center"
          >
            Go Back
          </button>
        </div>
      }
    </div>
  );
}

export default App;
