"use client";

import { Asset } from "@/app/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("category")}</Badge>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
];
