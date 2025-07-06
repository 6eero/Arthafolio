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
import { useDashboardSearchActions } from "@/api/Holdings/tasks";

const DrawerDialog = ({
  open,
  setOpen,
  setClickedAsset,
  initialValues,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  setClickedAsset: (value: { label: string; quantity: number }) => void;
  initialValues: { label: string; quantity: number };
}) => {
  const isMobile = useIsMobile();
  const t = useTranslations("");

  if (isMobile === undefined) return null;

  return isMobile ? (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      onClose={() => setClickedAsset({ label: "", quantity: 0 })}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{t("dashboard.add_modal.title")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.add_modal.description")}
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          initialValues={initialValues}
          setOpen={setOpen}
          setClickedAsset={setClickedAsset}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t("generic.actions.close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("dashboard.add_modal.title")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.add_modal.description")}
          </DialogDescription>
        </DialogHeader>
        <ProfileForm
          initialValues={initialValues}
          setOpen={setOpen}
          setClickedAsset={setClickedAsset}
        />
      </DialogContent>
    </Dialog>
  );
};

const ProfileForm = ({
  setOpen,
  initialValues,
  setClickedAsset,
}: {
  setOpen: (value: boolean) => void;
  initialValues: any;
  setClickedAsset: (value: { label: string; quantity: number }) => void;
}) => {
  const t = useTranslations("");
  const { onAddHolding, onRemoveHolding } = useDashboardSearchActions();

  const handleRemove = () => {
    onRemoveHolding(initialValues.label);
    setOpen(false);
    setClickedAsset({ label: "", quantity: 0 });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
        onAddHolding(values);
        setOpen(false);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="sm:mx-0 mx-4">
            <div className="flex flex-col gap-10">
              <SelectWithSearch
                name="label"
                label={"dashboard.add_modal.fields.label.label"}
                placeholder={"dashboard.add_modal.fields.label.placeholder"}
                domain={cryptoLabels}
                formik={formik}
              />
              <FormikInput
                type="number"
                name="quantity"
                label={"dashboard.add_modal.fields.quantity.label"}
                placeholder={"dashboard.add_modal.fields.quantity.placeholder"}
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
                {t("generic.actions.add")}
              </Button>
              {R.isNotEmpty(initialValues.label) && (
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
