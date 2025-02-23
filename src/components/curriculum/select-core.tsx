"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCallback } from "react";

export default function SelectCore({ cores }: { cores: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const encodedString = encodeURIComponent(value.trim().toLowerCase());
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, encodedString);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <Select
      onValueChange={(value) => {
        router.push(pathname + "?" + createQueryString("core", value));
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Elige un nucleo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {cores.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
