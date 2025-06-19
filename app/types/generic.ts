export type Button = {
  variant:
    | "outline"
    | "link"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost";
  text: string;
  onClick: () => void;
};
