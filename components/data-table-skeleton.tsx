import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./skeleton";

interface DataTableSkeleton {
  nColumns: number;
  nRows: number;
}

export function DataTableSkeleton({ nColumns, nRows }: DataTableSkeleton) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: nColumns }, (_, index) => {
              return (
                <TableHead key={index}>
                  <Skeleton className="w-12 h-5 bg-muted/80" />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: nRows }, (_, index) => (
            <TableRow key={index}>
              {Array.from({ length: nColumns }, (_, index) => (
                <TableCell key={index}>
                  {/* <div className="h-12 content-center"> */}
                  <Skeleton className="w-18 h-6" />
                  {/* </div> */}
                </TableCell>
              ))}
            </TableRow>
          ))}{" "}
        </TableBody>
      </Table>
    </div>
  );
}
