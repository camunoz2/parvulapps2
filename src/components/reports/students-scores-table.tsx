'use client'

import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronUp, ChevronDown } from 'lucide-react'

// Mock data structure
const mockData = {
  'Curso A': {
    'General': [
      { id: 1, alumno: 'John Doe', inicial: 70, intermedia: 75, final: 80 },
      { id: 2, alumno: 'Jane Smith', inicial: 65, intermedia: 70, final: 68 },
      { id: 3, alumno: 'Bob Johnson', inicial: 80, intermedia: 78, final: 85 },
    ],
    'Ámbito': {
      'Ámbito 1': [
        { id: 1, alumno: 'John Doe', inicial: 72, intermedia: 77, final: 82 },
        { id: 2, alumno: 'Jane Smith', inicial: 67, intermedia: 72, final: 70 },
        { id: 3, alumno: 'Bob Johnson', inicial: 82, intermedia: 80, final: 87 },
      ],
      'Ámbito 2': [
        { id: 1, alumno: 'John Doe', inicial: 68, intermedia: 73, final: 78 },
        { id: 2, alumno: 'Jane Smith', inicial: 63, intermedia: 68, final: 66 },
        { id: 3, alumno: 'Bob Johnson', inicial: 78, intermedia: 76, final: 83 },
      ],
      'Ámbito 3': [
        { id: 1, alumno: 'John Doe', inicial: 74, intermedia: 79, final: 84 },
        { id: 2, alumno: 'Jane Smith', inicial: 69, intermedia: 74, final: 72 },
        { id: 3, alumno: 'Bob Johnson', inicial: 84, intermedia: 82, final: 89 },
      ],
    },
    'Núcleo': {
      'Núcleo 1': [
        { id: 1, alumno: 'John Doe', inicial: 71, intermedia: 76, final: 81 },
        { id: 2, alumno: 'Jane Smith', inicial: 66, intermedia: 71, final: 69 },
        { id: 3, alumno: 'Bob Johnson', inicial: 81, intermedia: 79, final: 86 },
      ],
      'Núcleo 2': [
        { id: 1, alumno: 'John Doe', inicial: 73, intermedia: 78, final: 83 },
        { id: 2, alumno: 'Jane Smith', inicial: 68, intermedia: 73, final: 71 },
        { id: 3, alumno: 'Bob Johnson', inicial: 83, intermedia: 81, final: 88 },
      ],
      'Núcleo 3': [
        { id: 1, alumno: 'John Doe', inicial: 69, intermedia: 74, final: 79 },
        { id: 2, alumno: 'Jane Smith', inicial: 64, intermedia: 69, final: 67 },
        { id: 3, alumno: 'Bob Johnson', inicial: 79, intermedia: 77, final: 84 },
      ],
    },
    'Objetivos': {
      'Objetivo 1': [
        { id: 1, alumno: 'John Doe', inicial: 75, intermedia: 80, final: 85 },
        { id: 2, alumno: 'Jane Smith', inicial: 70, intermedia: 75, final: 73 },
        { id: 3, alumno: 'Bob Johnson', inicial: 85, intermedia: 83, final: 90 },
      ],
      'Objetivo 2': [
        { id: 1, alumno: 'John Doe', inicial: 67, intermedia: 72, final: 77 },
        { id: 2, alumno: 'Jane Smith', inicial: 62, intermedia: 67, final: 65 },
        { id: 3, alumno: 'Bob Johnson', inicial: 77, intermedia: 75, final: 82 },
      ],
      'Objetivo 3': [
        { id: 1, alumno: 'John Doe', inicial: 76, intermedia: 81, final: 86 },
        { id: 2, alumno: 'Jane Smith', inicial: 71, intermedia: 76, final: 74 },
        { id: 3, alumno: 'Bob Johnson', inicial: 86, intermedia: 84, final: 91 },
      ],
    },
    'Indicadores': {
      'Indicador 1': [
        { id: 1, alumno: 'John Doe', inicial: 72, intermedia: 77, final: 82 },
        { id: 2, alumno: 'Jane Smith', inicial: 67, intermedia: 72, final: 70 },
        { id: 3, alumno: 'Bob Johnson', inicial: 82, intermedia: 80, final: 87 },
      ],
      'Indicador 2': [
        { id: 1, alumno: 'John Doe', inicial: 74, intermedia: 79, final: 84 },
        { id: 2, alumno: 'Jane Smith', inicial: 69, intermedia: 74, final: 72 },
        { id: 3, alumno: 'Bob Johnson', inicial: 84, intermedia: 82, final: 89 },
      ],
      'Indicador 3': [
        { id: 1, alumno: 'John Doe', inicial: 70, intermedia: 75, final: 80 },
        { id: 2, alumno: 'Jane Smith', inicial: 65, intermedia: 70, final: 68 },
        { id: 3, alumno: 'Bob Johnson', inicial: 80, intermedia: 78, final: 85 },
      ],
    },
  },
  // ... similar structure for 'Curso B' and 'Curso C'
}

const cursos = ['Curso A', 'Curso B', 'Curso C']
const primaryOptions = ['General', 'Ámbito', 'Núcleo', 'Objetivos', 'Indicadores']
const secondaryOptions = {
  'Ámbito': ['Ámbito 1', 'Ámbito 2', 'Ámbito 3'],
  'Núcleo': ['Núcleo 1', 'Núcleo 2', 'Núcleo 3'],
  'Objetivos': ['Objetivo 1', 'Objetivo 2', 'Objetivo 3'],
  'Indicadores': ['Indicador 1', 'Indicador 2', 'Indicador 3'],
}

type SortDirection = 'asc' | 'desc' | null

export function StudentsScoresTable() {
  const [selectedCurso, setSelectedCurso] = useState(cursos[0])
  const [selectedPrimary, setSelectedPrimary] = useState(primaryOptions[0])
  const [selectedSecondary, setSelectedSecondary] = useState('')
  const [sortColumn, setSortColumn] = useState<'inicial' | 'intermedia' | 'final' | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (column: 'inicial' | 'intermedia' | 'final') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const currentData = useMemo(() => {
    let data = mockData[selectedCurso as keyof typeof mockData]
    if (selectedPrimary === 'General') {
      return data['General']
    } else {
      return data[selectedPrimary as keyof typeof data][selectedSecondary] || []
    }
  }, [selectedCurso, selectedPrimary, selectedSecondary])

  const sortedData = useMemo(() => {
    if (!sortColumn) return currentData
    return [...currentData].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [currentData, sortColumn, sortDirection])

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select value={selectedCurso} onValueChange={setSelectedCurso}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar curso" />
          </SelectTrigger>
          <SelectContent>
            {cursos.map((curso) => (
              <SelectItem key={curso} value={curso}>{curso}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPrimary} onValueChange={(value) => {
          setSelectedPrimary(value)
          setSelectedSecondary('')
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar primario" />
          </SelectTrigger>
          <SelectContent>
            {primaryOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedPrimary !== 'General' && (
          <Select value={selectedSecondary} onValueChange={setSelectedSecondary}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar secundario" />
            </SelectTrigger>
            <SelectContent>
              {secondaryOptions[selectedPrimary as keyof typeof secondaryOptions]?.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alumno</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('inicial')}>
              Inicial {sortColumn === 'inicial' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('intermedia')}>
              Intermedia {sortColumn === 'intermedia' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('final')}>
              Final {sortColumn === 'final' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.alumno}</TableCell>
              <TableCell>{row.inicial}</TableCell>
              <TableCell>
                {row.intermedia}
                {row.intermedia > row.inicial ? (
                  <ChevronUp className="inline ml-2 text-green-500" aria-label="Improvement" />
                ) : row.intermedia < row.inicial ? (
                  <ChevronDown className="inline ml-2 text-red-500" aria-label="Decline" />
                ) : null}
              </TableCell>
              <TableCell>
                {row.final}
                {row.final > row.intermedia ? (
                  <ChevronUp className="inline ml-2 text-green-500" aria-label="Improvement" />
                ) : row.final < row.intermedia ? (
                  <ChevronDown className="inline ml-2 text-red-500" aria-label="Decline" />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
