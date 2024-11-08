"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type Student = {
  grade: number
  periodName: string
  firstName: string
  lastName: string
  courseName: string
  indicators: string
  objectives: string
  cores: string
  scopes: string
}

interface Props {
  studentGrades: Student[]
}

export function StudentScoresTable({ studentGrades }: Props) {
  const [data] = useState<Student[]>(studentGrades || [])
  const [filters, setFilters] = useState({
    course: "",
    scope: "",
    core: "",
    objective: "",
    indicator: "",
  })

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredData = useMemo(() => {
    return data?.filter(student =>
      (filters.course === "" || student.courseName.includes(filters.course)) &&
      (filters.scope === "" || student.scopes.includes(filters.scope)) &&
      (filters.core === "" || student.cores.includes(filters.core)) &&
      (filters.objective === "" || student.objectives.includes(filters.objective)) &&
      (filters.indicator === "" || student.indicators.includes(filters.indicator))
    )
  }, [data, filters])

  const groupedData = useMemo(() => {
    const grouped = filteredData.reduce((acc, student) => {
      const key = `${student.firstName} ${student.lastName}`
      if (!acc[key]) {
        acc[key] = { name: key, Inicial: null, Intermedia: null, Final: null }
      }
      acc[key][student.periodName] = student.grade
      return acc
    }, {} as Record<string, { name: string, Inicial: number | null, Intermedia: number | null, Final: number | null }>)
    return Object.values(grouped)
  }, [filteredData])

  const uniqueValues = useMemo(() => {
    return {
      courses: Array.from(new Set(data.map(s => s.courseName))),
      scopes: Array.from(new Set(data.map(s => s.scopes))),
      cores: Array.from(new Set(data.map(s => s.cores))),
      objectives: Array.from(new Set(data.map(s => s.objectives))),
      indicators: Array.from(new Set(data.map(s => s.indicators))),
    }
  }, [data])

  const renderArrow = (current: number | null, previous: number | null) => {
    if (current === null || previous === null) return null
    if (current > previous) {
      return <ChevronUp className="inline text-green-500" />
    } else if (current < previous) {
      return <ChevronDown className="inline text-red-500" />
    }
    return null
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Student Grades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Select onValueChange={(value) => handleFilterChange("course", value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.courses.map((course) => (
                <SelectItem key={course} value={course}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange("scope", value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Scope" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.scopes.map((scope) => (
                <SelectItem key={scope} value={scope}>{scope}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange("core", value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Core" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.cores.map((core) => (
                <SelectItem key={core} value={core}>{core}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Select onValueChange={(value) => handleFilterChange("objective", value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Objective" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.objectives.map((objective) => (
                <SelectItem key={objective} value={objective}>{objective.slice(0, 50)}...</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange("indicator", value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Indicator" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.indicators.map((indicator) => (
                <SelectItem key={indicator} value={indicator}>{indicator.slice(0, 50)}...</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setFilters({ course: "", scope: "", core: "", objective: "", indicator: "" })}
          >
            Clear Filters
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Inicial</TableHead>
                <TableHead>Intermedia</TableHead>
                <TableHead>Final</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedData.map((student) => (
                <TableRow key={student.name}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.Inicial}</TableCell>
                  <TableCell>
                    {student.Intermedia}
                    {renderArrow(student.Intermedia, student.Inicial)}
                  </TableCell>
                  <TableCell>
                    {student.Final}
                    {renderArrow(student.Final, student.Intermedia)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
