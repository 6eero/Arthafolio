"use client";

import { Asset } from "@/app/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash } from "lucide-react";
import { useTranslations } from "next-intl";

export function useAssetColumns(
  onEdit: (asset: Asset) => void,
  onDelete?: (asset: Asset) => void
): ColumnDef<Asset>[] {
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
        return <p>{`${price} €`}</p>;
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
        return <p>{`${value} €`}</p>;
      },
    },
    {
      accessorKey: "percentage",
      header: () => (
        <div className="text-center w-full">
          {t("dashboard.table.header.percentage")}
        </div>
      ),
      cell: ({ row }) => {
        const percentage: number = row.getValue<number>("percentage");
        return (
          <div className="flex items-center gap-4 justify-center w-full">
            <p className="w-16 text-right">{`${percentage} %`}</p>
            <Progress value={percentage} className="w-full" />
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => (
        <div className="text-center w-full">
          {t("dashboard.table.header.actions")}
        </div>
      ),
      cell: ({ row }) => {
        const asset = row.original;
        return (
          <div className="flex items-center gap-6 justify-center w-full">
            <SquarePen
              size={22}
              className="text-muted-foreground cursor-pointer"
              onClick={() => onEdit(asset)}
            />
            <Trash
              size={22}
              className="text-destructive cursor-pointer"
              onClick={() => onDelete?.(asset)}
            />
          </div>
        );
      },
    },
  ];
}
