import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import './styles/Toolbar.css';

function Toolbar(){
    const  [selectedLang, setLanguage] = useState('C');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const languages = ['C', 'Python', 'C++', 'Java'];

    const selectLanguage = (lang: string) => {
        setLanguage(lang);
        setDropdownOpen(false);
    };


    return (
        <div className="toolbar">
            <ul>
                <li>
                    <div className='language-selector'>
                        <button onClick={toggleDropdown} className="lang-button">
                            {selectedLang} <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        {dropdownOpen && (
                            <ul className='dropdown'>
                                {languages.map((lang) => <li key={lang} onClick={() => selectLanguage(lang)}>{lang}</li>)}
                            </ul>
                        )}
                    </div>
                    <button>Run </button>
                    <button>Save</button>
                </li>
            </ul>
        </div>
    )
}
export default Toolbar;
