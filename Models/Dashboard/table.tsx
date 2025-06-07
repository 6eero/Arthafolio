"use client";

import { Asset } from "@/app/types/dashboard";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "category",
    header: "Category",
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
