import type { CheckboxField } from 'payload'

export function showField(config: Partial<CheckboxField> = {}): CheckboxField {
  return {
    name: 'show',
    type: 'checkbox',
    label: {
      en: 'Show',
      es: 'Mostrar',
    },
    ...config,
  }
}
