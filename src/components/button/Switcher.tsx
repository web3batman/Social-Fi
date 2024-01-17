import React, { useState } from 'react';
import useDarkSide from '@/hooks/useDarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function Switcher(props: {size: string, setDarkMode?:Function}): JSX.Element {
  const { size, setDarkMode } = props;
  // Assuming useDarkSide hook returns a 'light' or 'dark' string
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === 'light');

  const toggleDarkMode = (): void => {
    setTheme(colorTheme); // You might want to toggle the theme instead of setting it to the current value
    setDarkSide(!darkSide);
    if (setDarkMode) {
      setDarkMode()
    }
  };

  return (
    <div className='p-3 max-md:hidden rounded-full border border-[#3E3C31] bg-main-bg-color dark:bg-[#212529] flex justify-center items-center cursor-pointer' onClick={toggleDarkMode}>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={size} moonColor='#E8E9E9' sunColor='#4B3A41' />
    </div>
  );
}