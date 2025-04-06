import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import '../styles/Toolbar.css';

type Props = {
    curText: string;
    reviewText: (text: string) => void;
};



function Toolbar({curText, reviewText}: Props){
    const  [selectedLang, setLanguage] = useState('C');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const languages = ['C', 'Python', 'Java', 'C++', 'JavaScript', 'Go', 'Rust', 'PHP', 'TypeScript', 'C#'];

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
                 body: JSON.stringify({event: 'run_code', language: selectedLang, room:'one'})
             })
             if (response.ok){
                 console.log("Run successful");
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


    async function handleReviewClick(){
        try{
            const response = await fetch('http://localhost/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({code: curText})
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
                    <button onClick={ save_code }>Save</button>
                    <button onClick={handleReviewClick}>Review Code</button>
                </li>
            </ul>
        </div>
    )
}
export default Toolbar;
