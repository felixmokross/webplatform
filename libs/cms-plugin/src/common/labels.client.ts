'use client'

import { useTranslation } from '@payloadcms/ui'

import type { LabelData } from './labels.js'

import { getLabelText } from './labels.js'

export function Label({ children }: { children: LabelData }) {
  const { i18n } = useTranslation()
  return getLabelText(children, i18n)
}
