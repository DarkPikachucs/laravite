import React from 'react';

const HelloReact = () => {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
            color: '#fff',
            marginTop: '20px'
        }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                🚀 Hello from React in Phy70 Module!
            </h2>
            <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
                โครงสร้างพื้นฐานสำหรับ React พร้อมใช้งานแล้ว! คุณสามารถสร้าง Components เพิ่มเติมในโฟลเดอร์ <code style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>resources/assets/js/components</code> ได้เลย
            </p>
        </div>
    );
};

export default HelloReact;
