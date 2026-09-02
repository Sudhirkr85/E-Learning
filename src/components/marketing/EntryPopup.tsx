'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Input } from '@/components/ui';

const INITIAL_DELAY_MS = 3000; // 3 seconds delay after page load
const REPEAT_DELAY_MS = 5 * 60 * 1000; // 5 minutes repeat cooldown
const CLOSE_ANIMATION_MS = 220;

const DEFAULT_COURSES = [
  'Full Stack Web Development (MERN & Next.js)',
  'Data Science with Python & Machine Learning',
  'Data Analytics, Power BI & SQL Masterclass',
  'Cyber Security & Ethical Hacking (CEH)',
  'Performance Digital Marketing & SEO Mastery',
  'Python Programming & DSA Masterclass',
  'Not Sure / Need Career Counseling',
];

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

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length > 100) {
    errors.name = 'Name must be 100 characters or less.';
  }

  if (!mobile) {
    errors.mobile = 'Mobile number is required.';
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = 'Enter a valid 10-digit mobile number.';
  }

  if (!course) {
    errors.course = 'Course is required.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export function EntryPopup() {
  const pathname = usePathname();
  const isExcluded =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up');

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCourseFocused, setIsCourseFocused] = useState(false);
  const [courseSuggestions, setCourseSuggestions] = useState<string[]>(DEFAULT_COURSES);
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

  useEffect(() => {
    fetch('/api/suggestions')
      .then((res) => res.json())
      .then((data) => {
        if (data?.suggestions && Array.isArray(data.suggestions)) {
          setCourseSuggestions(
            data.suggestions
              .map((s: { label: string }) => s.label)
              .concat(['Not Sure / Need Career Counseling'])
          );
        }
      })
      .catch(() => {});
  }, []);

  const filteredCourseSuggestions = useMemo(() => {
    const query = values.course.trim().toLowerCase();
    if (!query) {
      return courseSuggestions.slice(0, 8);
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
    if (isExcluded) {
      activeModeRef.current = 'idle';
      clearTimer(timerRef);
      clearTimer(autoCloseRef);
      clearTimer(closeAnimationRef);
      timerStartRef.current = null;
      remainingDelayRef.current = INITIAL_DELAY_MS;
      setIsVisible(false);
      setIsMounted(false);
      return;
    }

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
  }, [isExcluded]);

  useEffect(() => {
    if (isExcluded || !isMounted || !isVisible) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    nameInputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePopup();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isExcluded, isMounted, isVisible]);

  if (isExcluded) {
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

  const handleDirectWhatsApp = () => {
    const courseText = values.course || 'IT Courses';
    const message = encodeURIComponent(
      `Hi SSSAM Academy! I am looking for details regarding ${courseText} at your Sector 14 Gurugram center.`
    );
    window.open(`https://wa.me/919217031899?text=${message}`, '_blank');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validateForm(values);
    setErrors(validation.errors);
    if (!validation.valid) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Direct call to local Next.js /api/inquiry endpoint
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: normalizeMobile(values.mobile),
          course: values.course.trim(),
          email: values.email.trim(),
          mode: 'Classroom (Sector 14 Gurugram) / Live Online',
          source: pathname || '/',
        }),
      });

      setIsSuccess(true);
      setValues({ name: '', mobile: '', course: '', email: '' });
      clearTimer(autoCloseRef);
      autoCloseRef.current = window.setTimeout(() => {
        closePopup();
      }, 2500);
    } catch (submitError) {
      setErrors({
        submit: 'Unable to submit right now. Please chat with us on WhatsApp.',
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
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden px-3 py-3 sm:px-4 sm:py-6 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isVisible}
    >
      <button
        type="button"
        aria-label="Close popup overlay"
        onClick={closePopup}
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`scrollbar-hidden relative w-full max-w-[25.5rem] max-h-[calc(100dvh-1.25rem)] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-slate-950 shadow-2xl shadow-cyan-500/20 ring-1 ring-white/10 transition-all duration-300 ease-out ${
          isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-[0.97] translate-y-2 opacity-0'
        }`}
      >
        <div className="relative p-5 sm:p-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  📍 Gurugram Sector 14 Center
                </p>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">
                🎓 Book Free Demo Class
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Get syllabus, fee quotes & 1-on-1 counseling.
              </p>
            </div>

            <button
              type="button"
              onClick={closePopup}
              className="w-8 h-8 rounded-full border border-slate-700 bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center text-sm transition"
              aria-label="Close popup"
            >
              ✕
            </button>
          </div>

          <form className="mt-4 space-y-3.5" onSubmit={handleSubmit}>
            <Input
              ref={nameInputRef}
              label="Full Name *"
              placeholder="e.g. Rahul Sharma"
              value={values.name}
              onChange={(event) => handleFieldChange('name', event.target.value)}
              error={errors.name}
              maxLength={100}
              required
              className="rounded-xl border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
            />

            <Input
              label="WhatsApp Mobile Number *"
              placeholder="e.g. 9217031899"
              value={values.mobile}
              onChange={(event) => handleFieldChange('mobile', event.target.value)}
              error={errors.mobile}
              inputMode="numeric"
              maxLength={10}
              required
              className="rounded-xl border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
            />

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Course Interested In *
              </label>
              <div className="relative">
                <Input
                  placeholder="e.g. Full Stack Development"
                  value={values.course}
                  onChange={(event) => handleFieldChange('course', event.target.value)}
                  onFocus={() => setIsCourseFocused(true)}
                  onBlur={() => {
                    window.setTimeout(() => setIsCourseFocused(false), 150);
                  }}
                  error={errors.course}
                  required
                  className="rounded-xl border-slate-700 bg-slate-900 px-3.5 py-2.5 pr-10 text-sm text-slate-100 placeholder:text-slate-500"
                />

                <div
                  className={`scrollbar-hidden absolute left-0 right-0 top-[calc(100%+0.25rem)] z-30 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl backdrop-blur-md transition-all duration-200 ${
                    isCourseFocused
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none -translate-y-1 opacity-0'
                  }`}
                >
                  <div className="max-h-48 overflow-y-auto p-1">
                    {filteredCourseSuggestions.map((course) => (
                      <button
                        key={course}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectCourseSuggestion(course)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-slate-200 transition hover:bg-slate-800 hover:text-cyan-300"
                      >
                        <span>{course}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {errors.submit}
              </div>
            )}

            {isSuccess && (
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-3 text-center">
                <p className="text-xs font-bold text-emerald-300">
                  ✓ Request Received! Counselor will call you shortly.
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-xl py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-sm"
            >
              {isSubmitting ? 'Submitting...' : 'Request Demo & Fee Discount'}
            </Button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <a href="tel:+919217031899" className="hover:text-cyan-300 flex items-center gap-1 font-medium">
              📞 +91 92170 31899
            </a>
            <button
              onClick={handleDirectWhatsApp}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              💬 WhatsApp Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
