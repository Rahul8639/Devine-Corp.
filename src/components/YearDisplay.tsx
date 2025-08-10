'use client';

import { useEffect, useState } from 'react';

export default function YearDisplay() {
  const [year, setYear] = useState<string>('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return <span>{year}</span>;
} 