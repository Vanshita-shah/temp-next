export const formatErrors = (errors: Record<string, string[]>) => {
  const formattedErrors: Record<string, string> = {};
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      formattedErrors[key] = errors[key][0];
    }
  }

  return formattedErrors;
};
