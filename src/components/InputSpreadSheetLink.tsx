import React, { FunctionComponent, useState } from 'react'
import Logo from '../assets/images/logo.svg'
import { VIEW_MODES } from '../utils/constants';
import PickFile from './PickFile'
import SelectMode from './SelectMode';
interface InputSpreadSheetLinkProps {
  fetchData: (mode: string) => void;
  spreadSheetFile: File | null;
  setSpreadSheetFile: (file: File) => void;
  gardenerPhone: string;
  setGardenerPhone: ( phone: string ) => void;
  spreadSheetLink: string;
  setSpreadSheetLink: (link: string) => void;
}

const InputSpreadSheetLink: FunctionComponent<InputSpreadSheetLinkProps> = ({setSpreadSheetFile, spreadSheetFile, fetchData, gardenerPhone, setGardenerPhone, spreadSheetLink, setSpreadSheetLink}) => {
  const [ mode , setMode ] = useState(VIEW_MODES.START);
  const [ selectedMode, setSelectedMode ] = useState('');

  const validLink = () => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(spreadSheetLink);
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center content-center p-5">
      <figure className="mb-5">
        <img src={Logo} alt=""/>
      </figure>
      <div className="max-w-xs">
        <h1 className="font-display text-red-200 text-2xl text-center md:text-3xl mb-12">Pick your eden meals with ease</h1>
        {
          mode === VIEW_MODES.START &&
          <SelectMode {...{gardenerPhone, setGardenerPhone, setSelectedMode, setMode, selectedMode}} />
        }
        {
          mode === VIEW_MODES.ENTER_LINK &&
          <div>
            <input type="url" placeholder="Enter spreadsheet link" value={spreadSheetLink} onInput={(e: any) => setSpreadSheetLink(e.target.value)}
              className={`p-3.5 border flex items-center justify-center w-full h-12 font-light rounded-lg placeholder-gray-300 text-sm outline-none focus:outline-none transition-colors duration-150 text-grey-400 border-gray-400 focus:border-primary`}
            />
            {
              spreadSheetLink !== '' && !validLink() &&
              <span className="text-xs font-medium text-red-200 inline-block mt-1">Please enter a valid link</span>
            }
            <button 
              onClick={() => fetchData(VIEW_MODES.ENTER_LINK)} disabled={spreadSheetLink === '' || !validLink()}
              className={`outline-none transition-opacity duration-150 focus:outline-none mt-5 flex w-full h-12 rounded-lg bg-primary disabled:opacity-70 text-white text-sm font-medium justify-center items-center `}>
              Continue
            </button>
          </div>
        }
        {
          mode === VIEW_MODES.PICK_FILE &&
          <PickFile {...{fetchData, setSpreadSheetFile, spreadSheetFile}} />
        }
      </div>

      <div className="absolute bottom-0 text-sm text-gray-400 w-full py-5 left-0 text-center">
          Built by <a href="https://twitter.com/silasadedoyin"  rel="noreferrer" target="_blank" className="text-primary font-display">Silas</a> | <a href="https://github.com/faarda/pick-eden-meals" rel="noreferrer" target="_blank" className="text-primary font-display">Github</a>
      </div>
    </div>
  )
}

export default InputSpreadSheetLink
