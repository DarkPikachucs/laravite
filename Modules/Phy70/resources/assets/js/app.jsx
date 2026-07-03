import React from 'react';
import { createRoot } from 'react-dom/client';
import HelloReact from './components/HelloReact';

// ค้นหา Element ที่ต้องการให้ React ทำงาน
const rootElement = document.getElementById('phy70-react-root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<HelloReact />);
}
