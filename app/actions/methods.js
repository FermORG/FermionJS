export const METHODS = 'METHODS';

export function updateMethods(methods:string) {
  return {
    type: METHODS,
    methods
  };
}
