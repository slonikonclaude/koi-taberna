'use client'

import { createElement, useEffect, useRef, type ReactNode } from 'react'

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'figure' | 'header'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Escalonado entre hermanos. 30–80 ms es el rango que se lee bien. */
  delay?: number
  as?: RevealTag
}

/**
 * Aparición al entrar en pantalla. Se dispara una sola vez y no bloquea la
 * interacción. El estado oculto vive en `globals.css` y solo se aplica cuando
 * hay JavaScript, así que sin JS el contenido se ve igualmente.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      element.dataset.visible = 'true'
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.dataset.visible = 'true'
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return createElement(
    as,
    {
      ref,
      className,
      'data-reveal': '',
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  )
}
