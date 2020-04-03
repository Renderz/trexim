import { EnumListType, MenuDataItem, CascaderList, KeyMap } from '../typings';

export interface ConfigProviderProps {
  enumList?: EnumListType;
  cascaderList?: CascaderList;
  menuData?: MenuDataItem[];
  menuKeyMap?: KeyMap;
}
