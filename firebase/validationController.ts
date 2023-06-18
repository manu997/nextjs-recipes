export const checkElementRequiredFields = (
  elementToCheck: any,
  requiredFields: Array<string>
) => requiredFields.every((field) => elementToCheck[field] !== undefined);
