"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Mail,
  Copy,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "professional", title: "Professional" },
  { id: "goals", title: "Website Goals" },
  { id: "design", title: "Design" },
  { id: "budget", title: "Budget" },
  { id: "requirements", title: "Requirements" },
];

export interface OnboardingFormData {
  name: string;
  email: string;
  company: string;
  profession: string;
  experience: string;
  industry: string;
  primaryGoal: string;
  targetAudience: string;
  contentTypes: string[];
  colorPreference: string;
  stylePreference: string;
  inspirations: string;
  budget: string;
  timeline: string;
  features: string[];
  additionalInfo: string;
}

interface OnboardingFormProps {
  className?: string;
  recipientEmail?: string;
  recipientName?: string;
  whatsappUrl?: string;
  nameInputRef?: React.Ref<HTMLInputElement>;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const initialFormState: OnboardingFormData = {
  name: "",
  email: "",
  company: "",
  profession: "",
  experience: "",
  industry: "",
  primaryGoal: "",
  targetAudience: "",
  contentTypes: [],
  colorPreference: "",
  stylePreference: "",
  inspirations: "",
  budget: "",
  timeline: "",
  features: [],
  additionalInfo: "",
};

const OnboardingForm = ({
  className,
  recipientEmail = "syedmehdi.deve@gmail.com",
  recipientName = "Syed Mehdi",
  whatsappUrl = "https://wa.me/923222549467",
  nameInputRef,
}: OnboardingFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [formData, setFormData] =
    useState<OnboardingFormData>(initialFormState);

  const updateFormData = (field: keyof OnboardingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.features];
      if (features.includes(feature)) {
        return { ...prev, features: features.filter((f) => f !== feature) };
      }
      return { ...prev, features: [...features, feature] };
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const completeSubmission = (channel: "email" | "whatsapp") => {
    void copyTextSafely(`To: ${recipientEmail}\n\n${formatSummaryText()}`);
    toast.success(
      channel === "email"
        ? `Opening email to ${recipientEmail} with your filled form!`
        : "Opening WhatsApp with your filled form!",
    );
    setIsSubmitted(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim() !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        );
      case 1:
        return formData.profession.trim() !== "" && formData.industry !== "";
      case 2:
        return formData.primaryGoal !== "";
      case 3:
        return formData.stylePreference !== "";
      case 4:
        return formData.budget !== "" && formData.timeline !== "";
      default:
        return true;
    }
  };

  const formatSummaryText = () =>
    `Hello ${recipientName},\n\n` +
    `Name: ${formData.name}\n` +
    `Email: ${formData.email}\n` +
    (formData.company ? `Company: ${formData.company}\n` : "") +
    `Profession: ${formData.profession} (${formData.industry})\n` +
    `Primary Goal: ${formData.primaryGoal}\n` +
    (formData.targetAudience
      ? `Target Audience: ${formData.targetAudience}\n`
      : "") +
    `Design Style: ${formData.stylePreference}\n` +
    (formData.inspirations ? `Inspirations: ${formData.inspirations}\n` : "") +
    `Budget: ${formData.budget}\n` +
    `Timeline: ${formData.timeline}\n` +
    (formData.features.length > 0
      ? `Features: ${formData.features.join(", ")}\n`
      : "") +
    (formData.additionalInfo
      ? `Additional Info:\n${formData.additionalInfo}\n`
      : "");

  const buildEmailSubject = () =>
    `[Project Inquiry] ${formData.primaryGoal || "Website"} — ${formData.name}`;

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(buildEmailSubject());
    const body = encodeURIComponent(formatSummaryText());
    return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  const buildGmailHref = () => {
    const to = encodeURIComponent(recipientEmail);
    const subject = encodeURIComponent(buildEmailSubject());
    const body = encodeURIComponent(formatSummaryText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
  };

  const buildWhatsAppHref = () => {
    return `${whatsappUrl}?text=${encodeURIComponent(formatSummaryText())}`;
  };

  const copyTextSafely = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fall back to execCommand inside sandboxed iframes
    }
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  };

  const handleCopyBrief = async () => {
    const ok = await copyTextSafely(
      `To: ${recipientEmail}\n\n${formatSummaryText()}`,
    );
    if (ok) {
      setCopiedBrief(true);
      toast.success("Brief copied to clipboard!");
      setTimeout(() => setCopiedBrief(false), 2400);
    } else {
      toast.error("Please select and copy the summary text manually.");
    }
  };

  const handleOpenEmailClick = () => {
    void copyTextSafely(`To: ${recipientEmail}\n\n${formatSummaryText()}`);
    toast.success(`Opening email to ${recipientEmail} (brief copied as backup)`);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  return (
    <div
      className={cn(
        "w-full mx-auto [--background:#ffffff] [--foreground:#111113] [--card:#ffffff] [--card-foreground:#111113] [--popover:#ffffff] [--popover-foreground:#111113] [--primary:#A2090F] [--primary-foreground:#ffffff] [--secondary:#f4f4f6] [--secondary-foreground:#111113] [--muted:#e4e4e7] [--muted-foreground:#52525b] [--accent:#f4f4f6] [--accent-foreground:#111113] [--border:rgba(0,0,0,0.12)] [--input:rgba(0,0,0,0.16)] [--ring:rgba(162,9,15,0.4)]",
        className,
      )}
    >
      {/* Progress indicator */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.08 }}
            >
              <motion.button
                type="button"
                aria-label={`Step ${index + 1}: ${step.title}`}
                className={cn(
                  "w-4 h-4 rounded-full cursor-pointer transition-colors duration-300",
                  index < currentStep
                    ? "bg-white"
                    : index === currentStep
                      ? "bg-white ring-4 ring-white/25"
                      : "bg-white/30",
                )}
                onClick={() => {
                  if (!isSubmitted && index <= currentStep) {
                    setCurrentStep(index);
                  }
                }}
                whileTap={{ scale: 0.95 }}
              />
              <span
                className={cn(
                  "text-xs mt-1.5 hidden sm:block transition-colors",
                  index === currentStep
                    ? "text-white font-semibold"
                    : "text-white/65",
                )}
              >
                {step.title}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{
              width: `${((isSubmitted ? steps.length - 1 : currentStep) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <Card className="border border-white/90 bg-white text-[#111113] shadow-[0_24px_68px_rgba(0,0,0,0.28)] rounded-3xl overflow-hidden">
          {isSubmitted ? (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A2090F]">
                  Inquiry Ready
                </p>
                <h3
                  className="text-2xl sm:text-3xl font-black text-[#111113]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Send Your Brief to {recipientName}
                </h3>
                <p className="text-sm text-neutral-600">
                  Your 6-step project onboarding brief is ready for{" "}
                  <span className="font-semibold text-[#111113]">
                    {recipientEmail}
                  </span>
                  . Open in Gmail, use your mail app, send on WhatsApp, or copy
                  it below.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F6F6F9] border border-black/10 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
                <div>
                  <span className="font-bold text-[#111113]">Name:</span>{" "}
                  {formData.name}
                </div>
                <div>
                  <span className="font-bold text-[#111113]">Email:</span>{" "}
                  {formData.email}
                </div>
                <div>
                  <span className="font-bold text-[#111113]">Profession:</span>{" "}
                  {formData.profession} ({formData.industry})
                </div>
                <div>
                  <span className="font-bold text-[#111113]">Goal &amp; Style:</span>{" "}
                  {formData.primaryGoal} · {formData.stylePreference}
                </div>
                <div>
                  <span className="font-bold text-[#111113]">Budget &amp; Timeline:</span>{" "}
                  {formData.budget} · {formData.timeline}
                </div>
                {formData.features.length > 0 && (
                  <div className="sm:col-span-2">
                    <span className="font-bold text-[#111113]">Features:</span>{" "}
                    {formData.features.join(", ")}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    asChild
                    className="rounded-2xl bg-[#111113] text-white hover:bg-[#A2090F]"
                  >
                    <a
                      href={buildGmailHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleOpenEmailClick}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Open Email (Gmail)
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-black/15 text-[#111113] hover:bg-neutral-100"
                  >
                    <a
                      href={buildMailtoHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleOpenEmailClick}
                    >
                      Mail App
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-black/15 text-[#111113] hover:bg-neutral-100"
                  >
                    <a
                      href={buildWhatsAppHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Send via WhatsApp
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopyBrief}
                    className="rounded-2xl border-black/15 text-[#111113] hover:bg-neutral-100 cursor-pointer"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="w-4 h-4 mr-1.5 text-[#A2090F]" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1.5" />
                        Copy Brief
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  className="rounded-2xl text-neutral-600 hover:text-[#111113] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Start Over
                </Button>
              </div>
            </div>
          ) : (
            <div className="min-h-[470px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
                  className="flex-1"
                >
                  {/* Step 1: Personal Info */}
                  {currentStep === 0 && (
                    <>
                      <CardHeader>
                        <CardTitle>Tell Us About Yourself</CardTitle>
                        <CardDescription>
                          Let&apos;s start with some basic information. Please
                          fill out the input fields below.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            ref={nameInputRef}
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              updateFormData("name", e.target.value)
                            }
                            className="h-11 rounded-2xl border-black/15 bg-white px-4 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus-visible:ring-2 focus-visible:ring-[#A2090F]/20 focus-visible:border-[#A2090F]"
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            className="h-11 rounded-2xl border-black/15 bg-white px-4 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus-visible:ring-2 focus-visible:ring-[#A2090F]/20 focus-visible:border-[#A2090F]"
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="company">
                            Company/Organization (Optional)
                          </Label>
                          <Input
                            id="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={(e) =>
                              updateFormData("company", e.target.value)
                            }
                            className="h-11 rounded-2xl border-black/15 bg-white px-4 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus-visible:ring-2 focus-visible:ring-[#A2090F]/20 focus-visible:border-[#A2090F]"
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 2: Professional Background */}
                  {currentStep === 1 && (
                    <>
                      <CardHeader>
                        <CardTitle>Professional Background</CardTitle>
                        <CardDescription>
                          Tell us about your professional experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="profession">
                            What&apos;s your profession?
                          </Label>
                          <Input
                            id="profession"
                            placeholder="e.g. Designer, Developer, Marketer"
                            value={formData.profession}
                            onChange={(e) =>
                              updateFormData("profession", e.target.value)
                            }
                            className="h-11 rounded-2xl border-black/15 bg-white px-4 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus-visible:ring-2 focus-visible:ring-[#A2090F]/20 focus-visible:border-[#A2090F]"
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="industry">
                            What industry do you work in?
                          </Label>
                          <Select
                            value={formData.industry}
                            onValueChange={(value) =>
                              updateFormData("industry", value)
                            }
                          >
                            <SelectTrigger
                              id="industry"
                              className="h-11 rounded-2xl border-black/15 bg-white px-4 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus:ring-2 focus:ring-[#A2090F]/20 focus:border-[#A2090F]"
                            >
                              <SelectValue placeholder="Select an industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-[#111113] border-black/15">
                              <SelectItem value="technology">
                                Technology
                              </SelectItem>
                              <SelectItem value="healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="creative">
                                Creative Arts
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 3: Website Goals */}
                  {currentStep === 2 && (
                    <>
                      <CardHeader>
                        <CardTitle>Website Goals</CardTitle>
                        <CardDescription>
                          What are you trying to achieve with your website?
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label>
                            What&apos;s the primary goal of your website?
                          </Label>
                          <RadioGroup
                            value={formData.primaryGoal}
                            onValueChange={(value) =>
                              updateFormData("primaryGoal", value)
                            }
                            className="space-y-2"
                          >
                            {[
                              {
                                value: "showcase",
                                label: "Showcase portfolio/work",
                              },
                              { value: "sell", label: "Sell products/services" },
                              {
                                value: "generate-leads",
                                label: "Generate leads/inquiries",
                              },
                              {
                                value: "provide-info",
                                label: "Provide information",
                              },
                              {
                                value: "blog",
                                label: "Blog/content publishing",
                              },
                            ].map((goal, index) => (
                              <motion.div
                                key={goal.value}
                                onClick={() =>
                                  updateFormData("primaryGoal", goal.value)
                                }
                                className="flex items-center space-x-2 rounded-2xl border border-black/15 p-3 cursor-pointer hover:border-[#A2090F]/55 hover:bg-[#FFF9F9] transition-all duration-200"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  transition: {
                                    delay: 0.06 * index,
                                    duration: 0.25,
                                  },
                                }}
                              >
                                <RadioGroupItem
                                  value={goal.value}
                                  id={`goal-${index + 1}`}
                                />
                                <Label
                                  htmlFor={`goal-${index + 1}`}
                                  className="cursor-pointer w-full"
                                >
                                  {goal.label}
                                </Label>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="targetAudience">
                            Who is your target audience?
                          </Label>
                          <Textarea
                            id="targetAudience"
                            placeholder="Describe your ideal visitors/customers"
                            value={formData.targetAudience}
                            onChange={(e) =>
                              updateFormData("targetAudience", e.target.value)
                            }
                            className="min-h-[88px] rounded-2xl border-black/15 bg-white px-4 py-3 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus-visible:ring-2 focus-visible:ring-[#A2090F]/20 focus-visible:border-[#A2090F]"
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 4: Design Preferences */}
                  {currentStep === 3 && (
                    <>
                      <CardHeader>
                        <CardTitle>Design Preferences</CardTitle>
                        <CardDescription>
                          Tell us about your aesthetic preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label>
                            What style do you prefer for your website?
                          </Label>
                          <RadioGroup
                            value={formData.stylePreference}
                            onValueChange={(value) =>
                              updateFormData("stylePreference", value)
                            }
                            className="space-y-2"
                          >
                            {[
                              { value: "modern", label: "Modern & Sleek" },
                              { value: "minimalist", label: "Minimalist" },
                              { value: "bold", label: "Bold & Creative" },
                              {
                                value: "corporate",
                                label: "Corporate & Professional",
                              },
                            ].map((style, index) => (
                              <motion.div
                                key={style.value}
                                onClick={() =>
                                  updateFormData("stylePreference", style.value)
                                }
                                className="flex items-center space-x-2 rounded-2xl border border-black/15 p-3 cursor-pointer hover:border-[#A2090F]/55 hover:bg-[#FFF9F9] transition-all duration-200"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                    delay: 0.06 * index,
                                    duration: 0.25,
                                  },
                                }}
                              >
                                <RadioGroupItem
                                  value={style.value}
                                  id={`style-${index + 1}`}
                                />
                                <Label
                                  htmlFor={`style-${index + 1}`}
                                  className="cursor-pointer w-full"
                                >
                                  {style.label}
                                </Label>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="inspirations">
                            Any websites you like for inspiration?
                          </Label>
                          <Textarea
                            id="inspirations"
                            placeholder="List websites you admire or want to emulate"
                            value={formData.inspirations}
                            onChange={(e) =>
                              updateFormData("inspirations", e.target.value)
                            }
                            className="min-h-[88px] rounded-2xl border-black/15 bg-white px-4 py-3 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus-visible:ring-2 focus-visible:ring-[#A2090F]/20 focus-visible:border-[#A2090F]"
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 5: Budget & Timeline */}
                  {currentStep === 4 && (
                    <>
                      <CardHeader>
                        <CardTitle>Budget &amp; Timeline</CardTitle>
                        <CardDescription>
                          Let&apos;s talk about your investment and timeline
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="budget">
                            What&apos;s your budget range? (USD)
                          </Label>
                          <Select
                            value={formData.budget}
                            onValueChange={(value) =>
                              updateFormData("budget", value)
                            }
                          >
                            <SelectTrigger
                              id="budget"
                              className="h-11 rounded-2xl border-black/15 bg-white px-4 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus:ring-2 focus:ring-[#A2090F]/20 focus:border-[#A2090F]"
                            >
                              <SelectValue placeholder="Select your budget" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-[#111113] border-black/15">
                              <SelectItem value="under-1000">
                                Under $1,000
                              </SelectItem>
                              <SelectItem value="1000-3000">
                                $1,000 - $3,000
                              </SelectItem>
                              <SelectItem value="3000-5000">
                                $3,000 - $5,000
                              </SelectItem>
                              <SelectItem value="5000-10000">
                                $5,000 - $10,000
                              </SelectItem>
                              <SelectItem value="over-10000">
                                Over $10,000
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label>What&apos;s your expected timeline?</Label>
                          <RadioGroup
                            value={formData.timeline}
                            onValueChange={(value) =>
                              updateFormData("timeline", value)
                            }
                            className="space-y-2"
                          >
                            {[
                              { value: "asap", label: "ASAP" },
                              { value: "1-month", label: "Within 1 month" },
                              { value: "3-months", label: "1-3 months" },
                              { value: "flexible", label: "Flexible" },
                            ].map((time, index) => (
                              <motion.div
                                key={time.value}
                                onClick={() =>
                                  updateFormData("timeline", time.value)
                                }
                                className="flex items-center space-x-2 rounded-2xl border border-black/15 p-3 cursor-pointer hover:border-[#A2090F]/55 hover:bg-[#FFF9F9] transition-all duration-200"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  transition: {
                                    delay: 0.06 * index,
                                    duration: 0.25,
                                  },
                                }}
                              >
                                <RadioGroupItem
                                  value={time.value}
                                  id={`time-${index + 1}`}
                                />
                                <Label
                                  htmlFor={`time-${index + 1}`}
                                  className="cursor-pointer w-full"
                                >
                                  {time.label}
                                </Label>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 6: Additional Requirements */}
                  {currentStep === 5 && (
                    <>
                      <CardHeader>
                        <CardTitle>Additional Requirements</CardTitle>
                        <CardDescription>
                          Any other specific needs for your website?
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label>Which features do you need?</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                              "Contact Form",
                              "Blog/News",
                              "E-commerce",
                              "User Accounts",
                              "Search Functionality",
                              "Social Media Integration",
                              "Newsletter Signup",
                              "Analytics",
                            ].map((feature, index) => {
                              const featureKey = feature.toLowerCase();
                              const isChecked =
                                formData.features.includes(featureKey);
                              return (
                                <motion.div
                                  key={feature}
                                  role="checkbox"
                                  aria-checked={isChecked}
                                  tabIndex={0}
                                  className="flex items-center space-x-2 rounded-2xl border border-black/15 p-3 cursor-pointer hover:border-[#A2090F]/55 hover:bg-[#FFF9F9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A2090F]/30"
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  transition={{ duration: 0.2 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                      delay: 0.04 * index,
                                      duration: 0.25,
                                    },
                                  }}
                                  onClick={() => toggleFeature(featureKey)}
                                  onKeyDown={(e) => {
                                    if (e.key === " " || e.key === "Enter") {
                                      e.preventDefault();
                                      toggleFeature(featureKey);
                                    }
                                  }}
                                >
                                  <Checkbox
                                    id={`feature-${feature}`}
                                    checked={isChecked}
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="pointer-events-none"
                                  />
                                  <Label
                                    htmlFor={`feature-${feature}`}
                                    className="pointer-events-none w-full"
                                  >
                                    {feature}
                                  </Label>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="additionalInfo">
                            Anything else we should know?
                          </Label>
                          <Textarea
                            id="additionalInfo"
                            placeholder="Any additional requirements or information"
                            value={formData.additionalInfo}
                            onChange={(e) =>
                              updateFormData("additionalInfo", e.target.value)
                            }
                            className="min-h-[88px] rounded-2xl border-black/15 bg-white px-4 py-3 transition-all duration-300 hover:border-[#A2090F]/65 hover:bg-[#FFF9F9] hover:shadow-[0_4px_16px_rgba(162,9,15,0.08)] focus-visible:ring-2 focus-visible:ring-[#A2090F]/20 focus-visible:border-[#A2090F]"
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <CardFooter className="flex flex-wrap items-center justify-between gap-3 pt-6 pb-5">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1 transition-all duration-300 rounded-2xl cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>
                </motion.div>

                {currentStep === steps.length - 1 ? (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        asChild
                        className="rounded-2xl bg-[#111113] text-white hover:bg-[#A2090F] transition-all duration-300 cursor-pointer"
                      >
                        <a
                          href={buildGmailHref()}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => completeSubmission("email")}
                        >
                          <Mail className="h-4 w-4 mr-1.5" />
                          Submit &amp; Send Email
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </a>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-2xl border-black/20 text-[#111113] hover:border-[#A2090F]/60 hover:bg-[#FFF9F9] transition-all duration-300 cursor-pointer"
                      >
                        <a
                          href={buildWhatsAppHref()}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => completeSubmission("whatsapp")}
                        >
                          Submit via WhatsApp
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="flex items-center gap-1 transition-all duration-300 rounded-2xl cursor-pointer"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </CardFooter>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Step indicator */}
      {!isSubmitted && (
        <div className="mt-4 text-center text-sm text-white/80">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </div>
      )}
    </div>
  );
};

export default OnboardingForm;
