import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getRandomInterviewCover } from '@/lib/utils'
import DisplayTechIcons from '@/components/DisplayTechIcons'

const InterviewCard = ({id, role, type, techstack, createdAt }: InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type; 
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')   
    const hasBeenTaken = !!feedback;

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96 hover:scale-[1.02] transition-transform duration-200">
            <div className="card-interview">
                {/* Header with type badge */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Image 
                            src={getRandomInterviewCover()} 
                            alt="cover image" 
                            width={80} 
                            height={80} 
                            className="rounded-full object-cover size-[80px] border-2 border-primary-200/20"
                        />
                        <div>
                            <h3 className="text-lg font-semibold capitalize text-white mb-1">
                                {role} Interview
                            </h3>
                            <div className="flex items-center gap-2">
                                <DisplayTechIcons techStack={techstack} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary-200/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <p className="text-xs font-medium text-primary-200">{normalizedType}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                    {/* Metadata row */}
                    <div className='flex items-center gap-6 text-sm text-gray-300'>
                        <div className="flex items-center gap-2">
                            <Image src="/calendar.svg" alt="calendar" width={16} height={16} />
                            <span>{formattedDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Image src="/star.svg" alt="star" width={16} height={16} />
                            <span className={hasBeenTaken ? "text-primary-200 font-semibold" : "text-gray-400"}>
                                {hasBeenTaken ? `${feedback.totalScore}/100` : '--/100'}
                            </span>
                        </div>
                    </div>

                    {/* Status/Description */}
                    <div className="min-h-[80px] flex flex-col justify-center">
                        {hasBeenTaken ? (
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                                {feedback.finalAssessment}
                            </p>
                        ) : (
                            <div className="text-center py-4 px-3 rounded-lg bg-gradient-to-r from-primary-200/10 to-purple-500/10 border border-primary-200/20">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-primary-200 rounded-full animate-pulse"></div>
                                    <span className="text-primary-200 font-medium text-sm">Ready to start</span>
                                </div>
                                <p className="text-gray-400 text-xs">
                                    Take this interview to test your skills and get detailed feedback!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action button */}
                <div className="pt-4">
                    <Button asChild className="btn-primary w-full">
                        <Link href={hasBeenTaken
                            ? `/interview/${id}/feedback`
                            : `/interview/${id}`
                        }>
                            {hasBeenTaken ? 'View Feedback' : 'Start Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard
