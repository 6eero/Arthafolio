"use client";

import { Asset } from "@/app/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export function useAssetColumns(): ColumnDef<Asset>[] {
  const t = useTranslations("generic.categories");

  return [
    {
      accessorKey: "label",
      header: "Label",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue<string>("category");
        return <Badge variant="outline">{t(category)}</Badge>;
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
}
