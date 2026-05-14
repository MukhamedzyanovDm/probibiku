"use client";

import React from 'react';

export default function DiagnosticPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500 text-white p-10 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-4">Служебная проверка: Hello World!</h1>
        <p className="text-xl">Если вы видите это синее окно на iPhone, значит сервер работает правильно и мы можем возвращать компоненты по одному.</p>
        <div className="mt-8 p-4 bg-blue-600 rounded-lg">
          <p className="text-sm opacity-80">Проверка связи с Netlify прошла успешно.</p>
        </div>
      </div>
    </div>
  );
}
