import { User } from "./models";

/* ---------======= custom props ======--------- */



/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
  user: User | null;
}
