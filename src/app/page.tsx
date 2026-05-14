"use client";

import React from 'react';

export default function DiagnosticPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
          Шаг 2: Проверка без внешних стилей
        </h1>
        <p style={{ fontSize: '18px' }}>
          Если вы видите это синее окно на iPhone, значит проблема была в файле <b>globals.css</b>. 
          Браузер Safari на мобильных устройствах иногда блокирует слишком большие или сложные CSS-файлы.
        </p>
        <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#2563eb', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px' }}>Это сообщение отправлено без использования внешнего файла стилей.</p>
        </div>
      </div>
    </div>
  );
}
