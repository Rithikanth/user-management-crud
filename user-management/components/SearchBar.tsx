'use client'

import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (search: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search, onSearch])

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

