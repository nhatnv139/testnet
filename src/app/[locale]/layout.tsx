import type { Metadata } from 'next'
import { Lexend } from "next/font/google";
import '../globals.css'
import { cookieToInitialState } from 'wagmi'
import { headers } from 'next/headers'
import { config } from '@/config'
import ContextProvider from '@/context'
import PageLayout from '@/layouts'
import TranslationsProvider from '@/components/TranslationsProvider'
import initTranslations from '../i18n'

const lexend = Lexend({
  weight: ['400', '300','500','700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})
const i18nNamespaces = ['common'];

export const metadata: Metadata = {
  title: 'Athene Vault',
  description: 'Athene Vault'
}

export default async function RootLayout({
  children,
  params
}: any) {
  const locale = params?.locale ||"en"

  const initialState = cookieToInitialState(config as any, headers().get('cookie'))
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale}>
        <body className={lexend.className}>
            <TranslationsProvider
                namespaces={i18nNamespaces}
                locale={locale}
                resources={resources}
            >
                <ContextProvider initialState={initialState}>
                  <PageLayout>
                    {children}
                  </PageLayout>
                </ContextProvider>
            </TranslationsProvider>
        </body>
    </html>
  )
}
