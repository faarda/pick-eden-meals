import React, { FunctionComponent, useRef } from 'react'
import { VIEW_MODES } from '../utils/constants';

interface PickFileProps {
  setSpreadSheetFile: (file: File) => void;
  spreadSheetFile: File | null; 
  fetchData: (mode: string) => void;
}

const PickFile: FunctionComponent<PickFileProps> = ({setSpreadSheetFile, spreadSheetFile, fetchData}) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  return (
  <>
    <input type="file" accept=".xls,.xlsx,.csv,.pdf" className="hidden" ref={filePickerRef} onChange={(e: any) => setSpreadSheetFile(e.target.files[0])}  />
    <button onClick={() => filePickerRef.current?.click()}
      className={`p-3.5 border border-dashed flex items-center justify-center w-full h-12 font-light rounded-lg placeholder-gray-300 text-sm outline-none focus:outline-none transition-colors duration-150 text-grey-400 ${ spreadSheetFile ? 'border-primary': 'border-gray-400'}`}
    > 
      {
        spreadSheetFile ?
        spreadSheetFile.name :
        'Choose spreadsheet'
      } 
    </button>
    <button 
      onClick={() => fetchData(VIEW_MODES.PICK_FILE)} disabled={spreadSheetFile === null }
      className={`outline-none transition-opacity duration-150 focus:outline-none mt-5 flex w-full h-12 rounded-lg bg-primary disabled:opacity-70 text-white text-sm font-medium justify-center items-center `}>
      Continue
    </button>
  </>
  )
}

export default PickFile
