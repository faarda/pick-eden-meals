import React, { FunctionComponent, useState } from 'react'
import Logo from '../assets/images/logo.svg'
import { VIEW_MODES } from '../utils/constants';
import EnterLink from './EnterLink';
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
          <EnterLink {...{spreadSheetLink, setSpreadSheetLink, fetchData}} />
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
