import React, { FunctionComponent } from 'react'
import { VIEW_MODES } from '../utils/constants';

interface EnterLinkProps {
  spreadSheetLink: string;
  setSpreadSheetLink: (link: string) => void;
  fetchData: (mode: string) => void;
}

const EnterLink: FunctionComponent<EnterLinkProps> = ({setSpreadSheetLink, spreadSheetLink, fetchData}) => {

  const validLink = () => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(spreadSheetLink);
  }

  return (
    <div>
      <input type="url" placeholder="Enter spreadsheet link" value={spreadSheetLink} onInput={(e: any) => setSpreadSheetLink(e.target.value)}
        className={`appearance-none p-3.5 border flex items-center justify-center w-full h-12 font-light rounded-lg placeholder-gray-300 text-sm outline-none focus:outline-none transition-colors duration-150 text-grey-400 border-gray-400 focus:border-primary`}
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
  )
}

export default EnterLink
