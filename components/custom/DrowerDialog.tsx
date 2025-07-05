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
import FormikInput from "../formik/Input";

const DrawerDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const isMobile = useIsMobile();
  const t = useTranslations("");

  if (isMobile === undefined) return null;

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{t("dashboard.add_modal.title")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.add_modal.description")}
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm />
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
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
};

const ProfileForm = () => {
  const t = useTranslations("");
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-10 mx-4">
            <FormikInput
              name="password"
              label={"login.fields.password.label"}
              placeholder={"login.fields.password.placeholder"}
              formik={formik}
            />
            <Button loading={false} type="submit" className="w-full">
              {t("generic.actions.add")}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DrawerDialog;
