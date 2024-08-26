import { useEffect, useMemo, useState } from 'react'

const useTheme = (): ['light' | 'dark', React.Dispatch<React.SetStateAction<'light' | 'dark'>>] => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // memoize html, I don't know why
  const html = useMemo(() => document.querySelector('html'), [])

  // set theme if state changed
  useEffect(() => {
    html?.setAttribute('data-theme', theme)
  }, [html, theme])

  // auto change theme when prefers-color-scheme changes
  useEffect(() => {
    const setThemeEvent = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    setTheme(darkMediaQuery.matches ? 'dark' : 'light')

    darkMediaQuery.addEventListener('change', setThemeEvent)

    return () => {
      darkMediaQuery.removeEventListener('change', setThemeEvent)
    }
  }, [])
  // Use in code:
  // const [theme, setTheme] = useTheme()
  //   setTheme() will change theme
  //   theme will be 'light' or 'dark'
  // OR:
  // if used as useTheme() it will still work when prefers-color-scheme changes
  return [theme, setTheme]
}

export default useTheme
