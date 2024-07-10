import { ReactNode } from 'react';
import {
  ImageSourcePropType,
  KeyboardType,
  TextInputProps,
} from 'react-native';

export type WelcomeScreenProp = {
  image: ImageSourcePropType;
  content: string;
  itemNumber: number;
  setItemNumber: React.Dispatch<React.SetStateAction<number>>;
};

export type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type CustomTextInputProp = {
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  textColor?: string;
  bgColor?: string;
  keyBoardType?: KeyboardType;
};

export type CustomSubmitBtnProp = {
  text: string;
  textColor?: string;
  bgColor?: string;
  onPress: () => void;
  children?: ReactNode;
  disabled?: boolean;
};

// export type savedQuotesProp = {
//   _id: string;
//   content: string;
//   author: string;
//   tags: string[];
//   authorSlug: string;
//   length: number;
// };

export type AppState = {
  user: any | null;
  savedQuotes: QuotesData[];
};

export type AppContextProps = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  addQuoteToLocalState: (quote: QuotesData) => Promise<void>;
  removeQuoteFromLocalState: (quote: QuotesData) => Promise<void>;
  setUser: (user: any | null) => Promise<void>;
};

export type SearchBarProp = {
  searchText: string;
  setsearchText: (text: string) => void;
  searchAction: (text: string) => void;
};

export type SkeletonLoaderProp = {
  width: number | string;
  height: number | string;
  style?: { [key: string]: any };
};

export type QuotesData = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  index: number;
};
