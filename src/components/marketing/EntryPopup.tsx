'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Input } from '@/components/ui';

const INITIAL_DELAY_MS = 2000;
const REPEAT_DELAY_MS = 5 * 60 * 1000;
const CLOSE_ANIMATION_MS = 220;
const BASE_API_URL = 'https://sssam-r3pz.onrender.com/api';
const ENQUIRY_API_URL = `${BASE_API_URL}/enquiries/public`;

type FormValues = {
  name: string;
  mobile: string;
  course: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>> & {
  submit?: string;
};

const normalizeMobile = (value: string) => value.replace(/\D/g, '').slice(0, 10);

const validateForm = (values: FormValues) => {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const mobile = normalizeMobile(values.mobile);
  const course = values.course.trim();
  const email = values.email.trim();

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length > 100) {
    errors.name = 'Name must be 100 characters or less.';
  }

  if (!mobile) {
    errors.mobile = 'Mobile number is required.';
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = 'Mobile number must be exactly 10 digits.';
  }

  if (!course) {
    errors.course = 'Course is required.';
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export function EntryPopup() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCourseFocused, setIsCourseFocused] = useState(false);
  const [values, setValues] = useState<FormValues>({
    name: '',
    mobile: '',
    course: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const autoCloseRef = useRef<number | null>(null);
  const closeAnimationRef = useRef<number | null>(null);
  const timerStartRef = useRef<number | null>(null);
  const remainingDelayRef = useRef(INITIAL_DELAY_MS);
  const activeModeRef = useRef<'initial' | 'cooldown' | 'idle'>('initial');

  const courseSuggestions = useMemo(
    () => [
      'Full Stack with AI',
      'Data Analyst',
      'Cyber Security',
      'AI & Machine Learning',
      'Digital Marketing',
      'Data Science',
      'Not Sure / Need Guidance',
    ],
    [],
  );

  const filteredCourseSuggestions = useMemo(() => {
    const query = values.course.trim().toLowerCase();

    if (!query) {
      return courseSuggestions;
    }

    return courseSuggestions.filter((course) => course.toLowerCase().includes(query));
  }, [courseSuggestions, values.course]);

  const clearTimer = (ref: React.MutableRefObject<number | null>) => {
    if (ref.current !== null) {
      window.clearTimeout(ref.current);
      ref.current = null;
    }
  };

  const pauseTimer = () => {
    if (timerRef.current === null || timerStartRef.current === null) {
      return;
    }

    remainingDelayRef.current = Math.max(
      0,
      remainingDelayRef.current - (Date.now() - timerStartRef.current),
    );

    clearTimer(timerRef);
    timerStartRef.current = null;
  };

  const scheduleTimer = () => {
    if (timerRef.current !== null || activeModeRef.current === 'idle') {
      return;
    }

    timerStartRef.current = Date.now();
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      timerStartRef.current = null;
      setIsMounted(true);
      window.requestAnimationFrame(() => setIsVisible(true));
      window.requestAnimationFrame(() => nameInputRef.current?.focus());
    }, remainingDelayRef.current);
  };

  const resumeTimer = () => {
    if (activeModeRef.current === 'idle' || isVisible) {
      return;
    }

    if (timerRef.current === null && remainingDelayRef.current > 0) {
      scheduleTimer();
    }
  };

  const closePopup = () => {
    if (!isMounted) {
      return;
    }

    activeModeRef.current = 'cooldown';
    remainingDelayRef.current = REPEAT_DELAY_MS;
    clearTimer(timerRef);
    clearTimer(autoCloseRef);
    setIsVisible(false);
    setErrors({});
    setIsSuccess(false);

    clearTimer(closeAnimationRef);
    closeAnimationRef.current = window.setTimeout(() => {
      setIsMounted(false);
      closeAnimationRef.current = null;
    }, CLOSE_ANIMATION_MS);

    if (document.visibilityState === 'visible') {
      scheduleTimer();
    }
  };

  useEffect(() => {
    activeModeRef.current = 'initial';
    remainingDelayRef.current = INITIAL_DELAY_MS;
    scheduleTimer();

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseTimer();
        return;
      }

      resumeTimer();
    };

    const onBlur = () => pauseTimer();
    const onFocus = () => resumeTimer();

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      clearTimer(timerRef);
      clearTimer(autoCloseRef);
      clearTimer(closeAnimationRef);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !isVisible) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusablesSelector = 'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    nameInputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePopup();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusables = Array.from(
        overlayRef.current?.querySelectorAll<HTMLElement>(focusablesSelector) ?? [],
      ).filter((element) => !element.hasAttribute('disabled'));

      if (!focusables.length) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isMounted, isVisible]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMounted]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleFieldChange = (field: keyof FormValues, nextValue: string) => {
    setValues((current) => ({
      ...current,
      [field]: field === 'mobile' ? normalizeMobile(nextValue) : nextValue,
    }));

    if (errors[field] || errors.submit) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
        submit: undefined,
      }));
    }
  };

    const selectCourseSuggestion = (course: string) => {
      handleFieldChange('course', course);
      setIsCourseFocused(false);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validation = validateForm(values);
    setErrors(validation.errors);

    if (!validation.valid) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(ENQUIRY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          mobile: normalizeMobile(values.mobile),
          course: values.course.trim(),
          email: values.email.trim(),
        }),
      });

      if (!response.ok) {
        let message = 'Unable to submit your enquiry right now.';

        try {
          const data = await response.json();
          message = data?.message || data?.error || message;
        } catch {
          // Keep fallback message.
        }

        throw new Error(message);
      }

      setIsSuccess(true);
      setValues({ name: '', mobile: '', course: '', email: '' });
      clearTimer(autoCloseRef);
      autoCloseRef.current = window.setTimeout(() => {
        closePopup();
      }, 1200);
    } catch (submitError) {
      setErrors({
        submit: submitError instanceof Error ? submitError.message : 'Unable to submit your enquiry right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[120] flex items-start justify-center overflow-hidden px-3 py-3 sm:px-4 sm:py-6 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isVisible}
    >
      <button
        type="button"
        aria-label="Close enquiry popup overlay"
        onClick={closePopup}
        className={`absolute inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="entry-popup-title"
        aria-describedby="entry-popup-description"
        className={`scrollbar-hidden relative w-full max-w-[24.5rem] max-h-[calc(100dvh-1.25rem)] overflow-y-auto rounded-[26px] border border-cyan-400/15 bg-slate-950 shadow-[0_26px_80px_rgba(0,0,0,0.62)] ring-1 ring-white/5 transition-all duration-300 ease-out ${
          isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-[0.97] translate-y-2 opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(2,6,23,0.99))]" />

        <div className="relative p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/78">
                Smart Solutions School of AI & Machine Learning
              </p>
              <h2 id="entry-popup-title" className="mt-1.5 text-[24px] font-semibold leading-tight text-white sm:text-[26px]">
                🚀 Start Your Tech Career
              </h2>
              <p id="entry-popup-description" className="mt-1.5 text-[13px] leading-5 text-slate-300 sm:text-sm">
                Get free course guidance from our counselor.
              </p>
            </div>

            <button
              type="button"
              onClick={closePopup}
              className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition duration-200 hover:-rotate-90 hover:bg-white/10 hover:text-white sm:mt-1"
              aria-label="Close popup"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M5 5l10 10" />
                <path d="M15 5L5 15" />
              </svg>
            </button>
          </div>

          <form className="mt-4 space-y-3.5" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                ref={nameInputRef}
                label="Name"
                placeholder="Student Name"
                value={values.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
                error={errors.name}
                maxLength={100}
                required
                className="rounded-xl border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
              />

              <Input
                label="Mobile Number"
                placeholder="9217031899"
                value={values.mobile}
                onChange={(event) => handleFieldChange('mobile', event.target.value)}
                error={errors.mobile}
                inputMode="numeric"
                maxLength={10}
                required
                className="rounded-xl border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Course Interested In</label>
              <div className="relative">
                <Input
                  placeholder="Course Interested In"
                  value={values.course}
                  onChange={(event) => handleFieldChange('course', event.target.value)}
                  onFocus={() => setIsCourseFocused(true)}
                  onBlur={() => {
                    window.setTimeout(() => setIsCourseFocused(false), 120);
                  }}
                  error={errors.course}
                  required
                  className="rounded-xl border-slate-700/70 bg-slate-900/75 px-3 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-500"
                />

                <svg
                  className="pointer-events-none absolute right-3 top-[1.2rem] h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>

                <div
                  className={`scrollbar-hidden absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950/95 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-200 ${
                    isCourseFocused ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                  }`}
                >
                  <div className="scrollbar-hidden max-h-56 overflow-y-auto p-1">
                    {filteredCourseSuggestions.length ? (
                      filteredCourseSuggestions.map((course) => (
                        <button
                          key={course}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => selectCourseSuggestion(course)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
                        >
                          <span>{course}</span>
                        </button>
                      ))
                    ) : (
                      <div className="rounded-lg px-3 py-2 text-sm text-slate-500">
                        No matching courses.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="info@sssamacademy.com"
              value={values.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
              error={errors.email}
              className="rounded-xl border-dashed border-slate-700/70 bg-slate-900/45 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 opacity-90"
            />

            {errors.submit ? (
              <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-100 sm:text-sm">
                {errors.submit}
              </div>
            ) : null}

            {isSuccess ? (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-100 sm:text-sm">
                ✅ Our counselor will call you soon.
              </div>
            ) : null}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-xl py-2.5 shadow-[0_14px_40px_rgba(6,182,212,0.18)] hover:shadow-[0_16px_44px_rgba(6,182,212,0.28)]"
            >
              {isSubmitting ? 'Submitting...' : 'Request Callback'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}