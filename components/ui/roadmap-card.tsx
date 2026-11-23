"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status?: "done" | "in-progress" | "upcoming";
}

export interface RoadmapCardProps {
  title?: string;
  description?: string;
  items: RoadmapItem[];
  className?: string;
}

export function RoadmapCard({
  title = "Product Roadmap",
  description = "Upcoming features and releases",
  items,
  className,
}: RoadmapCardProps) {
  return (
    <Card className={cn("w-full max-w-4xl shadow-xl hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Desktop/Tablet Horizontal Timeline Line */}
          <div className="hidden md:block absolute left-0 right-0 top-4 h-px bg-border" />

          <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-4 border-l border-border pl-6 md:border-l-0 md:pl-0">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative text-left md:pt-8 md:text-center md:flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute -left-[32px] top-1 md:left-1/2 md:top-2 md:-translate-x-1/2 h-4 w-4 rounded-full flex items-center justify-center ${
                    item.status === "done" || item.status === "in-progress"
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-background" />
                </motion.div>

                {/* Stage / Quarter Badge */}
                <Badge
                  variant={
                    item.status === "done" || item.status === "in-progress"
                      ? "default"
                      : "outline"
                  }
                  className="mb-1.5 text-[11px]"
                >
                  {item.quarter}
                </Badge>

                {/* Title + Description */}
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
