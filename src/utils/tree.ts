import { SelectionType } from '../types';

export const isSelectableItem = (
  selectionType: SelectionType,
  isParent: boolean
) =>
  selectionType !== SelectionType.None &&
  (selectionType === SelectionType.All ||
    (selectionType === SelectionType.Parent && isParent === true) ||
    (selectionType === SelectionType.Child && isParent === false));
