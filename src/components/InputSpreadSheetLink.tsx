import React, { FunctionComponent, useRef } from 'react'
import Logo from '../assets/images/logo.svg'

interface InputSpreadSheetLinkProps {
  spreadSheetFile: any;
  fetchData: () => void;
  setSpreadSheetFile: (file: any) => void;
}

const InputSpreadSheetLink: FunctionComponent<InputSpreadSheetLinkProps> = ({setSpreadSheetFile, spreadSheetFile, fetchData}) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center content-center p-5">
      <figure className="mb-5">
        <img src={Logo} alt=""/>
      </figure>
      <div className="max-w-xs">
        <h1 className="font-display text-red-200 text-2xl text-center md:text-3xl mb-12">Pick your eden meals with ease</h1>
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
          onClick={() => fetchData()} disabled={spreadSheetFile === ''}
          className={`outline-none transition-opacity duration-150 focus:outline-none mt-5 flex w-full h-12 rounded-lg bg-primary disabled:opacity-70 text-white text-sm font-medium justify-center items-center `}>
          Continue
        </button>
      </div>

      <div className="absolute bottom-0 text-sm text-gray-400 w-full py-5 left-0 text-center">
          Built by <a href="https://twitter.com/silasadedoyin"  rel="noreferrer" target="_blank" className="text-primary font-display">Silas</a> | <a href="https://github.com/faarda/pick-eden-meals" rel="noreferrer" target="_blank" className="text-primary font-display">Github</a>
      </div>
    </div>
  )
}

export default InputSpreadSheetLink
