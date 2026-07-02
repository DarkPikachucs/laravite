import React, { createContext, useState, useContext, useEffect } from 'react';

// สร้าง Context สำหรับ Theme
const ThemeContext = createContext();

// สร้าง Theme Provider
export const ThemeProvider = ({ children }) => {
    // อ่านค่าธีมจาก localStorage ถ้ามี หรือใช้ 'light' เป็นค่าเริ่มต้น
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const [fontsize, setFontsize] = useState(() => {
        return parseInt(localStorage.getItem('fontsize')) || 14;
    });

    // ฟังก์ชันสำหรับสลับธีมและบันทึกลงใน localStorage
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme); // เก็บค่าใหม่ลงใน localStorage
            return newTheme;
        });
    };

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
        document.body.style.fontSize = `${fontsize}px`;
        localStorage.setItem('fontsize', fontsize);
    }, [theme, fontsize])


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, fontsize, setFontsize }}>
            {children}
        </ThemeContext.Provider>
    );
};

// สร้าง custom hook สำหรับใช้งาน ThemeContext
export const useTheme = () => useContext(ThemeContext);
