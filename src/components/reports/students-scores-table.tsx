"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

type GradeSummary = {
  firstName: string
  lastName: string
  Inicial: number
  Intermedia: number
  Final: number
}

interface Props {
  studentGrades?: Student[];
}

export function StudentScoresTable({ studentGrades }: Props) {
  const [data] = useState<Student[]>(studentGrades || [])
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedType, setSelectedType] = useState<"Scope" | "Core" | "Objective">("Scope")
  const [selectedValue, setSelectedValue] = useState<string>("")

  const uniqueValues = useMemo(() => {
    return {
      courses: Array.from(new Set(data.map(s => s.courseName))),
      scopes: Array.from(new Set(data.map(s => s.scopes))),
      cores: Array.from(new Set(data.map(s => s.cores))),
      objectives: Array.from(new Set(data.map(s => s.objectives))),
    }
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter(student =>
      student.courseName === selectedCourse &&
      (selectedType === "Scope" ? student.scopes === selectedValue :
        selectedType === "Core" ? student.cores === selectedValue :
          student.objectives === selectedValue)
    )
  }, [data, selectedCourse, selectedType, selectedValue])

  const gradeSummary = useMemo(() => {
    const summary: Record<string, GradeSummary> = {}

    filteredData.forEach(student => {
      const key = `${student.firstName}-${student.lastName}`
      if (!summary[key]) {
        summary[key] = {
          firstName: student.firstName,
          lastName: student.lastName,
          Inicial: 0,
          Intermedia: 0,
          Final: 0
        }
      }
      summary[key][student.periodName] += student.grade
    })

    return Object.values(summary)
  }, [filteredData])

  const renderArrow = (current: number, previous: number) => {
    if (current > previous) {
      return <ChevronUp className="inline text-green-500" />
    } else if (current < previous) {
      return <ChevronDown className="inline text-red-500" />
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Grades Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Select onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.courses.map((course) => (
                <SelectItem key={course} value={course}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedType(value as "Scope" | "Core" | "Objective")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Scope">Scope</SelectItem>
              <SelectItem value="Core">Core</SelectItem>
              <SelectItem value="Objective">Objective</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedValue}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={`Select ${selectedType}`} />
            </SelectTrigger>
            <SelectContent>
              {(selectedType === "Scope" ? uniqueValues.scopes :
                selectedType === "Core" ? uniqueValues.cores :
                  uniqueValues.objectives).map((value) => (
                    <SelectItem key={value} value={value}>{value}</SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Inicial</TableHead>
                <TableHead>Intermedia</TableHead>
                <TableHead>Final</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeSummary.map((summary) => (
                <TableRow key={`${summary.firstName}-${summary.lastName}`}>
                  <TableCell>{summary.firstName}</TableCell>
                  <TableCell>{summary.lastName}</TableCell>
                  <TableCell>{summary.Inicial}</TableCell>
                  <TableCell>
                    {summary.Intermedia}
                    {renderArrow(summary.Intermedia, summary.Inicial)}
                  </TableCell>
                  <TableCell>
                    {summary.Final}
                    {renderArrow(summary.Final, summary.Intermedia)}
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
