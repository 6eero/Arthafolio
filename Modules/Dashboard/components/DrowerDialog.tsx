"use client";

import * as React from "react";

import Button from "@/components/custom/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";
import { Formik } from "formik";
import FormikInput from "../../../components/formik/Input";
import SelectWithSearch from "../../../components/formik/SelectWithSearch";
import { cryptoLabels } from "@/lib/crypto";
import * as R from "ramda";
import { useDashboardActions } from "@/api/Holdings/tasks";

const DrawerDialog = ({
  open,
  setOpen,
  setClickedAsset,
  initialValues,
  assetsLabel,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  setClickedAsset: (value: { label: string; quantity: number }) => void;
  initialValues: { label: string; quantity: number };
  assetsLabel: string[];
}) => {
  const isMobile = useIsMobile();
  const t = useTranslations("");

  const availableCryptoLabels = R.difference(cryptoLabels, assetsLabel);

  if (isMobile === undefined) return null;
  const isEdit = R.isNotEmpty(initialValues.label);

  return isMobile ? (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      onClose={() => setClickedAsset({ label: "", quantity: 0 })}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {isEdit
              ? t("dashboard.manage_asset_modal.edit")
              : t("dashboard.manage_asset_modal.add")}
          </DrawerTitle>
          <DrawerDescription>
            {isEdit
              ? t("dashboard.manage_asset_modal.description_edit")
              : t("dashboard.manage_asset_modal.description_add")}
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          initialValues={initialValues}
          setOpen={setOpen}
          setClickedAsset={setClickedAsset}
          isEdit={isEdit}
          availableCryptoLabels={availableCryptoLabels}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t("generic.actions.close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setClickedAsset({ label: "", quantity: 0 });
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? t("dashboard.manage_asset_modal.edit")
              : t("dashboard.manage_asset_modal.add")}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t("dashboard.manage_asset_modal.description_edit")
              : t("dashboard.manage_asset_modal.description_add")}
          </DialogDescription>
        </DialogHeader>
        <ProfileForm
          initialValues={initialValues}
          setOpen={setOpen}
          setClickedAsset={setClickedAsset}
          isEdit={isEdit}
          availableCryptoLabels={availableCryptoLabels}
        />
      </DialogContent>
    </Dialog>
  );
};

const ProfileForm = ({
  setOpen,
  initialValues,
  setClickedAsset,
  isEdit,
  availableCryptoLabels,
}: {
  setOpen: (value: boolean) => void;
  initialValues: any;
  setClickedAsset: (value: { label: string; quantity: number }) => void;
  isEdit: boolean;
  availableCryptoLabels: string[];
}) => {
  const t = useTranslations("");
  const { onAddHolding, onRemoveHolding, onEditHolding } =
    useDashboardActions();

  const handleRemove = () => {
    onRemoveHolding(initialValues.label);
    setOpen(false);
    setClickedAsset({ label: "", quantity: 0 });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        if (isEdit) {
          onEditHolding(values);
        } else {
          onAddHolding(values);
        }
        setOpen(false);
        setClickedAsset({ label: "", quantity: 0 });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="sm:mx-0 mx-4">
            <div className="flex flex-col gap-10">
              <SelectWithSearch
                name="label"
                label={"dashboard.manage_asset_modal.fields.label.label"}
                placeholder={
                  "dashboard.manage_asset_modal.fields.label.placeholder"
                }
                domain={availableCryptoLabels}
                formik={formik}
                disabled={isEdit}
              />
              <FormikInput
                type="number"
                name="quantity"
                label={"dashboard.manage_asset_modal.fields.quantity.label"}
                placeholder={
                  "dashboard.manage_asset_modal.fields.quantity.placeholder"
                }
                formik={formik}
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !formik.values.label ||
                  !R.includes(formik.values.label, cryptoLabels) ||
                  !formik.values.quantity ||
                  formik.values.quantity <= 0
                }
              >
                {isEdit ? t("generic.actions.edit") : t("generic.actions.add")}
              </Button>
              {isEdit && (
                <Button
                  onClick={handleRemove}
                  type="submit"
                  variant="destructive"
                  className="w-full"
                >
                  {t("generic.actions.delete")}
                </Button>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DrawerDialog;
