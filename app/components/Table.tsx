/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DATATable = ({ data }:{data:any}) => {
  console.log(data);
  return (
    <div className="bg-white rounded-b-lg border border-black">
      <Table className="overflow-y-scroll max-h-96">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Plan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((student: any) => {
            return (
              <TableRow key={student.id}>
                <TableCell className="text-xs sm:text-sm font-medium">{student.full_name}</TableCell>
                <TableCell className="text-xs sm:text-sm">{student.phone_number}</TableCell>
                <TableCell className="text-xs sm:text-sm">{student.country}</TableCell>
                <TableCell className="text-xs sm:text-sm">{student.current_plan_id}</TableCell>
                <TableCell className="text-xs sm:text-sm">{student.plan_periode} Months</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DATATable;
