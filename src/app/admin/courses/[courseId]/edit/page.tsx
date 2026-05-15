import Link from 'next/link';

export default function EditCoursePage() {
  return (
    <div className="py-12 container mx-auto px-4">
      <div className="max-w-2xl rounded-xl border border-slate-700 bg-slate-800 p-6">
        <h1 className="text-2xl font-semibold text-white mb-3">Course editing is disabled</h1>
        <p className="text-sm text-slate-300 mb-6">
          Course content is now static and managed only in <span className="font-medium">src/data/courses.ts</span>. Use this admin area for sessions and enrollments only.
        </p>
        <Link href="/admin/courses" className="inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
          Back to Courses
        </Link>
      </div>
    </div>
  );
}
