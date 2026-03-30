import { ReactNode } from "react";
import { BaseCard } from "@/components/base-card";

export function InfoCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <BaseCard className={className} padding={24} radius={30}>
      {children}
    </BaseCard>
  );
}
