export enum CategoryType {
    "FIRST" = 'first',
    "LAST" = 'last',
    "USUAL" = 'usual',
    "FOR_LESSON" = 'for_lesson'
}

export const testCountByCategory: Record<CategoryType, number> = {
    [CategoryType.FIRST]: 40,
    [CategoryType.LAST]: 40,
    [CategoryType.USUAL]: 40,
    [CategoryType.FOR_LESSON]: 10,
  };