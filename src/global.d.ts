// Code so TS doesn't complain about importing .css files
declare module '*.css' {
  const content: {[className: string]: string};
  export default content;
}


