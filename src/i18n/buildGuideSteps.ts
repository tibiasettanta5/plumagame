import type { GuideStep } from '../shared/guide'
import type { TFunction } from './I18nProvider'

export function buildGuideSteps<T extends string>(
  t: TFunction,
  game: string,
  sims: readonly T[],
): GuideStep<T>[] {
  return sims.map((sim, i) => ({
    title: t(`guide.${game}.${i}.t`),
    body: t(`guide.${game}.${i}.b`),
    sim,
  }))
}
