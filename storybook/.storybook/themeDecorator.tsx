import React from "react";
import { supersetTheme, ThemeProvider } from "@superset-ui/core";

const ThemeDecorator = (Story: any) => (
  <ThemeProvider theme={supersetTheme}>
    <Story />
  </ThemeProvider>
);

export default ThemeDecorator;
