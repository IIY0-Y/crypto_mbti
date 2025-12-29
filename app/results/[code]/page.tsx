import { Suspense } from "react";
import { personalities } from "@/lib/data";
import { ResultsView } from "@/components/results-view";

interface PageProps {
    params: Promise<{ code: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResultsPage({ params, searchParams }: PageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    
    const code = resolvedParams.code.toUpperCase();
    const personality = personalities[code] || null;
    
    const scores = {
        Time: Number(resolvedSearchParams.time) || 0,
        Risk: Number(resolvedSearchParams.risk) || 0,
        Decision: Number(resolvedSearchParams.decision) || 0,
        Role: Number(resolvedSearchParams.role) || 0,
    };

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Analyzing...</div>}>
            <ResultsView personality={personality} code={code} scores={scores} />
        </Suspense>
    )
}
