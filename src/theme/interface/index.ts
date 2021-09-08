export type themeType = 'dark' | 'light'

export type ContextType = {
    currentTheme: themeType
    setTheme: (theme: themeType) => void
  }