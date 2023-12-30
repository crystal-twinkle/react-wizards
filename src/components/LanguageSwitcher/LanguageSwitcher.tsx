import { useState } from 'react';
import Button from '../UI/Button';
import localIcon from '../../assets/icons/local-icon.svg';
import { useLocalization } from '../../context/localization-context';
import { Language } from '../../models/localization';

const LanguageSwitcher = () => {
  const { translate, language, changeLanguage } = useLocalization();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState('-top-16 -z-50');

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setTimeout(() => {
        setDropdownStyles('top-10 z-10');
      });
    } else {
      setDropdownStyles('-top-16 -z-50');
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 500);
    }
  };

  const handleLanguage = (languageCode: Language) => {
    window.localStorage.setItem('lang', languageCode);
    changeLanguage(languageCode);
    toggleDropdown();
  };

  const languages = [
    { code: 'EN', label: translate.switchLang.en },
    { code: 'RU', label: translate.switchLang.ru },
    { code: 'BE', label: translate.switchLang.be },
  ];

  return (
    <div className="relative bg-inherit">
      <Button
        icon={localIcon}
        text={language}
        onclick={toggleDropdown}
        className="w-full md:w-auto"
      />
      {isDropdownOpen ? (
        <div
          className={`absolute md:right-1 px-1 bg-inherit transition-all ease-out duration-500 ${dropdownStyles}`}
        >
          <ul className="flex flex-col items-start max-w-[150px] overflow-hidden">
            {languages.map((language) => (
              <li
                className="w-full p-1 border-b-2 last:border-b-0 border-medium hover:brightness-125 cursor-pointer truncate hover:scale-[1.02] transition-all duration-300 ease-out"
                key={language.code}
                onClick={() => handleLanguage(language.code as Language)}
              >
                {language.label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default LanguageSwitcher;
