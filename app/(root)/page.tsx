import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import InterviewCard from "@/components/InterviewCard";
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action';
import { getCurrentUser } from '@/lib/actions/auth.action';

const Page = async () => {

  const user = await getCurrentUser()

  // Only fetch user-specific interviews if user exists
  const [userInterviews, latestInterviews] = await Promise.all([
    user ? await getInterviewsByUserId(user.id) : Promise.resolve([]),
    await getLatestInterviews({ userId: user?.id || 'guest' })
  ])

  const hasPastInterviews = userInterviews && userInterviews.length > 0
  const hasUpcomingInterviews = latestInterviews && latestInterviews.length > 0

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2> Get interview-Ready with AI-Powered Practice and feedback</h2>
          <p className="text-lg">
            Practice on real interview questions and get instant feedback on your answers.
          </p>
          {!user && (
            <p className="text-sm text-gray-400">
              💡 Sign in to save your interview history and track your progress over time.
            </p>
          )}
          <Button asChild className="btn-primiary max-sm:w-full">
            <Link href="/interview">Start Interview</Link>
          </Button>
        </div>
        <Image src="/interview_final.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>{user ? 'Your Interviews' : 'Recent Interviews'}</h2>

        <div className="interviews-section">
          {
            user ? (
              hasPastInterviews ? (
                userInterviews?.map((interview) => (
                  <InterviewCard {...interview} key={interview.id} />
                ))) : (
                <p>You haven&apos;t taken any interviews yet</p>
              )
            ) : (
              <p>Sign in to view your personal interview history</p>
            )}
        </div>
      </section>

      <section className="flex flex-col fap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
              latestInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))) : (
              <p>There are no new interviews available</p>
            )}

        </div>
      </section>
    
    </>
  )
}

export default Page;