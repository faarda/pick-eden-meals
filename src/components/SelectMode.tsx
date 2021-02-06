import React, { FunctionComponent } from 'react'
import { VIEW_MODES } from '../utils/constants'

interface SelectModeProps {
  gardenerPhone: string;
  setGardenerPhone: (phone: string) => void;
  setSelectedMode: (mode: string) => void;
  selectedMode: string;
  setMode: ( mode: string ) => void; 
}

const SelectMode: FunctionComponent<SelectModeProps> = ({gardenerPhone, setGardenerPhone, setSelectedMode, selectedMode, setMode}) => {
  const submitDisabled = () => selectedMode === '' || gardenerPhone === '' || !(gardenerPhone.match(/^\d{11}$/));

  return (
    <div>
      <input type="tel" placeholder="Gardener's phone e.g. 08012345676" value={gardenerPhone} onInput={(e: any) => setGardenerPhone(e.target.value)}
        className={`p-3.5 border flex items-center justify-center w-full h-12 font-light rounded-lg placeholder-gray-300 text-sm outline-none focus:outline-none transition-colors duration-150 text-grey-400 border-gray-400 focus:border-primary`}
      />
      {
        gardenerPhone !== '' && !(gardenerPhone.match(/^\d{11}$/)) &&
        <span className="text-xs font-medium text-red-200 inline-block mt-1">Please enter a valid phone</span>
      }
      <div className="text-medium text-gray-600 text-sm mb-2 mt-4">Choose spreadsheet type</div>
      <div className="flex items-center">
        <button 
          onClick={() => setSelectedMode(VIEW_MODES.ENTER_LINK)}
          className={`outline-none focus:outline-none flex-1 border-dashed border px-2 py-3 rounded-md text-xs mr-2 transition-colors duration-100 ${selectedMode === VIEW_MODES.ENTER_LINK ? 'border-primary text-primary' : 'text-gray-500 border-gray-400'}`}
        >
          Use Link
        </button>
        <button 
          onClick={() => setSelectedMode(VIEW_MODES.PICK_FILE)}
          className={`outline-none focus:outline-none flex-1 border-dashed border px-2 py-3 rounded-md text-xs mr-2 transition-colors duration-100 ${selectedMode === VIEW_MODES.PICK_FILE ? 'border-primary text-primary' : 'text-gray-500 border-gray-400'}`}
        >
          Use File
        </button>
      </div>
      <button 
        onClick={() => setMode(selectedMode)} disabled={submitDisabled()}
        className={`outline-none transition-opacity duration-150 focus:outline-none mt-5 flex w-full h-12 rounded-lg bg-primary disabled:opacity-70 text-white text-sm font-medium justify-center items-center `}>
        Next
      </button>
    </div>
  )
}

export default SelectMode
