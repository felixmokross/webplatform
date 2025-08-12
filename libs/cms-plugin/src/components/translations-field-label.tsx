'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type {
  CollectionSlug,
  FieldLabelClientProps,
  GlobalSlug,
  Locale,
  RichTextFieldClient,
  TextareaFieldClient,
  TextFieldClient,
} from 'payload'
import type { PropsWithChildren, ReactNode } from 'react'

import { getLabelText } from '@fxmk/cms-plugin'
import { Label } from '@fxmk/cms-plugin/client'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import {
  Button,
  CheckIcon,
  Drawer,
  FieldLabel,
  Pill,
  toast,
  Translation,
  useConfig,
  useDocumentInfo,
  useFormModified,
  useLocale,
  useModal,
  useTranslation,
} from '@payloadcms/ui'
import { formatDrawerSlug, useDrawerDepth } from '@payloadcms/ui/elements/Drawer'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import type { TranslationsKey, TranslationsObject } from '../translations.js'

import { cn } from '../common/cn.js'
import { SparklesIcon } from '../common/icons.js'

export function TranslationsFieldLabel({
  field,
  path,
}: FieldLabelClientProps<RichTextFieldClient | TextareaFieldClient | TextFieldClient>) {
  const { closeModal, isModalOpen, openModal } = useModal()

  const { id, collectionSlug, globalSlug } = useDocumentInfo()
  const locale = useLocale()
  const isModified = useFormModified()

  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKey>()
  const depth = useDrawerDepth()
  const modalSlug = formatDrawerSlug({
    slug: `translations-${path}`,
    depth,
  })

  const { config } = useConfig()

  if (!config.localization) {
    throw new Error('Localization must be enabled')
  }
  if (typeof id === 'number') {
    throw new Error('number ids are not supported')
  }

  const translationsDisabled = (collectionSlug && !id) || isModified

  const label = field?.label ? getLabelText(field.label, i18n) : undefined
  //  The Label is also rendered in the List view, here without path, see https://payloadcms.com/docs/fields/overview#label
  if (!path) {
    return <FieldLabel label={label} unstyled={true} />
  }

  return (
    <div className="tw:flex tw:justify-between tw:items-baseline tw:gap-4">
      <FieldLabel label={label} localized={true} path={path} required={field?.required} />
      {path && (
        <>
          <div
            title={
              translationsDisabled
                ? t('cmsPlugin:translations:pleaseSaveYourChangesToEnableAutoTranslate')
                : undefined
            }
          >
            <button
              className="tw:disabled:opacity-50 tw:disabled:cursor-not-allowed tw:disabled:hover:text-theme-elevation-800 tw:bg-transparent tw:underline tw:hover:text-theme-elevation-1000 tw:cursor-pointer tw:border-none tw:p-0 tw:text-theme-elevation-800"
              disabled={translationsDisabled}
              onClick={() => openModal(modalSlug)}
              type="button"
            >
              {i18n.t('cmsPlugin:translations:translationsButtonLabel')}
            </button>
          </div>
          <Drawer slug={modalSlug} title={t('cmsPlugin:translations:translationsTitle')}>
            {isModalOpen(modalSlug) && (
              <DrawerContent
                collectionSlug={collectionSlug}
                currentLocale={locale}
                fieldPath={path}
                globalSlug={globalSlug}
                id={id}
                locales={config.localization.locales}
                onClose={() => closeModal(modalSlug)}
              />
            )}
          </Drawer>
        </>
      )}
    </div>
  )
}

function DrawerContent({
  id,
  collectionSlug,
  currentLocale,
  fieldPath,
  globalSlug,
  locales,
  onClose,
}: {
  collectionSlug?: CollectionSlug
  currentLocale: Locale
  fieldPath: string
  globalSlug?: GlobalSlug
  id?: string
  locales: Locale[]
  onClose: () => void
}) {
  const [data, setData] = useState<AllLocalesText | null>(null)

  const updateData = useCallback(
    async function updateData() {
      const searchParams = new URLSearchParams()
      if (collectionSlug) {
        searchParams.set('collection', collectionSlug)
      }
      if (globalSlug) {
        searchParams.set('global', globalSlug)
      }
      if (id) {
        searchParams.set('id', id)
      }
      searchParams.set('fieldPath', fieldPath)
      const result = await fetch(`/api/translations?${searchParams.toString()}`, {
        credentials: 'include',
      })

      if (result.ok) {
        setData(await result.json())
      } else {
        setData(null)
      }
    },
    [id, collectionSlug, fieldPath, globalSlug],
  )

  const { closeModal, openModal } = useModal()
  const drawerDepth = useDrawerDepth()

  useEffect(() => {
    void (async function () {
      await updateData()
    })()
  }, [updateData])

  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKey>()
  const [isTranslating, setIsTranslating] = useState(false)
  const otherLocales = locales.filter((locale) => locale.code !== currentLocale.code)
  const [selectedLocaleCodes, setSelectedLocaleCodes] = useState(
    otherLocales.map((locale) => locale.code),
  )

  if (!data) {
    return (
      <div className="tw:flex tw:h-[calc(100vh-10rem)] tw:items-center tw:justify-center tw:text-2xl tw:text-theme-elevation-600">
        {t('cmsPlugin:common:loading')}
      </div>
    )
  }
  const showWideColumns = isLongContent(data, currentLocale.code)

  const selectLocalesModalSlug = formatDrawerSlug({
    slug: `auto-translate-confirmation`,
    depth: drawerDepth,
  })

  return (
    <>
      <Drawer slug={selectLocalesModalSlug} title={t('cmsPlugin:translations:selectLocales')}>
        <div className="tw:mt-8 tw:space-y-4">
          <p>
            <Translation
              elements={{
                a: ({ children }) => (
                  <a href="https://www.deepl.com" rel="noreferrer" target="_blank">
                    {children}
                  </a>
                ),
              }}
              // @ts-expect-error types don't match
              i18nKey="custom:translations:selectLocalesDescription"
              // @ts-expect-error types don't match
              t={t}
              variables={{
                sourceLocale: getLabelText(currentLocale.label, i18n),
              }}
            />
          </p>
        </div>
        <div className="tw:mt-8 tw:space-y-4">
          {otherLocales.map((locale) => (
            <div key={locale.code}>
              <CheckboxInput
                checked={selectedLocaleCodes.includes(locale.code)}
                label={<Label>{locale.label}</Label>}
                name={`locale-${locale.code}`}
                setChecked={(checked) =>
                  setSelectedLocaleCodes((slc) =>
                    checked ? [...slc, locale.code] : slc.filter((lc) => lc !== locale.code),
                  )
                }
              />
            </div>
          ))}
        </div>

        <p className="tw:mt-8">
          <Translation
            elements={{ s: ({ children }) => <strong>{children}</strong> }}
            // @ts-expect-error types don't match
            i18nKey="custom:translations:selectLocalesNote"
            // @ts-expect-error types don't match
            t={t}
          />
        </p>
        <div className="tw:mt-1">
          <Button
            disabled={isTranslating || selectedLocaleCodes.length === 0}
            onClick={async () => {
              setIsTranslating(true)
              try {
                const searchParams = new URLSearchParams()
                if (collectionSlug) {
                  searchParams.set('collection', collectionSlug)
                }
                if (id) {
                  searchParams.set('id', id)
                }
                if (globalSlug) {
                  searchParams.set('global', globalSlug)
                }
                searchParams.set('fieldPath', fieldPath)
                searchParams.set('locale', currentLocale.code)
                const response = await fetch(`/api/auto-translate?${searchParams.toString()}`, {
                  body: JSON.stringify({
                    targetLocaleCodes: selectedLocaleCodes,
                  }),
                  credentials: 'include',
                  method: 'POST',
                })
                if (response.ok) {
                  await updateData()
                  closeModal(selectLocalesModalSlug)
                  toast.success(t('cmsPlugin:translations:autoTranslatedSuccessfully'), {
                    duration: 3000,
                  })
                } else {
                  toast.error(t('cmsPlugin:translations:failedToAutoTranslate'), {
                    duration: 3000,
                  })
                }
              } finally {
                setIsTranslating(false)
              }
            }}
            size="large"
            type="submit"
          >
            {isTranslating
              ? t('cmsPlugin:translations:translating')
              : t('cmsPlugin:translations:translateToSelectedLocales')}
          </Button>
        </div>
      </Drawer>
      <div className="table">
        <div className="tw:max-h-[calc(100vh-10rem)] tw:overflow-y-auto">
          <table cellPadding="0" cellSpacing="0" className="tw:min-w-[unset] tw:table-fixed">
            <thead className="tw:bg-theme-bg">
              <tr>
                <TableHeaderFooterCell isHighlighted={true} isStickyLeft={true} isStickyTop={true}>
                  <Label>{currentLocale.label}</Label>
                  <Pill rounded={true}>{t('cmsPlugin:translations:currentLocale')}</Pill>
                </TableHeaderFooterCell>
                {otherLocales.map((locale) => (
                  <TableHeaderFooterCell isStickyTop={true} key={locale.code}>
                    <Label>{locale.label}</Label>
                  </TableHeaderFooterCell>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableContentCell isHighlighted={true} isStickyLeft={true} isWide={showWideColumns}>
                  <AllLocalesTextRenderer data={data} localeCode={currentLocale.code} />
                </TableContentCell>
                {otherLocales.map((locale) => (
                  <TableContentCell isWide={showWideColumns} key={locale.code}>
                    <AllLocalesTextRenderer data={data} localeCode={locale.code} />
                  </TableContentCell>
                ))}
              </tr>
            </tbody>
            <tfoot className="tw:bg-theme-bg">
              <tr>
                <TableHeaderFooterCell
                  isHighlighted={true}
                  isStickyBottom={true}
                  isStickyLeft={true}
                >
                  <Button
                    buttonStyle="primary"
                    disabled={isTranslating}
                    icon={<SparklesIcon />}
                    onClick={() => openModal(selectLocalesModalSlug)}
                    size="medium"
                  >
                    {t('cmsPlugin:translations:autoTranslate')}
                  </Button>
                </TableHeaderFooterCell>
                {otherLocales.map((locale) => (
                  <TableHeaderFooterCell isStickyBottom={true} key={locale.code}>
                    <Button
                      buttonStyle="secondary"
                      disabled={isTranslating}
                      el="link"
                      icon="edit"
                      onClick={() => onClose()}
                      size="medium"
                      to={`?locale=${encodeURIComponent(locale.code)}`}
                    >
                      {t('cmsPlugin:translations:goToTranslation')}
                    </Button>
                  </TableHeaderFooterCell>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

type TableHeaderCellProps = PropsWithChildren<{
  isHighlighted?: boolean
  isStickyBottom?: boolean
  isStickyLeft?: boolean
  isStickyTop?: boolean
}>

function TableHeaderFooterCell({
  children,
  isHighlighted = false,
  isStickyBottom = false,
  isStickyLeft = false,
  isStickyTop = false,
}: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        'tw:px-12 tw:py-3',
        isHighlighted ? 'tw:bg-theme-elevation-50 tw:text-theme-elevation-700' : 'tw:bg-theme-bg',
        (isStickyTop || isStickyLeft || isStickyBottom) &&
          cn(
            'tw:sticky',
            isStickyLeft && 'tw:left-0',
            isStickyTop && 'tw:top-0 tw:shadow-sm tw:z-20',
            isStickyBottom && 'tw:bottom-0',
          ),
        isStickyTop && isStickyLeft && 'tw:z-30',
        isStickyBottom && isStickyLeft && 'tw:z-20',
      )}
    >
      <div className="tw:flex tw:gap-4 tw:items-center">{children}</div>
    </th>
  )
}

type TableContentCellProps = PropsWithChildren<{
  isHighlighted?: boolean
  isStickyLeft?: boolean
  isWide?: boolean
}>

function TableContentCell({
  children,
  isHighlighted = false,
  isStickyLeft = false,
  isWide,
}: TableContentCellProps) {
  return (
    <td
      className={cn(
        isWide ? 'tw:w-[40rem] tw:min-w-[40rem]' : 'tw:w-[24rem] tw:min-w-[24rem]',
        'tw:p-12',
        isHighlighted ? 'tw:bg-theme-elevation-100' : 'tw:bg-theme-elevation-50',
        isStickyLeft && 'tw:sticky tw:left-0 tw:z-10',
      )}
    >
      {children}
    </td>
  )
}

type AllLocalesText = {
  value: null | Record<string, SerializedEditorState | string> | undefined
}

type AllLocalesTextRendererProps = {
  data: AllLocalesText
  localeCode: string
}

function AllLocalesTextRenderer({ data, localeCode }: AllLocalesTextRendererProps) {
  if (!data.value) {
    return null
  }

  const text = data.value[localeCode]
  return (
    <>
      {typeof text === 'string' ? (
        text
      ) : (
        <div
          className="rich-text-html tw:prose-xl tw:pointer-events-none tw:hyphens-auto tw:font-serif"
          dangerouslySetInnerHTML={{
            __html: convertLexicalToHTML({
              data: text,
            }),
          }}
          lang={localeCode}
        />
      )}
    </>
  )
}

function isLongContent(data: AllLocalesText, localeCode: string) {
  if (!data.value) {
    return false
  }

  const text = data.value[localeCode]

  const plainText =
    typeof text === 'string'
      ? text
      : convertLexicalToPlaintext({
          data: text,
        })
  return !!plainText && plainText.length > 200
}

type CheckboxInputProps = {
  checked: boolean
  defaultChecked?: boolean
  label: ReactNode
  name?: string
  readOnly?: boolean
  setChecked: (checked: boolean) => void
}

export function CheckboxInput({
  name,
  checked,
  label,
  readOnly = false,
  setChecked,
}: CheckboxInputProps) {
  const inputBaseClass = 'checkbox-input'
  const ref = useRef<HTMLInputElement>(null)
  const id = `checkbox-input-${useId()}`

  return (
    <div
      className={[
        inputBaseClass,
        checked && `${inputBaseClass}--checked`,
        readOnly && `${inputBaseClass}--read-only`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={`${inputBaseClass}__input`}>
        <input
          checked={checked}
          disabled={readOnly}
          id={id}
          name={name}
          onChange={(e) => setChecked(e.target.checked)}
          ref={ref}
          type="checkbox"
        />
        <span
          className={[`${inputBaseClass}__icon`, !checked ? 'partial' : 'check']
            .filter(Boolean)
            .join(' ')}
        >
          {checked && <CheckIcon />}
        </span>
      </div>
      <label className={`${inputBaseClass}__label`} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
