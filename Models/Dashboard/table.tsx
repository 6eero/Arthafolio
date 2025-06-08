"use client";

import { Asset } from "@/app/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export function useAssetColumns(): ColumnDef<Asset>[] {
  const t = useTranslations("");

  return [
    {
      accessorKey: "label",
      header: t("dashboard.table.header.label"),
      cell: ({ row }) => {
        const label = row.getValue<string>("label");
        return <code className="font-bold">{label}</code>;
      },
    },
    {
      accessorKey: "category",
      header: t("dashboard.table.header.category"),
      cell: ({ row }) => {
        const category = row.getValue<string>("category");
        return (
          <Badge variant="outline">{t(`generic.categories.${category}`)}</Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: t("dashboard.table.header.price"),
      cell: ({ row }) => {
        const price: number = row.getValue<number>("price");
        return <p>{`${price.toFixed(2)} €`}</p>;
      },
    },
    {
      accessorKey: "quantity",
      header: t("dashboard.table.header.quantity"),
    },
    {
      accessorKey: "value",
      header: t("dashboard.table.header.value"),
      cell: ({ row }) => {
        const value: number = row.getValue<number>("value");
        return <p>{`${value.toFixed(2)} €`}</p>;
      },
    },
    {
      accessorKey: "percentage",
      header: t("dashboard.table.header.percentage"),
      cell: ({ row }) => {
        const percentage: number = row.getValue<number>("percentage");
        return (
          <div className="flex items-center gap-4 justify-start w-[200px]">
            <p className="w-16 text-right">{`${percentage.toFixed(2)} %`}</p>
            <Progress value={percentage} className="w-40" />
          </div>
        );
      },
    },
  ];
}
