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


    async function run_code(){
        try{
            const response = await fetch('http://localhost:8080/api', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({event: 'run_code', language: selectedLang})
             })
             if (response.ok){
                 console.log("Saved successful");
             }
         } catch(error){
             console.error("Error Occured:", error);
         }
    }

    async function save_code(){
        try{
           const response = await fetch('http://localhost:8080/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({event: 'save_code', language: null})
            })
            if (response.ok){
                console.log("Saved successful");
            }
        } catch(error){
            console.error("Error Occured:", error);
        }
    }


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
                    <button onClick={ run_code }>Run </button>
                    <button onClick={ save_code }>Save</button>
                </li>
            </ul>
        </div>
    )
}
export default Toolbar;
