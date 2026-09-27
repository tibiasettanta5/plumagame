import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useT } from '../i18n'
import { SITE } from '../site.config'
import './SiteFooter.css'

type Props = {
  onClose: () => void
}

type Status = 'idle' | 'sending' | 'ok' | 'error'

const MIN_FILL_MS = 2500

export function ContactModal({ onClose }: Props) {
  const t = useT()
  const openedAt = useRef(Date.now())
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [spamAnswer, setSpamAnswer] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [spamError, setSpamError] = useState(false)

  const challenge = useMemo(() => {
    const a = 2 + Math.floor(Math.random() * 7)
    const b = 1 + Math.floor(Math.random() * 8)
    return { a, b, sum: a + b }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSpamError(false)
    if (!name.trim() || !email.trim() || !message.trim()) return

    // Honeypot filled → bot: fingi successo senza inviare
    if (honeypot.trim()) {
      setStatus('ok')
      return
    }

    // Invio troppo rapido → sospetto
    if (Date.now() - openedAt.current < MIN_FILL_MS) {
      setSpamError(true)
      return
    }

    const n = Number.parseInt(spamAnswer.trim(), 10)
    if (!Number.isFinite(n) || n !== challenge.sum) {
      setSpamError(true)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _subject: `${SITE.name} — ${t('contact.subject')}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('ok')
      setName('')
      setEmail('')
      setMessage('')
      setSpamAnswer('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="legal-shell" role="presentation" onClick={onClose}>
      <div
        className="legal-panel contact-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="legal-panel-head">
          <h2 id="contact-title">{t('contact.title')}</h2>
          <button
            type="button"
            className="legal-close"
            onClick={onClose}
            aria-label={t('aff.close')}
          >
            ×
          </button>
        </header>

        <p className="contact-intro">{t('contact.intro')}</p>

        {status === 'ok' ? (
          <p className="contact-status contact-status--ok" role="status">
            {t('contact.success')}
          </p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
            {/* Honeypot antispam — nascosto agli utenti */}
            <div className="contact-honeypot" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>

            <label className="contact-field">
              <span>{t('contact.name')}</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'sending'}
              />
            </label>
            <label className="contact-field">
              <span>{t('contact.email')}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={160}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
              />
            </label>
            <label className="contact-field">
              <span>{t('contact.message')}</span>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={4000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === 'sending'}
              />
            </label>

            <label className="contact-field">
              <span>
                {t('contact.spam', { a: challenge.a, b: challenge.b })}
              </span>
              <input
                type="text"
                name="spamcheck"
                inputMode="numeric"
                autoComplete="off"
                required
                maxLength={3}
                value={spamAnswer}
                onChange={(e) => {
                  setSpamAnswer(e.target.value)
                  setSpamError(false)
                }}
                disabled={status === 'sending'}
              />
            </label>

            {(spamError || status === 'error') && (
              <p className="contact-status contact-status--error" role="alert">
                {spamError ? t('contact.spamError') : t('contact.error')}
              </p>
            )}

            <button
              type="submit"
              className="contact-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
