import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import '../styles/Toolbar.css';
import { AppConfig } from '../config';

type Props = {
    reviewText: (text: string) => void;
};


/* 
  Tool Bar Component:
    Reusable Toolbar UI component that lets someone:
      - Select a programming language from a dropdown menu
      - Send code execution to the backend
      - Trigger AI code reviews via Gemini

  Props:
    - reviewText: (text: string) => void
      A callback function used to update the review text area with the response from the backend AI code review
      Called to when clicking the "review code" button
  
  Dependencies:
    - useState
    - FontAwesome (For dropdown icon)
    - Appconfig for room ID/Config
*/
function Toolbar({reviewText}: Props){
    const  [selectedLang, setLanguage] = useState('C');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const languages = ['C', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript'];
    const hostname = window.location.hostname;

    const selectLanguage = (lang: string) => {
        setLanguage(lang);
        setDropdownOpen(false);
    };


    async function run_code(){
        try{
            const response = await fetch(`http://${hostname}:8080/api`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({event: 'run_code', language: selectedLang, room:AppConfig.roomId})
             })
             if (response.ok){
                 console.log("Run successful");
             }
         } catch(error){
             console.error("Error Occured:", error);
         }
    }


    async function handleReviewClick(){
        try{
            const response = await fetch(`http://${hostname}:8080/api`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: 'code_review', room:AppConfig.roomId})
            })
            if (response.ok){
                console.log("Code Review sent successfully");
                const data = await response.json();
                reviewText(data.review);
            }
        } catch(error){
            console.error("Error Occured with code review:", error)
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
                    <button onClick={handleReviewClick}>Review Code</button>
                </li>
            </ul>
        </div>
    )
}
export default Toolbar;
