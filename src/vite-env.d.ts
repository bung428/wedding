/// <reference types="vite/client" />

interface CustomIconDefinition {
  prefix: string;
  iconName: string;
  icon: (string | number | never[])[];
}