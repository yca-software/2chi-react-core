import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type NamespaceLoader = (namespace: string, language: string) => Promise<void>;

/**
 * Loads i18n namespaces on demand. Pass `loadNamespace` from the host app
 * (e.g. templates/react-spa `src/i18n.ts`).
 */
export function useTranslationNamespace(
  namespaces: string[] | string,
  loadNamespace?: NamespaceLoader,
) {
  const namespaceArray = Array.isArray(namespaces) ? namespaces : [namespaces];
  const { t, i18n } = useTranslation(['common', ...namespaceArray]);
  const [isLoading, setIsLoading] = useState(Boolean(loadNamespace));

  useEffect(() => {
    if (!loadNamespace) {
      setIsLoading(false);
      return;
    }

    const run = async () => {
      const language = (i18n.language || i18n.options.fallbackLng || 'en') as string;
      const toLoad = namespaceArray.filter((ns) => !i18n.hasResourceBundle(language, ns));
      if (toLoad.length === 0) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        await Promise.all(toLoad.map((ns) => loadNamespace(ns, language)));
      } catch (err) {
        console.error('Failed to load namespaces:', err);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [i18n, loadNamespace, namespaceArray.join(',')]);

  return { t, isLoading, i18n };
}
