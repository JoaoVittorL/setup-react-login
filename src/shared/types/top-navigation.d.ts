export type Instruction = string | Array<{ Coluna: string; Condições: string }>;
export type Model = Array<{ [key: string]: any }>;
interface Props {
  setTabTaskActive: (tab: any) => void;
  tabTaskActive: number;
  turnIsActive: boolean;
  items: TabProps[];
}

export interface TabProps {
  id: number;
  label: string;
  icon: LucideIcon;
  component: React.ComponentType;
  withTurn?: boolean;
  instruction?: Instruction;
  keyValidator?: string;
  model?: Model;
}
