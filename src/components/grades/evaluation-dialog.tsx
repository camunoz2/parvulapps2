"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export function EvaluationDialog() {
  const [nucleo, setNucleo] = useState("All");
  const [ambito, setAmbito] = useState("All");
  const [oa, setOA] = useState("All");

  const handleNucleoChange = (value) => setNucleo(value);
  const handleAmbitoChange = (value) => setAmbito(value);
  const handleOAChange = (value) => setOA(value);

  const data = [
    {
      indicadores: "Indicador 1",
      "Alumno 1": "ML",
      "Alumno 2": "L",
      "Alumno 3": "PL",
      "Alumno 4": "ML",
      "Alumno 5": "L",
      "Alumno 6": "PL",
      nucleo: "Nucleo A",
      ambito: "Ambito X",
      oa: "OA 1",
    },
    {
      indicadores: "Indicador 2",
      "Alumno 1": "L",
      "Alumno 2": "PL",
      "Alumno 3": "ML",
      "Alumno 4": "L",
      "Alumno 5": "PL",
      "Alumno 6": "ML",
      nucleo: "Nucleo B",
      ambito: "Ambito Y",
      oa: "OA 2",
    },
    {
      indicadores: "Indicador 3",
      "Alumno 1": "PL",
      "Alumno 2": "ML",
      "Alumno 3": "L",
      "Alumno 4": "PL",
      "Alumno 5": "ML",
      "Alumno 6": "L",
      nucleo: "Nucleo A",
      ambito: "Ambito X",
      oa: "OA 3",
    },
    {
      indicadores: "Indicador 4",
      "Alumno 1": "ML",
      "Alumno 2": "L",
      "Alumno 3": "PL",
      "Alumno 4": "ML",
      "Alumno 5": "L",
      "Alumno 6": "PL",
      nucleo: "Nucleo B",
      ambito: "Ambito Y",
      oa: "OA 1",
    },
  ];

  const filteredData = data.filter((row) => {
    return (
      (nucleo === "All" || row.nucleo === nucleo) &&
      (ambito === "All" || row.ambito === ambito) &&
      (oa === "All" || row.oa === oa)
    );
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Nucleo <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full sm:w-48">
            <DropdownMenuCheckboxItem
              checked={nucleo === "All"}
              onCheckedChange={() => handleNucleoChange("All")}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={nucleo === "Nucleo A"}
              onCheckedChange={() => handleNucleoChange("Nucleo A")}
            >
              Nucleo A
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={nucleo === "Nucleo B"}
              onCheckedChange={() => handleNucleoChange("Nucleo B")}
            >
              Nucleo B
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Ambito <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full sm:w-48">
            <DropdownMenuCheckboxItem
              checked={ambito === "All"}
              onCheckedChange={() => handleAmbitoChange("All")}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={ambito === "Ambito X"}
              onCheckedChange={() => handleAmbitoChange("Ambito X")}
            >
              Ambito X
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={ambito === "Ambito Y"}
              onCheckedChange={() => handleAmbitoChange("Ambito Y")}
            >
              Ambito Y
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              OA <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full sm:w-48">
            <DropdownMenuCheckboxItem
              checked={oa === "All"}
              onCheckedChange={() => handleOAChange("All")}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={oa === "OA 1"}
              onCheckedChange={() => handleOAChange("OA 1")}
            >
              OA 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={oa === "OA 2"}
              onCheckedChange={() => handleOAChange("OA 2")}
            >
              OA 2
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={oa === "OA 3"}
              onCheckedChange={() => handleOAChange("OA 3")}
            >
              OA 3
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicadores</TableHead>
              <TableHead className="min-w-[120px]">Alumno 1</TableHead>
              <TableHead className="min-w-[120px]">Alumno 2</TableHead>
              <TableHead className="min-w-[120px]">Alumno 3</TableHead>
              <TableHead className="min-w-[120px]">Alumno 4</TableHead>
              <TableHead className="min-w-[120px]">Alumno 5</TableHead>
              <TableHead className="min-w-[120px]">Alumno 6</TableHead>
              <TableHead>Nucleo</TableHead>
              <TableHead>Ambito</TableHead>
              <TableHead>OA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow
                key={index}
                className={`${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
              >
                <TableCell>{row.indicadores}</TableCell>
                <TableCell>{row["Alumno 1"]}</TableCell>
                <TableCell>{row["Alumno 2"]}</TableCell>
                <TableCell>{row["Alumno 3"]}</TableCell>
                <TableCell>{row["Alumno 4"]}</TableCell>
                <TableCell>{row["Alumno 5"]}</TableCell>
                <TableCell>{row["Alumno 6"]}</TableCell>
                <TableCell>{row.nucleo}</TableCell>
                <TableCell>{row.ambito}</TableCell>
                <TableCell>{row.oa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
