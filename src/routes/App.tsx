import React, { useState } from 'react';
import InputSpreadSheetLink from '../components/InputSpreadSheetLink';
import PickMeals from '../components/PickMeals';
import readXlsFile from 'read-excel-file'
import GSheetsApi from 'g-sheets-api'
import { VIEW_MODES } from '../utils/constants';


const VIEW_STATES = {PRE_LOAD: 'pre-load', LOADING: 'loading', LOADED: 'loaded', ERROR: 'error'}

const App = () => {
  const [spreadSheetFile, setSpreadSheetFile] = useState<File | null>(null);
  const [ viewState, setViewState ] = useState(VIEW_STATES.PRE_LOAD);
  const [ headers, setHeaders ] = useState<string[] | undefined>([]);
  const [ meals, setMeals ] = useState<string[][]>([]);
  const [ gardenerPhone, setGardenerPhone ] = useState('');
  const [spreadSheetLink, setSpreadSheetLink] = useState<string>('');

  const goBack = () => {
    setViewState(VIEW_STATES.PRE_LOAD);
  }

  const removeCommas = (text: string) => {
    return text.split(",").join("").split("-").join("");
  }

  const fetchData = (mode: string) => {
    setViewState(VIEW_STATES.LOADING);
    try{
      if(mode === VIEW_MODES.PICK_FILE){
        readFromFile();
      }else {
        readFromLink();
      }
    } catch {
      setViewState(VIEW_STATES.ERROR);
    }
  }

  const readFromFile = () => {
    readXlsFile(spreadSheetFile)
    .then((rows: string[][]) => {
      const headers: string[] | undefined = rows.shift();
      setHeaders(headers);
    
      getMeals(rows);
    })
    .catch(() => {
      setViewState(VIEW_STATES.ERROR);
    })
  }

  const readFromLink = () => {
    const fileID = spreadSheetLink.split('d/')[1].split("/")[0];

    const readerOptions = {
      sheetId: fileID,
      returnAllResults: true
    };

    GSheetsApi(readerOptions, (results: {[key: string]: string}[]) => {
      const mealsList = results.map(meals => {
        return Object.values(meals);
      })

      setHeaders(Object.keys(results[0]));

      getMeals(mealsList);
    });
  }

  const getMeals = (rows: string[][]) => {
    const newMeals: any[] = [];

    rows.forEach((meal, id) => {
      if(meal[0]){
        const menu = meal[0].split("\n").join(" ");
        const proteins = meal[1].split("\n");
        const mainSides = meal[2].split("\n");
        const otherSides = meal[3].split("\n");

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
  }

  return (
    <div className="app">
      {
        viewState === VIEW_STATES.PRE_LOAD &&
        <InputSpreadSheetLink {...{setSpreadSheetFile, spreadSheetFile, fetchData, gardenerPhone, setGardenerPhone, setSpreadSheetLink, spreadSheetLink}} />
      }
      {
        viewState === VIEW_STATES.LOADED &&
        <PickMeals {...{meals, headers, setViewState, gardenerPhone}} />
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
